import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function KingGodCastleHelperView() {
    return (
        <div className="min-h-screen bg-bg-900 text-text-primary">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-900/80 backdrop-blur-md border-b border-bg-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <span className="text-2xl group-hover:-translate-x-1 transition-transform">
                            ←
                        </span>
                        <span className="font-display font-bold">Back to Portfolio</span>
                    </Link>
                    <div className="text-accent-tertiary font-bold">KGC Helper</div>
                </div>
            </nav>

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
                    <div className="mt-12 p-12 border border-dashed border-bg-700 rounded-3xl bg-bg-800/30">
                        <span className="text-6xl block mb-4">🧮</span>
                        <p className="text-text-secondary">Application Demo Coming Soon</p>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
