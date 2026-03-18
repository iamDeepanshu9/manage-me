"use client";

import React, { useState } from "react";

export const MusicWidget = () => {
  // Safe default: Lofi Girl 24/7 stream
  const [embedUrl, setEmbedUrl] = useState("https://www.youtube.com/embed/live_stream?channel=UCSJ4gkVC6NrvII8umztf0Ow");
  const [platform, setPlatform] = useState<"youtube" | "spotify">("youtube");
  const [videoMode, setVideoMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputUrl, setInputUrl] = useState("");

  const handleSaveUrl = () => {
    if (!inputUrl.trim()) return;
    
    let parsedUrl = "";
    let newPlatform: "youtube" | "spotify" = "youtube";
    
    if (inputUrl.includes("youtube.com") || inputUrl.includes("youtu.be")) {
      newPlatform = "youtube";
      if (inputUrl.includes("watch?v=")) {
        const id = new URLSearchParams(inputUrl.split("?")[1]).get("v");
        parsedUrl = `https://www.youtube.com/embed/${id}`;
      } else if (inputUrl.includes("youtu.be/")) {
        const id = inputUrl.split("youtu.be/")[1]?.split("?")[0];
        parsedUrl = `https://www.youtube.com/embed/${id}`;
      } else {
        parsedUrl = inputUrl; // Fallback
      }
    } else if (inputUrl.includes("spotify.com")) {
      newPlatform = "spotify";
      if (!inputUrl.includes("/embed/")) {
        // e.g., https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M
        parsedUrl = inputUrl.replace("spotify.com/", "spotify.com/embed/");
      } else {
        parsedUrl = inputUrl;
      }
    } else {
      parsedUrl = inputUrl; // Blind fallback for others (SoundCloud, etc) if they support iframe
      newPlatform = "youtube";
    }

    if (parsedUrl) {
      setEmbedUrl(parsedUrl);
      setPlatform(newPlatform);
      setIsEditing(false);
      setInputUrl("");
    }
  };

  return (
    <div className="glass rounded-2xl p-6 widget-shadow transform transition-transform hover:scale-[1.01] duration-300 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Music Player</h3>
        <div className="flex gap-2">
          {platform === "youtube" && (
            <button 
              onClick={() => setVideoMode(!videoMode)} 
              className={`p-1.5 rounded-lg transition-colors flex items-center justify-center ${videoMode ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
              title={videoMode ? "Hide Video" : "Show Video"}
            >
              <span className="material-symbols-outlined text-sm">{videoMode ? 'visibility' : 'visibility_off'}</span>
            </button>
          )}
          <button 
            onClick={() => setIsEditing(!isEditing)} 
            className={`p-1.5 rounded-lg transition-colors flex items-center justify-center ${isEditing ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
            title="Settings"
          >
            <span className="material-symbols-outlined text-sm">settings</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {isEditing ? (
          <div className="flex flex-col gap-3 animate-fade-in py-2">
             <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Paste YouTube/Spotify Link</label>
            <input 
              type="text" 
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-slate-400 transition-all shadow-inner"
              autoFocus
            />
            <div className="flex gap-3 mt-1">
              <button 
                onClick={() => setIsEditing(false)} 
                className="flex-1 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
               >
                Cancel
              </button>
              <button 
                onClick={handleSaveUrl} 
                className="flex-1 py-2 text-xs font-bold rounded-xl bg-primary text-white shadow-lg shadow-primary/20 hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className={`w-full relative rounded-xl overflow-hidden shadow-inner transition-all duration-500 bg-black/5 flex-1 min-h-[80px] ${platform === 'youtube' && !videoMode ? 'max-h-[80px]' : platform === 'spotify' && !videoMode ? 'max-h-[152px]' : ''}`}>
            <iframe
              src={embedUrl}
              className="absolute top-0 left-0 w-full h-full border-0 rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};
