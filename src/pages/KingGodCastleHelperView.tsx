import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { KGCHeader } from "../components/kgc/KGCHeader";

interface UpdateLog {
    version: string;
    date: string;
    description: string;
}

export function KingGodCastleHelperView() {
    const [logs, setLogs] = useState<UpdateLog[]>([]);

    useEffect(() => {
        // Add timestamp to prevent caching
        fetch(`/json/skins/update-logs.json?t=${new Date().getTime()}`)
            .then(res => res.json())
            .then(data => setLogs(data))
            .catch(err => console.error("Failed to load logs:", err));
    }, []);

    return (
        <div className="min-h-screen bg-bg-900 text-text-primary">
            <KGCHeader />

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">King God Castle Helper</h1>
                    <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                        Your ultimate companion for King God Castle.
                    </p>

                    {/* Credits Section */}
                    <div className="mt-16 text-left max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold mb-4 text-accent-tertiary">Credits</h3>
                        <div className="bg-bg-800 p-6 rounded-2xl border border-bg-700">
                            <p className="text-text-secondary mb-2">
                                Special thanks to the community members who maintain the data:
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-text-primary">
                                <li><strong>Anan'Geom</strong>: Original Creator of the Skins Spreadsheet.</li>
                                <li><strong>Lemoinie</strong>: Current Maintainer of the Skins Spreadsheet.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Update Log Section */}
                    <div className="mt-8 text-left max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold mb-4 text-accent-tertiary">Update Log</h3>
                        <div className="bg-bg-800 p-6 rounded-2xl border border-bg-700 space-y-4">
                            {logs.map((log, index) => (
                                <div key={index} className={index > 0 ? "border-t border-bg-700 pt-4" : ""}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-mono bg-accent-tertiary/20 text-accent-tertiary px-2 py-0.5 rounded">{log.version}</span>
                                        <span className="text-sm text-text-secondary">{log.date}</span>
                                    </div>
                                    <p className="text-text-primary">{log.description}</p>
                                </div>
                            ))}
                            {logs.length === 0 && <p className="text-text-secondary italic">Loading updates...</p>}
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
