import { motion, AnimatePresence } from "framer-motion";
import { LemonIcon } from "./LemonIcon";
import { CoffeeCup } from "./CoffeeCup";
import { useTheme } from "./ThemeContext";

interface WIPModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function WIPModal({ isOpen, onClose }: WIPModalProps) {
    const { theme } = useTheme();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-bg-900/80 backdrop-blur-sm z-[60] cursor-pointer"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 flex items-center justify-center z-[70] pointer-events-none px-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-bg-800 border border-bg-700 rounded-2xl p-8 max-w-md w-full shadow-2xl relative pointer-events-auto"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-text-secondary hover:text-accent-primary transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="text-center">
                                {/* Thematic Illustration */}
                                <div className="flex justify-center mb-6">
                                    {theme === "dark" ? (
                                        <div className="relative">
                                            <CoffeeCup />
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: [0, 1, 0] }}
                                                transition={{ duration: 3, repeat: Infinity }}
                                                className="absolute -top-4 -right-4 text-2xl"
                                            >
                                                zzz...
                                            </motion.div>
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <LemonIcon className="w-32 h-32" />
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                                className="absolute -top-2 -right-2 text-2xl"
                                            >
                                                ✨
                                            </motion.div>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-text-primary mb-4">
                                    {theme === "dark" ? "Still Brewing..." : "Squeezing Details..."}
                                </h3>
                                <p className="text-text-secondary mb-8 leading-relaxed">
                                    {theme === "dark"
                                        ? "Zzz... the dev is currently brewing the perfect resume to match this quiet night. It will be served shortly!"
                                        : "The dev is squeezing out the final details to make it extra fresh. This refreshment will be ready soon!"}
                                </p>

                                <button
                                    onClick={onClose}
                                    className="w-full py-3 bg-accent-primary text-bg-900 font-semibold rounded-lg hover:bg-accent-secondary transition-colors duration-300 shadow-lg shadow-accent-primary/20"
                                >
                                    Got it!
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
