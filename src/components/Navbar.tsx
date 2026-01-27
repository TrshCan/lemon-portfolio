import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "./ThemeContext";

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

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-bg-700 bg-bg-800 rounded-b-xl"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-text-secondary hover:text-accent-primary transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4">
                <a
                  href="mailto:buianhkiet1234678@gmail.com?subject=Get%20In%20Touch&body=Hi%2C%0A%0AI%20would%20like%20to%20connect%20with%20you.%0A"
                  className="block w-full text-center px-4 py-2 bg-accent-primary/20 border border-accent-primary text-accent-primary rounded-lg"
                >
                  Get In Touch
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
