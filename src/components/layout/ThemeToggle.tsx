import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-bg-800 border border-bg-700 hover:border-accent-primary transition-colors flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <motion.span
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    className="text-accent-primary"
                >
                    🌙
                </motion.span>
            ) : (
                <motion.span
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    className="text-accent-primary"
                >
                    ☀️
                </motion.span>
            )}
        </motion.button>
    );
}
