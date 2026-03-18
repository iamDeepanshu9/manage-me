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
import { MonthlySpendWidget } from "./widgets/MonthlySpendWidget";
import { NewsWidget } from "./widgets/NewsWidget";
import { CalendarWidget } from "./widgets/CalendarWidget";
import { StickyNotesWidget } from "./widgets/StickyNotesWidget";

// --- GRID DEFINITIONS ---

const WIDGETS_CONFIG: Record<string, { component: React.FC; defaultClass: string }> = {
  clock: { component: ClockWidget as React.FC, defaultClass: "col-span-1 md:col-span-2" },
  timer: { component: TimerWidget as React.FC, defaultClass: "col-span-1 md:col-span-1" },
  task: { component: TaskWidget as React.FC, defaultClass: "row-span-2 col-span-1 md:col-span-1" },
  spend: { component: MonthlySpendWidget as React.FC, defaultClass: "col-span-1 md:col-span-1" },
  news: { component: NewsWidget as React.FC, defaultClass: "col-span-1 md:col-span-1" },
  calendar: { component: CalendarWidget as React.FC, defaultClass: "col-span-1 md:col-span-1" },
  sticky: { component: StickyNotesWidget as React.FC, defaultClass: "col-span-1 md:col-span-2" },
};

const DEFAULT_LAYOUT = ["clock", "timer", "task", "spend", "news", "calendar", "sticky"];

function getImplicitSize(cls: string): "1x1" | "2x1" | "1x2" {
  if (cls.includes("md:col-span-2")) return "2x1";
  if (cls.includes("row-span-2")) return "1x2";
  return "1x1";
}

export function DashboardGrid() {
  const [layoutIds, setLayoutIds] = useState<string[]>([]);
  const [widgetSizes, setWidgetSizes] = useState<Record<string, "1x1" | "2x1" | "1x2">>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
    
    // Load layout
    const savedLayout = localStorage.getItem("dashboardLayout");
    if (savedLayout) {
      try {
        const parsedLayout = JSON.parse(savedLayout).filter((id: string) => id !== "music");
        setTimeout(() => setLayoutIds(parsedLayout), 0);
      } catch {
        setTimeout(() => setLayoutIds(DEFAULT_LAYOUT), 0);
      }
    } else {
      setTimeout(() => setLayoutIds(DEFAULT_LAYOUT), 0);
    }

    // Load sizes
    const savedSizes = localStorage.getItem("dashboardWidgetSizes");
    if (savedSizes) {
      try {
        const parsedSizes = JSON.parse(savedSizes);
        setTimeout(() => setWidgetSizes(parsedSizes), 0);
      } catch {
        // use default empty map
      }
    }
  }, []);

  const handleSizeChange = (id: string, newSize: "1x1" | "2x1" | "1x2") => {
    setWidgetSizes(prev => {
      const nextSizes = { ...prev, [id]: newSize };
      localStorage.setItem("dashboardWidgetSizes", JSON.stringify(nextSizes));
      return nextSizes;
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { 
      activationConstraint: { 
        delay: 200, 
        tolerance: 5,
      } 
    }),
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
    return null;
  }

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row-dense gap-6 auto-rows-[300px]">
        <SortableContext items={layoutIds} strategy={rectSortingStrategy}>
          {layoutIds.map((id) => {
            const widget = WIDGETS_CONFIG[id];
            if (!widget) return null;
            const WidgetComponent = widget.component;
            
            const currentSize = widgetSizes[id];
            const sizeClass = currentSize === "1x1" ? "col-span-1 row-span-1" :
                              currentSize === "2x1" ? "col-span-1 md:col-span-2 row-span-1" :
                              currentSize === "1x2" ? "col-span-1 row-span-2 md:col-span-1 md:row-span-2" :
                              widget.defaultClass;

            const finalCurrentSize = currentSize || getImplicitSize(widget.defaultClass);

            return (
              <SortableWidget 
                key={id} 
                id={id} 
                className={sizeClass}
                currentSize={finalCurrentSize}
                onSizeChange={(size) => handleSizeChange(id, size)}
              >
                <WidgetComponent />
              </SortableWidget>
            );
          })}
        </SortableContext>
      </div>
    </DndContext>
  );
}
