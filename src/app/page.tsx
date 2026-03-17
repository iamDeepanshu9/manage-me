import { ThemeToggle } from "@/components/ThemeToggle";
import { FullscreenButton } from "@/components/FullscreenButton";

export default function Home() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-slate-200/50 dark:border-slate-800/60 bg-white dark:bg-background-dark/80 backdrop-blur-md z-10 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-1.5 rounded-lg">
            <span className="material-symbols-outlined text-white text-xl">grid_view</span>
          </div>
          <h1 className="text-lg font-bold tracking-tight text-slate-800 dark:text-slate-100">ManageMe</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer" title="Notifications">
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 block mt-[2px]">notifications</span>
          </button>
          
          <ThemeToggle />
          <FullscreenButton />

          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer" title="Settings">
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 block mt-[2px]">settings</span>
          </button>
          <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1"></div>
          <div className="flex items-center gap-3 pl-2">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">Alex Rivers</p>
              <p className="text-[10px] text-slate-500">Pro Plan</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover"
                alt="User profile avatar portrait"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcpGueFjePHyO2BYLtDJp4Na6AlqSBgdpx0Jxpz82v186Ci66reO4nVwQr3OYHMg3oU08DHXdLWbZzZHuEFTPVdoqmQI69EFLhIkO0oqnXEzn9gc9V6M3jQlgOChUP2x7SvXsINaSyb2HAzUCYDYmtFI_Pl55NN84TfIvqsb-jlA6ozR7DLmn16Hbd_1d3-KZdhHjxKwSUNjjnzdi60oUyd5M_hX0U1eVlJzDRvJghc3aGA5kaSGqQMSIdpFErBpxu5Aty0ItTaxPr"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-12 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Digital Clock Widget (Large) */}
          <div className="col-span-1 md:col-span-2 glass rounded-2xl p-8 flex flex-col justify-center items-center widget-shadow transform transition-transform hover:scale-[1.01] duration-300">
            <p className="text-slate-500 text-sm font-medium uppercase tracking-widest mb-2">Wednesday, May 24</p>
            <div className="text-7xl font-bold tracking-tighter text-slate-900 dark:text-slate-100">
              10:42<span className="text-primary animate-pulse">:</span>15
            </div>
            <div className="mt-4 flex gap-4 text-slate-400 text-sm font-medium">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">sunny</span> 72°F
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">location_on</span> San Francisco
              </span>
            </div>
          </div>

          {/* Timer Widget */}
          <div className="glass rounded-2xl p-6 flex flex-col items-center justify-between widget-shadow transform transition-transform hover:scale-[1.02] duration-300">
            <div className="w-full flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pomodoro</h3>
              <span className="material-symbols-outlined text-primary text-xl">timer</span>
            </div>
            <div className="text-5xl font-mono font-medium text-slate-800 dark:text-slate-200 mb-6 font-semibold tracking-widest">25 : 00</div>
            <div className="flex gap-3 w-full">
              <button className="flex-1 bg-primary text-white py-2 rounded-full font-semibold text-sm shadow-md shadow-primary/20 hover:opacity-90 transition-opacity cursor-pointer">
                Start
              </button>
              <button className="px-6 bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors py-2 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                Reset
              </button>
            </div>
          </div>

          {/* Task Manager Widget */}
          <div className="row-span-2 glass rounded-2xl p-6 widget-shadow transform transition-transform hover:scale-[1.01] duration-300 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Today's Focus</h3>
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

          {/* Music Player Widget */}
          <div className="col-span-1 md:col-span-2 glass rounded-2xl p-6 widget-shadow transform transition-transform hover:scale-[1.01] duration-300">
            <div className="flex items-center gap-6">
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
                      {/* Interactive hover state for scrub bar */}
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

          {/* Monthly Expense Tracker */}
          <div className="glass rounded-2xl p-6 widget-shadow transform transition-transform hover:scale-[1.02] duration-300 flex flex-col justify-between">
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
            {/* Minimalist line chart simulation */}
            <div className="h-16 flex items-end gap-1.5 w-full mt-4">
              <div className="flex-1 bg-[#dbeafe] dark:bg-slate-800 rounded-t h-1/2 transition-colors duration-300"></div>
              <div className="flex-1 bg-[#dbeafe] dark:bg-slate-800 rounded-t h-2/3 transition-colors duration-300"></div>
              <div className="flex-1 bg-[#dbeafe] dark:bg-slate-800 rounded-t h-1/3 transition-colors duration-300"></div>
              <div className="flex-1 bg-[#dbeafe] dark:bg-slate-800 rounded-t h-3/4 transition-colors duration-300"></div>
              <div className="flex-1 bg-primary rounded-t h-1/2 relative transition-colors duration-300"></div>
              <div className="flex-1 bg-[#dbeafe] dark:bg-slate-800 rounded-t h-4/5 transition-colors duration-300"></div>
              <div className="flex-1 bg-[#dbeafe] dark:bg-slate-800 rounded-t h-2/3 transition-colors duration-300"></div>
            </div>
          </div>

          {/* Trending News Widget */}
          <div className="glass rounded-2xl p-6 widget-shadow overflow-hidden flex flex-col transform transition-transform hover:scale-[1.02] duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-400 uppercase tracking-wider">Trending News</h3>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] text-slate-500 font-bold uppercase">Live</span>
              </div>
            </div>
            <div className="news-container relative h-48 overflow-hidden">
              <div className="flex flex-col gap-4 animate-vertical-scroll">
                {/* Original Set */}
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="contents">
                    <div className="flex gap-3 group cursor-pointer">
                      <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-slate-800 flex-shrink-0 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt="Tech news thumbnail" className="w-full h-full object-cover group-hover:scale-110 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjbLiQ_785GDNf6EhcJyX-5RIg2fpEGAWIOC5KVUeU5kVq13x6O8QoWmFz00fwKlqSWMBQIzudKLvEvux8_Woahw700VrP6sDjb9dlzdlIm7ObaPuXAqDK4qHwekLguvob3TOyxqmN6DF4ZG0fQEixx-mI9h-Qc_qeTjQ1ChPZIumLqtM6ETSIH80mzGzcQlv2FNahjHAdEx6xMPL4HnLDZ1j5sQXsDsMUkD7y3wcj2AATphYP1KVJqfNd0zfLL3UXNHNhT30JVrrh"/>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-200 line-clamp-2 leading-tight group-hover:text-primary transition-colors">The future of generative AI in interface design</h4>
                        <p className="text-[10px] text-slate-500 mt-1">TechCrunch • 2m ago</p>
                      </div>
                    </div>
                    <div className="flex gap-3 group cursor-pointer">
                      <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-slate-800 flex-shrink-0 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt="Global news thumbnail" className="w-full h-full object-cover group-hover:scale-110 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-cVeJoHRE-tZrTupMz9etVJ6CFk_Cp6j9Wd2yfV0JlnaReutcCyczWhadapd14TKTIoBf27-DoBL3AKOt3c4SL96GtYSdSyZjl_kuSkCpg4-R-prYSJr6PaoG8EkiWcQMwCxRURrz76Db2hXLluH-JJQahuDCRZm3mHdggkHNevt7EYm1v_MtglMey4pTJvLjTaIbBtMFAvcY6HNlgSL-1djnpfRiz-lESCa2_Abio1a56etHtTXtH8JWKJAQQP9HjgHMzsmEuGWU"/>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-200 line-clamp-2 leading-tight group-hover:text-primary transition-colors">Global space mission reaches Mars orbit successfully</h4>
                        <p className="text-[10px] text-slate-500 mt-1">NASA News • 15m ago</p>
                      </div>
                    </div>
                    <div className="flex gap-3 group cursor-pointer">
                      <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-slate-800 flex-shrink-0 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt="Market news thumbnail" className="w-full h-full object-cover group-hover:scale-110 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQAMTrhDcMOD4MPITbnD3UGay16WiGdifZmtU4K0Rjqt_zeJc_434zeNM7wQXM5hVT7HZQt56LZm8-cdIiJJNqpNWndUY7dQHwRrXUmZI_9JxY1t5-BISIr8ETM6KYgqcqJZYfzS3UV93D_HuRNVYeeXa9AZmiQKHZxWgDqlmX22Ouvzg5ZF5bHKUg6rntEAWLiPdmiJwIUhXGxBvj0EdJa8Z0mZsISJ0_j8ABfbdudo_catRWtKi7cC68l5Ez8lAp05xYXh-M7pNO"/>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-200 line-clamp-2 leading-tight group-hover:text-primary transition-colors">Market indices hit record highs amid economic recovery</h4>
                        <p className="text-[10px] text-slate-500 mt-1">Bloomberg • 45m ago</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Fade effect */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-slate-900 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Minimalist Calendar Widget */}
          <div className="glass rounded-2xl p-6 widget-shadow transform transition-transform hover:scale-[1.02] duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">May 2024</h3>
              <div className="flex gap-1">
                <span className="material-symbols-outlined text-slate-500 text-lg cursor-pointer hover:text-primary transition-colors block mt-[2px]">chevron_left</span>
                <span className="material-symbols-outlined text-slate-500 text-lg cursor-pointer hover:text-primary transition-colors block mt-[2px]">chevron_right</span>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-y-2 text-center items-center justify-items-center">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <div key={`header-${i}`} className="text-[10px] font-bold text-slate-400 uppercase w-full">{day}</div>
              ))}
              {/* Calendar Days Dummy Grid */}
              {[...Array(31)].map((_, i) => {
                const day = i + 1;
                const isSelected = day === 24;
                const isPast = day < 8;
                return (
                  <div key={`day-${day}`} className={`text-xs p-1 w-7 h-7 flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
                    isSelected ? "bg-primary text-white font-bold shadow-lg shadow-primary/30" : 
                    isPast ? "text-slate-700 dark:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-800" : 
                    "text-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                  }`}>
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sticky Notes Area */}
          <div className="col-span-1 md:col-span-2 flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x pt-2">
            {/* Note 1 */}
            <div className="min-w-[180px] h-[180px] bg-[#fef9c3] dark:bg-yellow-900/40 p-5 rounded-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-300 widget-shadow flex flex-col justify-between border-b-4 border-[#fef08a] dark:border-l-4 dark:border-b-0 dark:border-yellow-500/50 snap-center cursor-grab active:cursor-grabbing">
              <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100 leading-snug italic">Buy groceries: Oat milk, Avocados, Coffee beans ☕️</p>
              <div className="flex justify-between items-center text-yellow-600/60 dark:text-yellow-500/40">
                <span className="text-[10px] font-bold">TODAY</span>
                <span className="material-symbols-outlined text-sm">push_pin</span>
              </div>
            </div>

            {/* Note 2 */}
            <div className="min-w-[180px] h-[180px] bg-[#fce7f3] dark:bg-pink-900/40 p-5 rounded-2xl rotate-[1deg] hover:rotate-0 transition-transform duration-300 widget-shadow flex flex-col justify-between border-b-4 border-[#fbcfe8] dark:border-l-4 dark:border-b-0 dark:border-pink-500/50 snap-center cursor-grab active:cursor-grabbing">
              <p className="text-sm font-medium text-pink-900 dark:text-pink-100 leading-snug">Call Mom! Sunday at 10 AM. Don't forget! ❤️</p>
              <div className="flex justify-between items-center text-pink-600/60 dark:text-pink-500/40">
                <span className="text-[10px] font-bold">SUNDAY</span>
                <span className="material-symbols-outlined text-sm">favorite</span>
              </div>
            </div>

            {/* Note 3 */}
            <div className="min-w-[180px] h-[180px] bg-[#e0e7ff] dark:bg-blue-900/40 p-5 rounded-2xl rotate-[-1deg] hover:rotate-0 transition-transform duration-300 widget-shadow flex flex-col justify-between border-b-4 border-[#c7d2fe] dark:border-l-4 dark:border-b-0 dark:border-blue-500/50 snap-center cursor-grab active:cursor-grabbing">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100 leading-snug">Project brainstorm: Use pastel themes for the new UI kit.</p>
              <div className="flex justify-between items-center text-blue-600/60 dark:text-blue-500/40">
                <span className="text-[10px] font-bold">IDEAS</span>
                <span className="material-symbols-outlined text-sm">lightbulb</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-20">
        <button className="h-14 w-14 bg-primary text-white rounded-full flex items-center justify-center shadow-xl shadow-primary/40 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer">
          <span className="material-symbols-outlined text-3xl block mt-[1px]">add</span>
        </button>
      </div>
    </div>
  );
}
