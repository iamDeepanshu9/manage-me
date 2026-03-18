"use client";

import React, { useState, useEffect } from "react";

export const ClockWidget = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState<{ temp: number; icon: string; city: string } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Get city name using OpenStreetMap Nominatim API
            const geoRes = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const geoData = await geoRes.json();
            const city = geoData.address.city || geoData.address.town || geoData.address.village || 'Unknown Location';

            // Get weather using Open-Meteo API
            const weatherRes = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=fahrenheit`
            );
            const weatherData = await weatherRes.json();
            const current = weatherData.current_weather;
            const temp = Math.round(current.temperature);
            
            // Map WMO code to Material symbol
            let icon = 'cloud';
            if (current.weathercode === 0) icon = 'sunny';
            else if (current.weathercode >= 1 && current.weathercode <= 3) icon = 'partly_cloudy_day';
            else if (current.weathercode >= 60 && current.weathercode <= 69) icon = 'rainy';
            else if (current.weathercode >= 71 && current.weathercode <= 79) icon = 'ac_unit';
            else if (current.weathercode >= 95) icon = 'thunderstorm';

            setWeather({ temp, icon, city });
          } catch (error) {
            console.error("Failed to fetch weather data:", error);
          }
        },
        (error) => console.error("Geolocation error:", error)
      );
    }
  }, []);

  const formatTime = (date: Date) => {
    return {
      hours: date.getHours().toString().padStart(2, '0'),
      minutes: date.getMinutes().toString().padStart(2, '0'),
      seconds: date.getSeconds().toString().padStart(2, '0'),
    };
  };

  const { hours, minutes, seconds } = formatTime(time);
  const dateStr = time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="glass rounded-2xl p-8 flex flex-col justify-center items-center widget-shadow transform transition-transform hover:scale-[1.01] duration-300 h-full">
      <p className="text-slate-500 text-sm font-medium uppercase tracking-widest mb-2">{dateStr}</p>
      <div className="text-7xl font-bold tracking-tighter text-slate-900 dark:text-slate-100 flex items-center justify-center min-w-[300px]">
        {hours}:{minutes}<span className="text-primary animate-pulse mx-1">:</span>{seconds}
      </div>
      <div className="mt-4 flex gap-4 text-slate-400 text-sm font-medium min-h-[20px]">
        {weather ? (
          <>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">{weather.icon}</span> {weather.temp}°F
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">location_on</span> {weather.city}
            </span>
          </>
        ) : (
          <span className="flex items-center gap-1 animate-pulse">
            Fetching location & weather...
          </span>
        )}
      </div>
    </div>
  );
};
