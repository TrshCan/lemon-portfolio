import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function OtherProjectPrototypes() {
    return (
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Weather Prototype */}
            <motion.div
                whileHover={{ y: -5 }}
                className="group relative bg-bg-800 border border-bg-700 rounded-3xl overflow-hidden p-8 shadow-xl"
            >
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="text-8xl">🌦️</span>
                </div>

                <div className="relative z-10 space-y-6">
                    <div>
                        <div className="flex items-center gap-2 text-accent-primary font-bold text-xs uppercase tracking-widest mb-1">
                            <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
                            Live Forecast App
                        </div>
                        <h3 className="text-2xl font-black text-text-primary">Lemon Forecast</h3>
                    </div>

                    <p className="text-text-secondary text-sm leading-relaxed">
                        Real-time weather application with global city search,
                        hourly trends, and daily forecasts. Clean, glass-inspired UI.
                    </p>

                    <div className="flex gap-4">
                        <Link
                            to="/weather"
                            className="px-6 py-3 bg-accent-primary text-bg-900 text-xs font-bold rounded-xl hover:bg-accent-secondary transition-colors"
                        >
                            Launch App
                        </Link>
                    </div>
                </div>

                {/* Visual Decoration */}
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-accent-primary opacity-30 shadow-[0_0_15px_rgba(var(--accent-primary-rgb),0.5)]`} />
            </motion.div>

            {/* Music Player Prototype */}
            <motion.div
                whileHover={{ y: -5 }}
                className="group relative bg-bg-800 border border-bg-700 rounded-3xl overflow-hidden p-8 shadow-xl"
            >
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="text-8xl">🎵</span>
                </div>

                <div className="relative z-10 space-y-6">
                    <div>
                        <div className="flex items-center gap-2 text-accent-secondary font-bold text-xs uppercase tracking-widest mb-1">
                            <span className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse" />
                            Audio Visualizer
                        </div>
                        <h3 className="text-2xl font-black text-text-primary">Harmony Player</h3>
                    </div>

                    <p className="text-text-secondary text-sm leading-relaxed">
                        High-fidelity audio player with local file support,
                        playlist management, and reactive animations.
                    </p>

                    <div className="flex gap-4">
                        <Link
                            to="/music"
                            className="px-6 py-3 bg-accent-secondary text-bg-900 text-xs font-bold rounded-xl hover:bg-accent-primary transition-colors"
                        >
                            Launch App
                        </Link>
                    </div>
                </div>

                {/* Visual Decoration */}
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-accent-secondary opacity-30 shadow-[0_0_15px_rgba(var(--accent-secondary-rgb),0.5)]`} />
            </motion.div>


            {/* King God Castle Helper Prototype */}
            <motion.div
                whileHover={{ y: -5 }}
                className="group relative bg-bg-800 border border-bg-700 rounded-3xl overflow-hidden p-8 shadow-xl"
            >
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="text-8xl">�️</span>
                </div>

                <div className="relative z-10 space-y-6">
                    <div>
                        <div className="flex items-center gap-2 text-accent-tertiary font-bold text-xs uppercase tracking-widest mb-1">
                            <span className="w-2 h-2 rounded-full bg-accent-tertiary animate-pulse" />
                            Game Companion
                        </div>
                        <h3 className="text-2xl font-black text-text-primary">KGC Helper</h3>
                    </div>

                    <p className="text-text-secondary text-sm leading-relaxed">
                        A utility app for King God Castle players. Features hero guides, equipment stats, and team builder.
                    </p>

                    <div className="flex gap-4">
                        <Link
                            to="/kgc-helper"
                            className="px-6 py-3 bg-accent-tertiary text-bg-900 text-xs font-bold rounded-xl hover:bg-white transition-colors"
                        >
                            Launch App
                        </Link>
                    </div>
                </div>

                {/* Visual Decoration */}
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-accent-tertiary opacity-30 shadow-[0_0_15px_rgba(var(--accent-tertiary-rgb),0.5)]`} />
            </motion.div>
        </div>
    );
}
