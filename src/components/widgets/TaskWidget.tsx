"use client";

import React from "react";

export const TaskWidget = () => (
  <div className="glass rounded-2xl p-6 widget-shadow transform transition-transform hover:scale-[1.01] duration-300 flex flex-col justify-between h-full">
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Today&apos;s Focus</h3>
        <button className="text-primary hover:bg-primary/10 p-1 rounded-lg transition-colors cursor-pointer">
          <span className="material-symbols-outlined block mt-[1px]">add</span>
        </button>
      </div>
      <div className="space-y-4">
        {[
          { id: 1, text: "Morning Standup", done: true },
          { id: 2, text: "Design Review: V2 Assets", done: false },
          { id: 3, text: "Feedback Session with PM", done: false },
          { id: 4, text: "Update Slide Deck", done: false },
          { id: 5, text: "Final Polish Assets", done: false },
        ].map((task) => (
          <label key={task.id} className="flex items-center gap-3 group cursor-pointer">
            <input
              defaultChecked={task.done}
              className="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer accent-primary"
              type="checkbox"
            />
            <span
              className={`text-sm flex-1 transition-colors ${
                task.done ? "text-slate-400 line-through" : "text-slate-700 dark:text-slate-300"
              }`}
            >
              {task.text}
            </span>
          </label>
        ))}
      </div>
    </div>
    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-2">
        <span>Progress</span>
        <span>20%</span>
      </div>
      <div className="h-[6px] w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: "20%" }}></div>
      </div>
    </div>
  </div>
);
