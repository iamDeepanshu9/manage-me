"use client";

import React, { useState } from "react";

type Note = {
  id: number;
  text: string;
  color: "yellow" | "pink" | "blue" | "emerald";
  label: string;
  icon: string;
  rotation: string;
};

export const StickyNotesWidget = ({ widgetSize = '2x1' }: { widgetSize?: '1x1' | '1x2' | '2x1' }) => {
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, text: "Buy groceries: Oat milk, Avocados, Coffee beans ☕️", color: "yellow", label: "TODAY", icon: "push_pin", rotation: "rotate-[-2deg]" },
    { id: 2, text: "Call Mom! Sunday at 10 AM. Don't forget! ❤️", color: "pink", label: "SUNDAY", icon: "favorite", rotation: "rotate-[1deg]" },
    { id: 3, text: "Project brainstorm: Use pastel themes for the new UI kit.", color: "blue", label: "IDEAS", icon: "lightbulb", rotation: "rotate-[-1deg]" },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleUpdate = (id: number, newText: string) => {
    setNotes(notes.map(n => n.id === id ? { ...n, text: newText } : n));
  };

  const nextNote = () => setCurrentIndex((prev) => (prev + 1) % notes.length);
  const prevNote = () => setCurrentIndex((prev) => (prev - 1 + notes.length) % notes.length);

  const handleAddNote = () => {
      const colors: Note['color'][] = ["yellow", "pink", "blue", "emerald"];
      const newNote: Note = {
          id: Date.now(),
          text: "",
          color: colors[notes.length % colors.length],
          label: "NEW",
          icon: "edit_note",
          rotation: `rotate-[${Math.floor(Math.random() * 4 - 2)}deg]`
      };
      setNotes([...notes, newNote]);
      if (widgetSize === '1x1') setCurrentIndex(notes.length);
  };

  const colorStyles = {
    yellow: "bg-[#fef9c3] dark:bg-yellow-900/40 border-b-4 border-[#fef08a] dark:border-l-4 dark:border-b-0 dark:border-yellow-500/50 text-yellow-900 dark:text-yellow-100",
    pink: "bg-[#fce7f3] dark:bg-pink-900/40 border-b-4 border-[#fbcfe8] dark:border-l-4 dark:border-b-0 dark:border-pink-500/50 text-pink-900 dark:text-pink-100",
    blue: "bg-[#e0e7ff] dark:bg-blue-900/40 border-b-4 border-[#c7d2fe] dark:border-l-4 dark:border-b-0 dark:border-blue-500/50 text-blue-900 dark:text-blue-100",
    emerald: "bg-[#d1fae5] dark:bg-emerald-900/40 border-b-4 border-[#a7f3d0] dark:border-l-4 dark:border-b-0 dark:border-emerald-500/50 text-emerald-900 dark:text-emerald-100",
  };

  const renderNote = (note: Note, is1x1: boolean) => (
    <div 
        key={note.id} 
        className={`relative ${is1x1 ? 'w-full h-full' : 'min-w-[180px] h-[180px] shrink-0'} ${note.color === 'yellow' ? colorStyles.yellow : note.color === 'pink' ? colorStyles.pink : note.color === 'blue' ? colorStyles.blue : colorStyles.emerald} p-5 rounded-2xl ${note.rotation} hover:rotate-0 transition-transform duration-300 widget-shadow flex flex-col justify-between snap-center group/note`}
    >
      <textarea
        value={note.text}
        onChange={(e) => handleUpdate(note.id, e.target.value)}
        onPointerDown={(e) => e.stopPropagation()} 
        placeholder="Type a note..."
        className="w-full text-sm font-medium leading-snug bg-transparent outline-none resize-none flex-1 placeholder:text-black/20 dark:placeholder:text-white/20 custom-scrollbar"
      />
      <div className="flex justify-between items-center opacity-60 mt-2 shrink-0">
        <span className="text-[10px] font-bold uppercase">{note.label}</span>
        <span className="material-symbols-outlined text-sm">{note.icon}</span>
      </div>
      <button 
        onClick={() => {
            setNotes(notes.filter(n => n.id !== note.id));
            if (is1x1 && currentIndex >= notes.length - 1) setCurrentIndex(Math.max(0, notes.length - 2));
        }}
        onPointerDown={(e) => e.stopPropagation()}
        className={`absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 ${!is1x1 ? 'group-hover/note:opacity-100' : ''} transition-opacity shadow-sm hover:bg-red-600 scale-75 z-20`}
      >
          <span className="material-symbols-outlined text-[12px]">close</span>
      </button>
    </div>
  );

  return (
    <div className={`relative w-full h-full ${widgetSize === '1x1' ? 'p-6 flex items-center justify-center' : widgetSize === '1x2' ? 'py-4 px-2' : 'py-2'} group/sticky`}>
        
        {/* Global Add Note Button */}
        <button 
            onClick={(e) => { e.stopPropagation(); handleAddNote(); }}
            onPointerDown={(e) => e.stopPropagation()}
            className={`absolute z-10 bg-slate-800/10 dark:bg-white/10 hover:bg-slate-800/20 dark:hover:bg-white/20 rounded-full w-6 h-6 flex items-center justify-center backdrop-blur-md transition-colors ${widgetSize === '1x1' ? 'top-2 right-2' : widgetSize === '1x2' ? 'top-4 right-4' : 'top-4 right-4'} opacity-0 group-hover/sticky:opacity-100 shadow-sm`}
            title="Add Note"
        >
            <span className="material-symbols-outlined text-[16px] text-slate-700 dark:text-slate-200 block">add</span>
        </button>

      {/* 1x1 Square: Carousel */}
      {widgetSize === '1x1' && (
        <div className="w-full h-full relative group/carousel">
            {notes.length > 0 ? renderNote(notes[currentIndex], true) : (
                <div className="w-full h-[180px] border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex items-center justify-center text-slate-400 text-sm font-medium">No notes</div>
            )}
            
            {notes.length > 1 && (
                <>
                    <button 
                        onClick={(e) => { e.stopPropagation(); prevNote(); }}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="absolute -left-3 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white rounded-full w-6 h-6 flex items-center justify-center backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10"
                    >
                        <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); nextNote(); }}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="absolute -right-3 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white rounded-full w-6 h-6 flex items-center justify-center backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10"
                    >
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </button>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                        {notes.map((_, i) => (
                            <div key={i} className={`w-1 h-1 rounded-full transition-colors ${i === currentIndex ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
                        ))}
                    </div>
                </>
            )}
            
            {/* Delete button specific for 1x1 overriding opacity */}
            {notes.length > 0 && (
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        const id = notes[currentIndex].id;
                        setNotes(notes.filter(n => n.id !== id));
                        if (currentIndex >= notes.length - 1) setCurrentIndex(Math.max(0, notes.length - 2));
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity shadow-sm hover:bg-red-600 scale-75 z-20"
                >
                    <span className="material-symbols-outlined text-[12px]">close</span>
                </button>
            )}
        </div>
      )}

      {/* 1x2 Vertical Rectangle: Stack */}
      {widgetSize === '1x2' && (
        <div className="w-full h-full flex flex-col gap-4 overflow-y-auto px-4 pb-8 pt-4 custom-scrollbar items-center">
            {notes.length > 0 ? notes.map(note => renderNote(note, false)) : (
                <div className="w-[180px] h-[180px] border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex items-center justify-center text-slate-400 text-sm font-medium shrink-0">No notes</div>
            )}
        </div>
      )}

      {/* 2x1 Horizontal Rectangle: Row */}
      {widgetSize === '2x1' && (
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x px-6 h-full items-center">
            {notes.length > 0 ? notes.map(note => renderNote(note, false)) : (
                <div className="min-w-[180px] h-[180px] border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex items-center justify-center text-slate-400 text-sm font-medium">No notes</div>
            )}
        </div>
      )}

    </div>
  );
};
