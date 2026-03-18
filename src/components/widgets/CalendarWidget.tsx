"use client";

import React, { useState } from "react";

type CalendarEvent = {
  id: string;
  title: string;
  timeStart: string;
  timeEnd: string;
  type: string;
  color: "blue" | "indigo" | "emerald" | "amber" | "rose";
};

const DEFAULT_EVENTS: Record<number, CalendarEvent[]> = {
  24: [
    { id: "1", title: "Team Sync", timeStart: "09:00", timeEnd: "10:00", type: "Zoom Meeting", color: "blue" },
    { id: "2", title: "Deep Work", timeStart: "10:00", timeEnd: "12:00", type: "Focus Mode", color: "indigo" },
    { id: "3", title: "Lunch Break", timeStart: "12:00", timeEnd: "13:00", type: "", color: "emerald" },
    { id: "4", title: "Client Meeting", timeStart: "13:30", timeEnd: "14:30", type: "Google Meet", color: "amber" },
    { id: "5", title: "Focus Time", timeStart: "15:00", timeEnd: "17:00", type: "Feature Design", color: "rose" },
  ]
};

export const CalendarWidget = () => {
  const today = new Date();
  const currentMonth = today.toLocaleString('default', { month: 'long' });
  const currentYear = today.getFullYear();
  const currentDate = today.getDate();
  const daysInMonth = new Date(currentYear, today.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, today.getMonth(), 1).getDay();
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [eventsMap, setEventsMap] = useState<Record<number, CalendarEvent[]>>({
    [currentDate]: DEFAULT_EVENTS[24] || []
  });
  const currentDay = currentDate;
  
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEventDetails, setNewEventDetails] = useState({ title: "", timeStart: "09:00", timeEnd: "10:00", type: "", color: "blue" as CalendarEvent['color'] });

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
    setIsAddingEvent(false);
  };

  const closeModal = () => {
    setSelectedDate(null);
    setIsAddingEvent(false);
  };

  const deleteEvent = (date: number, eventId: string) => {
    setEventsMap((prev) => ({
      ...prev,
      [date]: (prev[date] || []).filter((e) => e.id !== eventId)
    }));
  };

  const handleStartTimeChange = (val: string) => {
    setNewEventDetails(prev => {
      const [sh, sm] = val.split(':').map(Number);
      const [eh, em] = prev.timeEnd.split(':').map(Number);
      const startMin = sh * 60 + sm;
      const endMin = eh * 60 + em;
      
      let newTimeEnd = prev.timeEnd;
      if (endMin <= startMin) {
        const newEndH = Math.min(23, sh + 1).toString().padStart(2, '0');
        const newEndM = val.split(':')[1] || '00';
        newTimeEnd = `${newEndH}:${newEndM}`;
      }
      return { ...prev, timeStart: val, timeEnd: newTimeEnd };
    });
  };

  const isSaveDisabled = !newEventDetails.title || newEventDetails.timeEnd <= newEventDetails.timeStart;

  const handleSaveEvent = () => {
    if (isSaveDisabled || selectedDate === null) return;
    const newEvent: CalendarEvent = {
      id: Math.random().toString(36).substring(7),
      ...newEventDetails
    };
    setEventsMap((prev) => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), newEvent]
    }));
    setIsAddingEvent(false);
    setNewEventDetails({ title: "", timeStart: "09:00", timeEnd: "10:00", type: "", color: "blue" });
  };

  const getEventPosition = (timeStart: string, timeEnd: string) => {
    // 09:00 is timeline start
    const parseTime = (time: string) => {
      const [h, m] = time.split(':').map(Number);
      return Math.max(0, h + m / 60);
    };
    const startHour = Math.max(0, parseTime(timeStart) - 9);
    const top = startHour * 80; // 80px per hour
    const height = Math.max(40, (parseTime(timeEnd) - parseTime(timeStart)) * 80);
    return { top: `${top}px`, height: `${height}px` };
  };

  const formatAMPM = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hours = h % 12 || 12;
    return `${hours < 10 ? '0'+hours : hours}:${m < 10 ? '0'+m : m} ${ampm}`;
  };

  return (
    <>
      <div className="glass rounded-2xl p-6 widget-shadow transform transition-transform hover:scale-[1.02] duration-300 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{currentMonth} {currentYear}</h3>
          <div className="flex gap-1">
            <span className="material-symbols-outlined text-slate-500 text-lg cursor-pointer hover:text-primary transition-colors block mt-[2px]">chevron_left</span>
            <span className="material-symbols-outlined text-slate-500 text-lg cursor-pointer hover:text-primary transition-colors block mt-[2px]">chevron_right</span>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-y-2 text-center items-center justify-items-center flex-1">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
            <div key={`header-${i}`} className="text-[10px] font-bold text-slate-400 uppercase w-full">{day}</div>
          ))}
          {[...Array(startOffset)].map((_, i) => (
            <div key={`empty-${i}`} className="w-7 h-7"></div>
          ))}
          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1;
            const isToday = day === currentDay;
            const isPast = day < currentDay;
            const hasEvents = eventsMap[day] && eventsMap[day].length > 0;
            return (
              <div 
                key={`day-${day}`} 
                onClick={() => handleDateClick(day)}
                className={`text-xs p-1 w-7 h-7 flex items-center justify-center rounded-lg transition-colors cursor-pointer relative ${
                isToday ? "bg-primary text-white font-bold shadow-lg shadow-primary/30" : 
                isPast ? "text-slate-700 dark:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-800" : 
                "text-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}>
                {day}
                {hasEvents && !isToday && <span className="absolute bottom-1 w-1 h-1 bg-primary rounded-full"></span>}
              </div>
            );
          })}
        </div>
      </div>

      {selectedDate !== null && (
        <div className="fixed inset-0 z-50 flex justify-center items-center px-4 md:px-8 py-4 md:py-8 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#F8FAFC] dark:bg-slate-900 w-full max-w-7xl h-full rounded-3xl shadow-2xl flex flex-col border border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* Modal Header */}
            <div className="p-8 pb-6 border-b border-slate-200 dark:border-slate-800 relative z-10 bg-[#F8FAFC] dark:bg-slate-900 shrink-0">
              <button 
                onClick={closeModal} 
                className="absolute right-6 top-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex items-center justify-center p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                Schedule for {currentMonth} {selectedDate}, {currentYear}
              </h2>
              <p className="text-sm font-medium text-slate-500">
                {new Date(currentYear, today.getMonth(), selectedDate).toLocaleDateString('en-US', { weekday: 'long' })} • {(eventsMap[selectedDate] || []).length} Events Scheduled
              </p>
            </div>

            {/* Modal Body */}
            {isAddingEvent ? (
              <div className="flex-1 overflow-y-auto p-8 bg-slate-50 dark:bg-slate-900/50 flex flex-col justify-center items-center">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 w-full max-w-lg">
                  <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-slate-100">Add New Event</h3>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Event Title <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        value={newEventDetails.title}
                        onChange={e => setNewEventDetails({...newEventDetails, title: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-400"
                        placeholder="e.g. Design Review Sync"
                        autoFocus
                      />
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Start Time</label>
                        <input 
                          type="time" 
                          value={newEventDetails.timeStart}
                          onChange={e => handleStartTimeChange(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        />
                      </div>
                      <div className="flex-1 relative">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">End Time</label>
                        <input 
                          type="time" 
                          value={newEventDetails.timeEnd}
                          min={newEventDetails.timeStart}
                          onChange={e => setNewEventDetails({...newEventDetails, timeEnd: e.target.value})}
                          className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${newEventDetails.timeEnd <= newEventDetails.timeStart ? 'border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 dark:border-slate-600'}`}
                        />
                        {newEventDetails.timeEnd <= newEventDetails.timeStart && (
                          <p className="absolute -bottom-5 left-0 text-[10px] text-red-500 font-medium whitespace-nowrap">End time must be after start time</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description (Optional)</label>
                      <input 
                        type="text" 
                        value={newEventDetails.type}
                        onChange={e => setNewEventDetails({...newEventDetails, type: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-400"
                        placeholder="e.g. Google Meet / Room 101"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Color Label</label>
                      <div className="flex gap-4">
                        {['blue', 'indigo', 'emerald', 'amber', 'rose'].map(color => (
                          <button
                            key={color}
                            onClick={() => setNewEventDetails({...newEventDetails, color: color as CalendarEvent['color']})}
                            className={`w-10 h-10 rounded-full border-[3px] flex items-center justify-center ${newEventDetails.color === color ? 'border-primary outline outline-2 outline-offset-2 outline-primary/30 shadow-md scale-110' : 'border-transparent hover:scale-105 opacity-80 hover:opacity-100'} transition-all`}
                            style={{ backgroundColor: color === 'blue' ? '#3b82f6' : color === 'indigo' ? '#6366f1' : color === 'emerald' ? '#10b981' : color === 'amber' ? '#f59e0b' : '#f43f5e' }}
                          >
                            {newEventDetails.color === color && <span className="material-symbols-outlined text-white text-base font-bold">check</span>}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto relative p-8 select-none bg-white dark:bg-slate-900/40">
                <div className="max-w-4xl mx-auto h-full relative">
                  {/* Time slots markings */}
                  <div className="relative" style={{ minHeight: '800px' }}> {/* 10 hours * 80px */}
                    {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'].map((time, i) => {
                      const ampmTime = formatAMPM(time);
                      return (
                        <div key={time} className="absolute w-full border-t border-dashed border-slate-200 dark:border-slate-800/80" style={{ top: `${i * 80}px` }}>
                          <span className="text-[11px] font-semibold text-slate-400 -translate-y-1/2 absolute top-0 -left-6 bg-white dark:bg-[#131b2c] pr-2 block w-[70px]">
                            {ampmTime}
                          </span>
                        </div>
                      );
                    })}

                    {/* Events Overlay */}
                    <div className="absolute left-[80px] right-0 top-0 bottom-0 pointer-events-none">
                      {(eventsMap[selectedDate] || []).map((ev) => {
                        const pos = getEventPosition(ev.timeStart, ev.timeEnd);
                        
                        const colors = {
                          blue: "bg-blue-100/80 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-500",
                          indigo: "bg-[#E0E7FF] dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border-indigo-400",
                          emerald: "bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-400",
                          amber: "bg-[#FFEDD5] dark:bg-amber-900/40 text-amber-800 dark:text-amber-500 border-amber-400",
                          rose: "bg-[#FFE4E6] dark:bg-rose-900/40 text-rose-700 dark:text-rose-400 border-rose-500"
                        };
                        
                        return (
                          <div 
                            key={ev.id}
                            className={`absolute left-0 right-0 border-l-[3px] rounded-r-xl rounded-l-sm p-4 pointer-events-auto transition-all hover:brightness-95 flex flex-col justify-center shadow-sm ${colors[ev.color]}`}
                            style={{ top: pos.top, height: `calc(${pos.height} - 4px)`, marginTop: '2px' }}
                          >
                            <div className="flex justify-between items-start">
                              <h4 className="font-bold text-base tracking-tight">{ev.title}</h4>
                              <button 
                                onClick={() => deleteEvent(selectedDate, ev.id)}
                                className="text-current opacity-50 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all p-1.5 -max-mt-1.5 -mr-1.5 rounded-lg"
                              >
                                <span className="material-symbols-outlined text-[18px] block">close</span>
                              </button>
                            </div>
                            {ev.type && (
                              <p className="text-xs font-medium opacity-80 mt-1 flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[14px]">info</span>{ev.type}
                              </p>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex justify-end items-center bg-[#F8FAFC] dark:bg-slate-900 shrink-0">
              <div className="flex gap-4 items-center">
                <button 
                  onClick={() => isAddingEvent ? setIsAddingEvent(false) : closeModal()}
                  className="px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                {isAddingEvent ? (
                  <button 
                    onClick={handleSaveEvent}
                    className="px-6 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white text-sm font-semibold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:grayscale transition-all disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                    disabled={isSaveDisabled}
                  >
                    Save Event
                  </button>
                ) : (
                  <button 
                    onClick={() => setIsAddingEvent(true)}
                    className="px-6 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white text-sm font-semibold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-blue-500/25 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined text-lg">add</span> New Event
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
