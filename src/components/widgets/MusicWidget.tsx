"use client";

import React from "react";

export const MusicWidget = () => (
  <div className="glass rounded-2xl p-6 widget-shadow transform transition-transform hover:scale-[1.01] duration-300 h-full flex items-center">
    <div className="flex w-full items-center gap-6">
      <div className="relative group">
        <div className="h-24 w-24 rounded-xl overflow-hidden shadow-lg border-2 border-white dark:border-slate-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
            alt="Lofi hip hop album cover with chill aesthetic"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuARrEWGnK81ojuoqiRer7Z6UDZW15uwgADSKXwn5fVZ5sSz-0FmpIITr74FkP5zgHKJQyaSeaLVw4SgpsmVDudjS6Wdcj0iOSxELRt2li36OpyV8DBFdyAB2_My6HAwNJC8Re65vMEN7Ph-ak7IYBzuoi9u4KzaulyzXlHdcmth703slEqnsUcBCnqbXiQHFa_n9f4t-UA9JPuyk6_ms-l5H8KGTzbZY33QMQ8LDWpB_qxpAe72bXcfWjROufEYZMbkE6fA1kvZcQ8Y"
          />
        </div>
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl cursor-pointer backdrop-blur-[2px]">
          <span className="material-symbols-outlined text-white text-3xl">play_circle</span>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">Midnight Study</h3>
            <p className="text-sm text-slate-500">Lofi Girl • Chill Beats</p>
          </div>
          <span className="material-symbols-outlined text-primary animate-pulse">equalizer</span>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <span className="material-symbols-outlined text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors block mt-[2px]">
            skip_previous
          </span>
          <button className="h-10 w-10 bg-primary hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-md shadow-primary/20 transition-colors cursor-pointer transform hover:scale-105">
            <span className="material-symbols-outlined block ml-[1px] mt-[1px]">pause</span>
          </button>
          <span className="material-symbols-outlined text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors block mt-[2px]">
            skip_next
          </span>
          <div className="flex-1 flex flex-col gap-1 ml-4">
            <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full w-full relative cursor-pointer group">
              <div className="absolute left-0 h-full bg-primary rounded-full transition-all duration-300 shadow-[0_0_6px_rgba(59,130,246,0.6)]" style={{ width: "65%" }}></div>
              <div className="absolute left-[65%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-white border border-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-medium mt-1">
              <span>2:14</span>
              <span>3:45</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
