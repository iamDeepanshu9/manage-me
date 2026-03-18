"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableWidgetProps {
  id: string;
  className?: string;
  currentSize?: "1x1" | "2x1" | "1x2";
  onSizeChange?: (size: "1x1" | "2x1" | "1x2") => void;
  children: React.ReactNode;
}

export function SortableWidget({ id, className = "", currentSize, onSizeChange, children }: SortableWidgetProps) {
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
      {...attributes}
      {...listeners}
      className={`relative group/widget ${className} ${isDragging ? "shadow-2xl scale-105 z-50 cursor-grabbing" : ""}`}
    >
      <div 
        className="absolute top-3 left-3 z-[60] flex gap-1.5 opacity-0 group-hover/widget:opacity-100 transition-all bg-white/95 dark:bg-slate-800/95 p-1.5 rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md translate-y-2 group-hover/widget:translate-y-0"
        onPointerDown={(e) => e.stopPropagation()} 
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <button 
          onClick={() => onSizeChange?.("1x1")}
          className={`w-6 h-6 rounded-lg ${currentSize === '1x1' || !currentSize ? 'bg-primary text-white shadow-sm' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200'} flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95`}
          title="Square (1x1)"
        >
          <span className="material-symbols-outlined text-[16px]">crop_square</span>
        </button>
        <button 
          onClick={() => onSizeChange?.("2x1")}
          className={`w-6 h-6 rounded-lg ${currentSize === '2x1' ? 'bg-primary text-white shadow-sm' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200'} flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95`}
          title="Horizontal Rectangle (2x1)"
        >
          <span className="material-symbols-outlined text-[16px]">crop_16_9</span>
        </button>
        <button 
          onClick={() => onSizeChange?.("1x2")}
          className={`w-6 h-6 rounded-lg ${currentSize === '1x2' ? 'bg-primary text-white shadow-sm' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200'} flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95`}
          title="Vertical Rectangle (1x2)"
        >
          <span className="material-symbols-outlined text-[16px]">crop_portrait</span>
        </button>
      </div>
      {children}
    </div>
  );
}
