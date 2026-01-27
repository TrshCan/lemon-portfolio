import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();

  return (
    <motion.footer
      className="py-8 border-t border-bg-700 bg-bg-900 transition-colors duration-300"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 font-display font-bold"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-2xl">{theme === "dark" ? "😴" : "🍋"}</span>
            <span className="text-accent-primary">{theme === "dark" ? "Sleepy" : "Lemon"}</span>
            <span className="text-accent-secondary">{theme === "dark" ? "Lemon" : "Dev"}</span>
          </motion.div>

          {/* Copyright */}
          <div className="text-text-secondary text-sm text-center">
            <p>
              © {currentYear} {theme === "dark" ? "Sleepy" : "Lemon"} Developer. Built with{" "}
              <span className="text-accent-tertiary">♥</span> and{" "}
              {theme === "dark" ? (
                <>lots of <span className="text-accent-primary">☕ coffee</span></>
              ) : (
                <>lots of <span className="text-accent-secondary">🍋 lemonade</span></>
              )}.
            </p>
          </div>

          {/* Made with */}
          <div className="flex items-center gap-2 text-text-secondary text-sm">
            <span>Made with</span>
            <span className="text-accent-primary">React</span>
            <span>+</span>
            <span className="text-accent-secondary">TS</span>
            <span>+</span>
            <span className="text-accent-tertiary">Tailwind</span>
          </div>
        </div>

        {/* Fun message */}
        <motion.div
          className="text-center mt-6 text-text-secondary opacity-60 text-sm font-display"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p>
            {theme === "dark"
              ? "// Current status: Dreaming in binary 😴"
              : "// Current status: Squeezing fresh code 🍋"}
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
