"use client";

import React from "react";

export const MonthlySpendWidget = () => (
  <div className="glass rounded-2xl p-6 widget-shadow transform transition-transform hover:scale-[1.02] duration-300 flex flex-col justify-between h-full">
    <div>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly Spend</h3>
        <span className="material-symbols-outlined text-emerald-500 text-sm">trending_down</span>
      </div>
      <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">$1,240.00</div>
      <div className="text-xs text-emerald-500 font-medium mt-1 mb-6 flex items-center gap-1">
        <span className="material-symbols-outlined text-xs">arrow_downward</span>
        12% less than last month
      </div>
    </div>
    <div className="flex-1 min-h-[64px] flex items-end gap-1.5 w-full mt-4">
      <div className="flex-1 bg-[#dbeafe] dark:bg-slate-800 rounded-t h-1/2 transition-colors duration-300"></div>
      <div className="flex-1 bg-[#dbeafe] dark:bg-slate-800 rounded-t h-2/3 transition-colors duration-300"></div>
      <div className="flex-1 bg-[#dbeafe] dark:bg-slate-800 rounded-t h-1/3 transition-colors duration-300"></div>
      <div className="flex-1 bg-[#dbeafe] dark:bg-slate-800 rounded-t h-3/4 transition-colors duration-300"></div>
      <div className="flex-1 bg-primary rounded-t h-1/2 relative transition-colors duration-300"></div>
      <div className="flex-1 bg-[#dbeafe] dark:bg-slate-800 rounded-t h-4/5 transition-colors duration-300"></div>
      <div className="flex-1 bg-[#dbeafe] dark:bg-slate-800 rounded-t h-2/3 transition-colors duration-300"></div>
    </div>
  </div>
);
