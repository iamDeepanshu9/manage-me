import { ThemeToggle } from "@/components/ThemeToggle";
import { FullscreenButton } from "@/components/FullscreenButton";
import { DashboardGrid } from "@/components/DashboardGrid";

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
        <DashboardGrid />
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
