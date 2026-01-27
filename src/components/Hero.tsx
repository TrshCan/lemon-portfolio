import { useState } from "react";
import { motion } from "framer-motion";
import { LemonIcon } from "./LemonIcon";
import { CoffeeCup } from "./CoffeeCup";
import { Lemonade } from "./Lemonade";
import { useTheme } from "./ThemeContext";
import { WIPModal } from "./WIPModal";

export function Hero() {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative pt-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-bg-800 rounded-full border border-bg-700 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="w-2 h-2 bg-accent-primary rounded-full animate-pulse" />
              <span className="text-text-secondary text-sm">
                Currently working full-time
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-display"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="text-text-primary">Hello, I'm a</span>
              <br />
              <span className="text-accent-primary glow-text">
                {theme === "dark" ? "Sleepy" : "Lemonade"}
              </span>
              <br />
              <span className="text-accent-secondary">Developer</span>
              <span className="text-accent-tertiary animate-blink">_</span>
            </motion.h1>

            <motion.p
              className="text-text-secondary text-lg mb-8 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {theme === "dark" ? (
                <>
                  Crafting dreams into digital reality. Fueled by{" "}
                  <span className="text-accent-tertiary">☕ midnight coffee</span>,
                  inspired by <span className="text-accent-primary">quiet moments</span>,
                  turning complex problems into elegant solutions.
                </>
              ) : (
                <>
                  I craft beautiful web experiences with a zesty twist. Fueled
                  by <span className="text-accent-secondary">🍋 fresh lemonade</span>,
                  inspired by <span className="text-accent-primary">fresh ideas</span>,
                  I turn concepts into elegant code.
                </>
              )}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <a
                href="#projects"
                className="px-8 py-3 bg-accent-primary text-bg-900 font-semibold rounded-lg hover:bg-accent-secondary transition-colors duration-300 shadow-lg shadow-accent-primary/20"
              >
                View My Work
              </a>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-3 border border-accent-secondary text-accent-secondary font-semibold rounded-lg hover:bg-accent-secondary/10 transition-colors duration-300 inline-flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download CV
              </button>
            </motion.div>

            {/* Tech stack */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <p className="text-text-secondary text-sm mb-4">Tech I work with:</p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {["React", "TypeScript", "Node.js", "Laravel", "Tailwind"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-bg-800 border border-bg-700 rounded-md text-sm text-text-secondary hover:border-accent-primary hover:text-accent-primary transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Content */}
          <motion.div
            className="relative flex justify-center items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* Glow background */}
              <div className="absolute inset-0 bg-accent-primary/20 blur-3xl rounded-full" />

              {/* Lemon mascot */}
              <LemonIcon className="w-64 h-64 lg:w-80 lg:h-80 animate-float relative z-10" />

              {/* Thematic Content: Coffee (Dark) vs Lemonade (Light) */}
              <div className="absolute -right-8 bottom-0">
                {theme === "dark" ? <CoffeeCup /> : <Lemonade />}
              </div>

              {/* Thematic Decoration: Moon (Dark) vs Sun (Light) */}
              <div className="absolute -top-8 -right-8 w-20 h-20 bg-accent-tertiary rounded-full shadow-lg shadow-accent-tertiary/50 overflow-hidden">
                {theme === "dark" ? (
                  /* Moon */
                  <div className="w-full h-full relative bg-accent-secondary">
                    <div className="absolute -top-2 -left-2 w-16 h-16 bg-bg-900 rounded-full" />
                  </div>
                ) : (
                  /* Sun */
                  <div className="absolute inset-2 bg-accent-primary rounded-full" />
                )}
              </div>

              {/* Code snippets floating */}
              <div className="absolute -left-12 top-1/4 px-3 py-2 bg-bg-800/90 backdrop-blur rounded-lg border border-bg-700 font-display text-sm z-20">
                <span className="text-accent-primary">const</span>{" "}
                <span className="text-accent-tertiary">{theme === "dark" ? "cozy" : "fresh"}</span>{" "}
                <span className="text-text-primary">=</span>{" "}
                <span className="text-accent-secondary">true</span>
                <span className="text-text-primary">;</span>
              </div>

              <div className="absolute -right-16 top-1/3 px-3 py-2 bg-bg-800/90 backdrop-blur rounded-lg border border-bg-700 font-display text-sm z-20">
                <span className="text-accent-secondary">// TODO:</span>
                <br />
                <span className="text-text-secondary">{theme === "dark" ? "// stay sleepy" : "// squeeze more"}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-text-secondary text-sm">Scroll down</span>
        <div className="w-6 h-10 border-bg-700 rounded-full flex justify-center border-2">
          <div className="w-1 h-3 bg-accent-primary rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
      <WIPModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
