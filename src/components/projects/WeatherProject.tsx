import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface WeatherData {
    current: {
        temp: number;
        description: string;
        icon: string;
        humidity: number;
        windSpeed: number;
        cloudCover: number;
    };
    hourly: Array<{
        time: string;
        temp: number;
        description: string;
        icon: string;
        rainChance: number;
    }>;
    daily: Array<{
        date: string;
        description: string;
        icon: string;
        tempMax: number;
        tempMin: number;
    }>;
}

const weatherIcons: Record<number, string> = {
    0: "☀️", // Clear sky
    1: "🌤️", // Mainly clear
    2: "⛅", // Partly cloudy
    3: "☁️", // Overcast
    45: "🌫️", // Fog
    48: "🌫️", // Depositing rime fog
    51: "🌧️", // Drizzle: Light
    53: "🌧️", // Drizzle: Moderate
    55: "🌧️", // Drizzle: Dense
    61: "🌧️", // Rain: Slight
    63: "🌧️", // Rain: Moderate
    65: "🌧️", // Rain: Heavy
    80: "🌦️", // Rain showers: Slight
    81: "🌦️", // Rain showers: Moderate
    82: "🌦️", // Rain showers: Violent
    95: "⛈️", // Thunderstorm
};

const weatherDescriptions: Record<number, string> = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    95: "Thunderstorm",
};

