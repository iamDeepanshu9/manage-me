"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableWidgetProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export function SortableWidget({ id, className = "", children }: SortableWidgetProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group/widget ${className} ${isDragging ? "shadow-2xl scale-105" : ""}`}
    >
      {/* Drag Handle */}
      <div 
        {...attributes} 
        {...listeners}
        className="absolute top-4 right-4 z-20 cursor-grab active:cursor-grabbing opacity-0 group-hover/widget:opacity-100 transition-opacity bg-white/80 dark:bg-slate-800/80 p-1.5 rounded-lg shadow-sm backdrop-blur-sm border border-slate-200 dark:border-slate-700"
        title="Drag to move widget"
      >
        <span className="material-symbols-outlined text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm block">drag_indicator</span>
      </div>
      
      {children}
    </div>
  );
}
