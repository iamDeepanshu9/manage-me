"use client";

import React, { useState } from "react";

export const TaskWidget = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Morning Standup", done: true },
    { id: 2, text: "Design Review: V2 Assets", done: false },
    { id: 3, text: "Feedback Session with PM", done: false },
    { id: 4, text: "Final Polish Assets", done: false },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleAddTask = (e?: React.KeyboardEvent | React.FocusEvent) => {
    if (e && 'key' in e && e.key !== 'Enter') return;
    
    if (newTaskText.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTaskText.trim(), done: false }]);
    }
    setNewTaskText("");
    setIsAdding(false);
  };

  const completed = tasks.filter(t => t.done).length;
  const progress = tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);

  return (
    <div className="glass rounded-2xl p-6 widget-shadow transform transition-transform hover:scale-[1.01] duration-300 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Today&apos;s Focus</h3>
        <button 
          onClick={() => setIsAdding(true)}
          className="text-primary hover:bg-primary/10 p-1 rounded-lg transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined block mt-[1px]">add</span>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3 min-h-[100px]">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between group">
            <label className="flex items-center gap-3 cursor-pointer flex-1">
              <input
                checked={task.done}
                onChange={() => toggleTask(task.id)}
                className="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 cursor-pointer accent-primary shrink-0"
                type="checkbox"
              />
              <span
                className={`text-sm flex-1 transition-colors select-none ${
                  task.done ? "text-slate-400 line-through" : "text-slate-700 dark:text-slate-300"
                }`}
              >
                {task.text}
              </span>
            </label>
            <button 
              onClick={() => deleteTask(task.id)}
              className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded-md transition-all ml-2"
            >
              <span className="material-symbols-outlined text-[16px] block">close</span>
            </button>
          </div>
        ))}
        
        {isAdding && (
          <div className="flex items-center gap-3 animate-fade-in pr-8 mt-2">
            <input
              disabled
              className="rounded border-slate-300 bg-slate-100 text-slate-300 h-5 w-5 shrink-0"
              type="checkbox"
            />
            <input 
              type="text"
              autoFocus
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyDown={handleAddTask}
              onBlur={handleAddTask}
              placeholder="Type a task and hit Enter..."
              className="text-sm flex-1 bg-white/50 dark:bg-slate-800/50 border border-primary/50 rounded-md px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-slate-800 dark:text-slate-100 shadow-sm"
            />
          </div>
        )}

        {tasks.length === 0 && !isAdding && (
          <p className="text-xs text-slate-400 text-center py-4">All done for today! 🎉</p>
        )}
      </div>
      
      <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 shrink-0">
        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-2">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-[6px] w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
