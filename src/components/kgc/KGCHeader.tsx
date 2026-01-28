import { useState } from "react";
import { Link } from "react-router-dom";

export function KGCHeader() {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const toggleDropdown = (name: string) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-900/80 backdrop-blur-md border-b border-bg-700" onMouseLeave={() => setActiveDropdown(null)}>
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
                                <div className="absolute top-full left-0 mt-2 w-48 bg-bg-800 border border-bg-700 rounded-xl shadow-xl py-1">
                                    <div className="px-4 py-2 text-xs text-text-secondary uppercase tracking-widest font-bold bg-bg-900/50">Tools</div>
                                    <div className="relative group/stats">
                                        <button className="w-full text-left px-4 py-2 text-sm hover:bg-bg-700 transition-colors flex items-center justify-between">
                                            Stats Calculator
                                            <span className="text-[10px] opacity-50">▶</span>
                                        </button>
                                        <div className="absolute left-full top-0 ml-0.5 w-40 bg-bg-800 border border-bg-700 rounded-xl shadow-xl overflow-hidden py-1 hidden group-hover/stats:block">
                                            <Link to="/kgc-helper/calculator/sacramentum" className="block w-full text-left px-4 py-2 text-sm hover:bg-bg-700 transition-colors" onClick={() => setActiveDropdown(null)}>Sacra</Link>
                                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-bg-700 transition-colors">EV</button>
                                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-bg-700 transition-colors">BM</button>
                                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-bg-700 transition-colors">Immac</button>
                                        </div>
                                    </div>
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
                                    <Link to="/kgc-helper/skins" className="block w-full text-left px-4 py-2 text-sm hover:bg-bg-700 transition-colors" onClick={() => setActiveDropdown(null)}>
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
    );
}
