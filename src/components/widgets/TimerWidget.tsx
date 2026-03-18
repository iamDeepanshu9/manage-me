"use client";

import React, { useState, useEffect } from "react";

export const TimerWidget = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      timeout = setTimeout(() => setIsRunning(false), 0);
    }
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [isRunning, timeLeft]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="glass rounded-2xl p-6 flex flex-col items-center justify-between widget-shadow transform transition-transform hover:scale-[1.02] duration-300 h-full">
      <div className="w-full flex justify-between items-center mb-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pomodoro</h3>
        <span className={`material-symbols-outlined text-xl ${isRunning ? 'text-primary animate-pulse' : 'text-slate-500'}`}>timer</span>
      </div>
      <div className="text-5xl font-mono font-medium text-slate-800 dark:text-slate-200 mb-6 tracking-widest">
        {minutes} : {seconds}
      </div>
      <div className="flex gap-3 w-full">
        <button 
          onClick={toggleTimer}
          className={`flex-1 ${isRunning ? 'bg-amber-500 shadow-amber-500/20' : 'bg-primary shadow-primary/20'} text-white py-2 rounded-full font-semibold text-sm shadow-md hover:opacity-90 transition-opacity cursor-pointer`}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button 
          onClick={resetTimer}
          className="px-6 bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors py-2 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300 cursor-pointer"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
