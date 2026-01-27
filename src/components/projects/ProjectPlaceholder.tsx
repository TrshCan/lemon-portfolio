import { motion } from "framer-motion";
import { LemonIcon } from "../ui/LemonIcon";
import { CoffeeCup } from "../ui/CoffeeCup";
import { useTheme } from "../../contexts/ThemeContext";

interface ProjectPlaceholderProps {
    accent: string;
}

export function ProjectPlaceholder({ accent }: ProjectPlaceholderProps) {
    const { theme } = useTheme();

    return (
        <div className={`relative w-full h-full overflow-hidden flex items-center justify-center bg-bg-800`}>
            {/* Background Patterns */}
            <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%">
                    <pattern
                        id="dots"
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                    >
                        <circle cx="2" cy="2" r="1" fill="currentColor" className={`text-accent-${accent}`} />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>
            </div>

            {/* Main Icon with Animation */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
            >
                <div className={`w-20 h-20 rounded-2xl bg-accent-${accent}/10 border border-accent-${accent}/20 flex items-center justify-center backdrop-blur-sm shadow-xl`}>
                    {theme === "dark" ? (
                        <CoffeeCup className="w-12 h-12" />
                    ) : (
                        <LemonIcon className="w-12 h-12" />
                    )}
                </div>

                {/* Floating Particles */}
                <motion.div
                    animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-4 -right-4 text-2xl"
                >
                    {theme === "dark" ? "☕" : "🍋"}
                </motion.div>
                <motion.div
                    animate={{
                        y: [0, 10, 0],
                        rotate: [0, -5, 0]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-2 -left-4 text-xl"
                >
                    ✨
                </motion.div>
            </motion.div>

            {/* Decorative Gradients */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-accent-${accent}/5 blur-3xl rounded-full`} />
            <div className={`absolute bottom-0 left-0 w-32 h-32 bg-accent-${accent}/5 blur-3xl rounded-full`} />
        </div>
    );
}
