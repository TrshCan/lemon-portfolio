import { useState } from "react";
import { Link } from "react-router-dom";
import { SkinsList } from "../components/kgc/SkinsList";

export function SkinsPageView() {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const toggleDropdown = (name: string) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    return (
        <div className="min-h-screen bg-bg-900 text-text-primary" onClick={() => setActiveDropdown(null)}>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-900/80 backdrop-blur-md border-b border-bg-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2 group text-sm text-text-secondary hover:text-text-primary transition-colors">
                            <span className="group-hover:-translate-x-1 transition-transform">←</span>
                            <span>Portfolio</span>
                        </Link>

                        <div className="flex items-center gap-6">
                            {/* Calculator Dropdown */}
                            <div className="relative group" onClick={(e) => e.stopPropagation()}>
                                <button
                                    className="flex items-center gap-1 font-bold text-sm hover:text-accent-tertiary transition-colors"
                                    onClick={() => toggleDropdown('calculator')}
                                >
                                    Calculator
                                    <span className="text-xs">▼</span>
                                </button>
                                {activeDropdown === 'calculator' && (
                                    <div className="absolute top-full left-0 mt-2 w-48 bg-bg-800 border border-bg-700 rounded-xl shadow-xl overflow-hidden py-1">
                                        <div className="px-4 py-2 text-xs text-text-secondary uppercase tracking-widest font-bold bg-bg-900/50">Tools</div>
                                        <button className="w-full text-left px-4 py-2 text-sm hover:bg-bg-700 transition-colors">Exp Calculator</button>
                                        <button className="w-full text-left px-4 py-2 text-sm hover:bg-bg-700 transition-colors">Stat Planner</button>
                                    </div>
                                )}
                            </div>

                            {/* Information Dropdown */}
                            <div className="relative group" onClick={(e) => e.stopPropagation()}>
                                <button
                                    className="flex items-center gap-1 font-bold text-sm hover:text-accent-tertiary transition-colors"
                                    onClick={() => toggleDropdown('info')}
                                >
                                    Information
                                    <span className="text-xs">▼</span>
                                </button>
                                {activeDropdown === 'info' && (
                                    <div className="absolute top-full left-0 mt-2 w-48 bg-bg-800 border border-bg-700 rounded-xl shadow-xl overflow-hidden py-1">
                                        <div className="px-4 py-2 text-xs text-text-secondary uppercase tracking-widest font-bold bg-bg-900/50">Database</div>
                                        <Link to="/kgc-helper/skins" className="block w-full text-left px-4 py-2 text-sm hover:bg-bg-700 transition-colors">
                                            Skins List
                                        </Link>
                                        <button className="w-full text-left px-4 py-2 text-sm hover:bg-bg-700 transition-colors">Heroes</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <Link to="/kgc-helper" className="text-accent-tertiary font-bold cursor-pointer">
                        KGC Helper
                    </Link>
                </div>
            </nav>

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1920px] mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">Skins Database</h2>
                    <Link
                        to="/kgc-helper"
                        className="text-sm text-text-secondary hover:text-text-primary underline"
                    >
                        Back to Helper
                    </Link>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-200 p-4 rounded-xl mb-6 flex items-start gap-3">
                    <span className="text-xl">⚠️</span>
                    <div>
                        <p className="font-bold text-yellow-100">Work In Progress</p>
                        <p className="text-sm opacity-90 mt-1">
                            The data presented in the table below is currently being updated. Some fields may be incomplete or out of date.
                            Only fields currently visible in the table are verified to be up-to-date.
                        </p>
                    </div>
                </div>
                <SkinsList />
            </main>
        </div>
    );
}
