"use client";

import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableWidget } from "./SortableWidget";

import { ClockWidget } from "./widgets/ClockWidget";
import { TimerWidget } from "./widgets/TimerWidget";
import { TaskWidget } from "./widgets/TaskWidget";
import { MusicWidget } from "./widgets/MusicWidget";
import { MonthlySpendWidget } from "./widgets/MonthlySpendWidget";
import { NewsWidget } from "./widgets/NewsWidget";
import { CalendarWidget } from "./widgets/CalendarWidget";
import { StickyNotesWidget } from "./widgets/StickyNotesWidget";

// --- GRID DEFINITIONS ---

const WIDGETS_CONFIG: Record<string, { component: React.FC; defaultClass: string }> = {
  clock: { component: ClockWidget as React.FC, defaultClass: "col-span-1 md:col-span-2" },
  timer: { component: TimerWidget as React.FC, defaultClass: "col-span-1 md:col-span-1" },
  task: { component: TaskWidget as React.FC, defaultClass: "row-span-2 col-span-1 md:col-span-1" },
  music: { component: MusicWidget as React.FC, defaultClass: "col-span-1 md:col-span-2" },
  spend: { component: MonthlySpendWidget as React.FC, defaultClass: "col-span-1 md:col-span-1" },
  news: { component: NewsWidget as React.FC, defaultClass: "col-span-1 md:col-span-1" },
  calendar: { component: CalendarWidget as React.FC, defaultClass: "col-span-1 md:col-span-1" },
  sticky: { component: StickyNotesWidget as React.FC, defaultClass: "col-span-1 md:col-span-2" },
};

const DEFAULT_LAYOUT = ["clock", "timer", "task", "music", "spend", "news", "calendar", "sticky"];

export function DashboardGrid() {
  const [layoutIds, setLayoutIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
    const savedLayout = localStorage.getItem("dashboardLayout");
    if (savedLayout) {
      try {
        setLayoutIds(JSON.parse(savedLayout));
      } catch (e) {
        setLayoutIds(DEFAULT_LAYOUT);
      }
    } else {
      setLayoutIds(DEFAULT_LAYOUT);
    }
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id && over) {
      setLayoutIds((items) => {
        const oldIndex = items.indexOf(String(active.id));
        const newIndex = items.indexOf(String(over.id));

        const newItems = arrayMove(items, oldIndex, newIndex);
        localStorage.setItem("dashboardLayout", JSON.stringify(newItems));
        return newItems;
      });
    }
  };

  if (!mounted) {
    return null; // Return nothing on server to prevent hydration mismatch for localStorage
  }

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-min">
        <SortableContext items={layoutIds} strategy={rectSortingStrategy}>
          {layoutIds.map((id) => {
            const widget = WIDGETS_CONFIG[id];
            if (!widget) return null;
            const WidgetComponent = widget.component;
            
            return (
              <SortableWidget key={id} id={id} className={widget.defaultClass}>
                <WidgetComponent />
              </SortableWidget>
            );
          })}
        </SortableContext>
      </div>
    </DndContext>
  );
}
