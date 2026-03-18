"use client";

import React from "react";

export const NewsWidget = () => (
  <div className="glass rounded-2xl p-6 widget-shadow overflow-hidden flex flex-col transform transition-transform hover:scale-[1.02] duration-300 h-full">
    <div className="flex justify-between items-center mb-4 shrink-0">
      <h3 className="text-xs font-bold text-slate-800 dark:text-slate-400 uppercase tracking-wider">Trending News</h3>
      <div className="flex items-center gap-1">
        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
        <span className="text-[10px] text-slate-500 font-bold uppercase">Live</span>
      </div>
    </div>
    <div className="news-container relative flex-1 min-h-0 overflow-hidden">
      <div className="flex flex-col gap-4 animate-vertical-scroll">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="contents">
            <div className="flex gap-3 group cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-slate-800 flex-shrink-0 overflow-hidden">
                <img alt="Tech news thumbnail" className="w-full h-full object-cover group-hover:scale-110 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjbLiQ_785GDNf6EhcJyX-5RIg2fpEGAWIOC5KVUeU5kVq13x6O8QoWmFz00fwKlqSWMBQIzudKLvEvux8_Woahw700VrP6sDjb9dlzdlIm7ObaPuXAqDK4qHwekLguvob3TOyxqmN6DF4ZG0fQEixx-mI9h-Qc_qeTjQ1ChPZIumLqtM6ETSIH80mzGzcQlv2FNahjHAdEx6xMPL4HnLDZ1j5sQXsDsMUkD7y3wcj2AATphYP1KVJqfNd0zfLL3UXNHNhT30JVrrh"/>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-200 line-clamp-2 leading-tight group-hover:text-primary transition-colors">The future of generative AI in interface design</h4>
                <p className="text-[10px] text-slate-500 mt-1">TechCrunch • 2m ago</p>
              </div>
            </div>
            <div className="flex gap-3 group cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-slate-800 flex-shrink-0 overflow-hidden">
                <img alt="Global news thumbnail" className="w-full h-full object-cover group-hover:scale-110 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-cVeJoHRE-tZrTupMz9etVJ6CFk_Cp6j9Wd2yfV0JlnaReutcCyczWhadapd14TKTIoBf27-DoBL3AKOt3c4SL96GtYSdSyZjl_kuSkCpg4-R-prYSJr6PaoG8EkiWcQMwCxRURrz76Db2hXLluH-JJQahuDCRZm3mHdggkHNevt7EYm1v_MtglMey4pTJvLjTaIbBtMFAvcY6HNlgSL-1djnpfRiz-lESCa2_Abio1a56etHtTXtH8JWKJAQQP9HjgHMzsmEuGWU"/>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-200 line-clamp-2 leading-tight group-hover:text-primary transition-colors">Global space mission reaches Mars orbit successfully</h4>
                <p className="text-[10px] text-slate-500 mt-1">NASA News • 15m ago</p>
              </div>
            </div>
            <div className="flex gap-3 group cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-slate-800 flex-shrink-0 overflow-hidden">
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
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-slate-900 to-transparent pointer-events-none"></div>
    </div>
  </div>
);
