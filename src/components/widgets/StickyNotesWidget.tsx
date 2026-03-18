"use client";

import React from "react";

export const StickyNotesWidget = () => (
  <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x pt-2 w-full h-full">
    <div className="min-w-[180px] h-[180px] bg-[#fef9c3] dark:bg-yellow-900/40 p-5 rounded-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-300 widget-shadow flex flex-col justify-between border-b-4 border-[#fef08a] dark:border-l-4 dark:border-b-0 dark:border-yellow-500/50 snap-center">
      <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100 leading-snug italic">Buy groceries: Oat milk, Avocados, Coffee beans ☕️</p>
      <div className="flex justify-between items-center text-yellow-600/60 dark:text-yellow-500/40">
        <span className="text-[10px] font-bold">TODAY</span>
        <span className="material-symbols-outlined text-sm">push_pin</span>
      </div>
    </div>
    <div className="min-w-[180px] h-[180px] bg-[#fce7f3] dark:bg-pink-900/40 p-5 rounded-2xl rotate-[1deg] hover:rotate-0 transition-transform duration-300 widget-shadow flex flex-col justify-between border-b-4 border-[#fbcfe8] dark:border-l-4 dark:border-b-0 dark:border-pink-500/50 snap-center">
      <p className="text-sm font-medium text-pink-900 dark:text-pink-100 leading-snug">Call Mom! Sunday at 10 AM. Don&apos;t forget! ❤️</p>
      <div className="flex justify-between items-center text-pink-600/60 dark:text-pink-500/40">
        <span className="text-[10px] font-bold">SUNDAY</span>
        <span className="material-symbols-outlined text-sm">favorite</span>
      </div>
    </div>
    <div className="min-w-[180px] h-[180px] bg-[#e0e7ff] dark:bg-blue-900/40 p-5 rounded-2xl rotate-[-1deg] hover:rotate-0 transition-transform duration-300 widget-shadow flex flex-col justify-between border-b-4 border-[#c7d2fe] dark:border-l-4 dark:border-b-0 dark:border-blue-500/50 snap-center">
      <p className="text-sm font-medium text-blue-900 dark:text-blue-100 leading-snug">Project brainstorm: Use pastel themes for the new UI kit.</p>
      <div className="flex justify-between items-center text-blue-600/60 dark:text-blue-500/40">
        <span className="text-[10px] font-bold">IDEAS</span>
        <span className="material-symbols-outlined text-sm">lightbulb</span>
      </div>
    </div>
  </div>
);
