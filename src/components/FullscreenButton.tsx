"use client";

export function FullscreenButton() {
  return (
    <button 
      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer" 
      title="Fullscreen" 
      onClick={() => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message} (${err.name})`);
          });
        } else {
          document.exitFullscreen();
        }
      }}
    >
      <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 block mt-[2px]">fullscreen</span>
    </button>
  );
}
