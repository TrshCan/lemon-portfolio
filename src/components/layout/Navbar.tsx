import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "../../contexts/ThemeContext";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-900/80 backdrop-blur-md border-b border-bg-700 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 text-xl font-display font-bold"
          >
            <span className="text-2xl">{theme === "dark" ? "😴" : "🍋"}</span>
            <span className="text-accent-primary">
              {theme === "dark" ? "Sleepy" : "Lemon"}
            </span>
            <span className="text-accent-secondary">
              {theme === "dark" ? "Lemon" : "Dev"}
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-text-secondary hover:text-accent-primary transition-colors duration-300 font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:buianhkiet1234678@gmail.com?subject=Get%20In%20Touch&body=Hi%2C%0A%0AI%20would%20like%20to%20connect%20with%20you.%0A"
              className="px-4 py-2 bg-accent-primary/20 border border-accent-primary text-accent-primary rounded-lg hover:bg-accent-primary hover:text-bg-900 transition-all duration-300"
            >
              Get In Touch
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-secondary hover:text-accent-primary"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[60] bg-bg-900 flex flex-col p-8 md:hidden"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-2 text-xl font-bold">
                  <span className="text-2xl">{theme === "dark" ? "😴" : "🍋"}</span>
                  <span className="text-accent-primary">{theme === "dark" ? "Sleepy" : "Lemon"}</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-text-secondary hover:text-accent-primary bg-bg-800 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-3xl font-black text-text-primary hover:text-accent-primary transition-colors flex items-center justify-between group"
                  >
                    <span>{link.label}</span>
                    <span className="text-accent-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto space-y-6">
                <div className="h-px bg-bg-700 w-full" />
                <a
                  href="mailto:buianhkiet1234678@gmail.com?subject=Get%20In%20Touch"
                  className="block w-full text-center py-4 bg-accent-primary text-bg-900 font-bold rounded-xl shadow-lg shadow-accent-primary/20"
                >
                  Get In Touch
                </a>
                <div className="flex justify-center gap-6 text-text-secondary">
                  {/* Add social/contact hint if needed */}
                  <p className="text-[10px] uppercase tracking-widest font-bold opacity-50">Squeeze the day 🍋</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