export function WeatherProject() {
    const [city, setCity] = useState("Ho Chi Minh City");
    const [searchQuery, setSearchQuery] = useState("");
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchWeather = async (cityName: string) => {
        try {
            setLoading(true);
            setError(null);

            // 1. Geocoding to get lat/lon
            const geoRes = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
                    cityName
                )}&count=1&language=en&format=json`
            );
            const geoData = await geoRes.json();

            if (!geoData.results || geoData.results.length === 0) {
                throw new Error("City not found");
            }

            const { latitude, longitude, name } = geoData.results[0];
            setCity(name);

            // 2. Fetch weather data
            const weatherRes = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,cloud_cover&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
            );
            const data = await weatherRes.json();

            // Process data
            const processed: WeatherData = {
                current: {
                    temp: Math.round(data.current.temperature_2m),
                    description: weatherDescriptions[data.current.weather_code] || "Clear",
                    icon: weatherIcons[data.current.weather_code] || "☀️",
                    humidity: data.current.relative_humidity_2m,
                    windSpeed: data.current.wind_speed_10m,
                    cloudCover: data.current.cloud_cover,
                },
                hourly: data.hourly.time.slice(0, 12).map((time: string, i: number) => ({
                    time: new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    temp: Math.round(data.hourly.temperature_2m[i]),
                    description: weatherDescriptions[data.hourly.weather_code[i]] || "Clear",
                    icon: weatherIcons[data.hourly.weather_code[i]] || "☀️",
                    rainChance: data.hourly.precipitation_probability[i],
                })),
                daily: data.daily.time.slice(0, 5).map((time: string, i: number) => ({
                    date: new Date(time).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }),
                    description: weatherDescriptions[data.daily.weather_code[i]] || "Clear",
                    icon: weatherIcons[data.daily.weather_code[i]] || "☀️",
                    tempMax: Math.round(data.daily.temperature_2m_max[i]),
                    tempMin: Math.round(data.daily.temperature_2m_min[i]),
                })),
            };

            setWeather(processed);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather("Ho Chi Minh City");
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            fetchWeather(searchQuery);
        }
    };

    return (
        <div className="bg-bg-900 border border-bg-700 rounded-3xl p-6 md:p-8 shadow-xl max-w-4xl mx-auto overflow-hidden relative">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 relative z-10">
                <div>
                    <h3 className="text-2xl font-bold text-text-primary mb-1 flex items-center gap-2">
                        <span className="text-3xl">🌦️</span> Weather Forecast
                    </h3>
                    <p className="text-text-secondary text-sm">Real-time weather for any city</p>
                </div>
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search city..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 bg-bg-800 border border-bg-700 rounded-xl text-text-primary focus:outline-none focus:border-accent-primary transition-colors text-sm w-full md:w-48"
                    />
                    <button
                        type="submit"
                        className="p-2 bg-accent-primary text-bg-900 rounded-xl hover:bg-accent-secondary transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </form>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <div className="w-12 h-12 border-4 border-accent-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-text-secondary animate-pulse text-sm">Gathering clouds...</p>
                </div>
            ) : error ? (
                <div className="text-center py-20">
                    <span className="text-6xl mb-4 block">🏜️</span>
                    <p className="text-accent-secondary font-bold text-lg mb-2">Oops! Something went wrong.</p>
                    <p className="text-text-secondary text-sm">{error}. Try another city!</p>
                </div>
            ) : weather ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    <div className="bg-bg-800 border border-bg-700 rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="text-9xl">{weather.current.icon}</span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 relative z-10">
                            <div className="flex items-center gap-6">
                                <span className="text-7xl md:text-8xl">{weather.current.icon}</span>
                                <div>
                                    <h4 className="text-4xl md:text-6xl font-black text-text-primary tracking-tighter">
                                        {weather.current.temp}°
                                    </h4>
                                    <p className="text-xl text-accent-primary font-bold">{weather.current.description}</p>
                                    <p className="text-text-secondary font-medium">{city}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 border-t md:border-t-0 md:border-l border-bg-700 pt-6 md:pt-0 md:pl-8">
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-1">Humidity</p>
                                    <p className="text-lg font-bold text-text-primary">{weather.current.humidity}%</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-1">Wind</p>
                                    <p className="text-lg font-bold text-text-primary">{weather.current.windSpeed} <span className="text-xs">km/h</span></p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-1">Clouds</p>
                                    <p className="text-lg font-bold text-text-primary">{weather.current.cloudCover}%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12">
                        {/* Hourly Forecast */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h5 className="text-sm font-bold text-text-primary uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-accent-primary" /> Hourly Forecast
                                </h5>
                                <span className="text-[10px] text-text-secondary uppercase tracking-widest font-medium">Next 12 Hours</span>
                            </div>

                            <div className="relative group/hourly">
                                {/* Temperature Curve Overlay */}
                                <div className="absolute inset-0 pointer-events-none z-10 pt-10 pb-16 px-6">
                                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 100">
                                        <defs>
                                            <linearGradient id="tempGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="var(--color-accent-primary)" stopOpacity="0.2" />
                                                <stop offset="50%" stopColor="var(--color-accent-primary)" stopOpacity="0.5" />
                                                <stop offset="100%" stopColor="var(--color-accent-primary)" stopOpacity="0.2" />
                                            </linearGradient>
                                        </defs>
                                        <motion.path
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ pathLength: 1, opacity: 1 }}
                                            transition={{ duration: 1.5, ease: "easeInOut" }}
                                            d={`M ${weather.hourly.map((h, i) => `${(i * 100) + 50},${70 - (h.temp - Math.min(...weather.hourly.map(t => t.temp))) * 4}`).join(' L ')}`}
                                            fill="none"
                                            stroke="url(#tempGradient)"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            className="drop-shadow-[0_0_8px_rgba(var(--accent-primary-rgb),0.5)]"
                                        />
                                        {weather.hourly.map((h, i) => (
                                            <motion.circle
                                                key={i}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.1 * i }}
                                                cx={(i * 100) + 50}
                                                cy={70 - (h.temp - Math.min(...weather.hourly.map(t => t.temp))) * 4}
                                                r="4"
                                                fill="var(--color-bg-800)"
                                                stroke="var(--color-accent-primary)"
                                                strokeWidth="2"
                                            />
                                        ))}
                                    </svg>
                                </div>

                                <div className="flex gap-4 overflow-x-auto pb-6 pt-4 px-2 no-scrollbar scroll-smooth snap-x snap-mandatory">
                                    {weather.hourly.map((h, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ y: -5 }}
                                            className="flex flex-col items-center p-4 bg-bg-800/40 backdrop-blur-md rounded-2xl border border-bg-700/50 min-w-[110px] snap-center relative z-20 group hover:bg-bg-800/80 transition-all duration-300"
                                        >
                                            <span className="text-[10px] text-text-secondary font-bold mb-3 uppercase tracking-tighter opacity-60 group-hover:opacity-100 transition-opacity">{h.time}</span>
                                            <span className="text-3xl mb-4 transform group-hover:scale-110 transition-transform">{h.icon}</span>

                                            <div className="mt-8 flex flex-col items-center">
                                                <span className="text-xl font-black text-text-primary tracking-tighter">{h.temp}°</span>
                                                {h.rainChance > 0 && (
                                                    <div className="mt-2 flex items-center gap-1 text-[9px] font-bold text-accent-primary/80">
                                                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                                                        </svg>
                                                        {h.rainChance}%
                                                    </div>
                                                )}
                                            </div>

                                            {/* Hover Detail */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                <div className="w-full h-full rounded-2xl bg-accent-primary/5 border border-accent-primary/20" />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Scroll Indicators */}
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-linear-to-r from-bg-900 to-transparent w-8 h-full pointer-events-none opacity-0 group-hover/hourly:opacity-100 transition-opacity" />
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-linear-to-l from-bg-900 to-transparent w-8 h-full pointer-events-none opacity-0 group-hover/hourly:opacity-100 transition-opacity" />
                            </div>
                        </div>

                        {/* Daily Forecast */}
                        <div className="space-y-4">
                            <h5 className="text-sm font-bold text-text-primary uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent-secondary" /> Daily Forecast
                            </h5>
                            <div className="grid md:grid-cols-2 gap-3">
                                {weather.daily.map((d, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-bg-800 rounded-2xl border border-bg-700 hover:border-bg-600 transition-colors">
                                        <span className="text-sm text-text-secondary font-bold w-28">{d.date}</span>
                                        <div className="flex items-center gap-4">
                                            <span className="text-2xl">{d.icon}</span>
                                            <span className="text-xs text-text-secondary font-medium hidden md:block">{d.description}</span>
                                        </div>
                                        <div className="flex gap-4 w-20 justify-end">
                                            <span className="text-sm font-black text-text-primary">{d.tempMax}°</span>
                                            <span className="text-sm font-medium text-text-secondary">{d.tempMin}°</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            ) : null}

            <div className="mt-8 pt-6 border-t border-bg-700 flex justify-between items-center text-[10px] uppercase tracking-widest text-text-secondary">
                <span>Powered by Open-Meteo</span>
                <span className="text-accent-primary font-bold">Lemon Forecast v2.0</span>
            </div>
        </div>
    );
}
