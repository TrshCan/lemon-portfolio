import { motion } from "framer-motion";
import { OwlIcon } from "./OwlIcon";
import { CoffeeCup } from "./CoffeeCup";

export function Hero() {
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-night-800 rounded-full border border-night-600 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="w-2 h-2 bg-owl-green rounded-full animate-pulse" />
              <span className="text-night-500 text-sm">
                Available for freelance work
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-display"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="text-white">Hello, I'm a</span>
              <br />
              <span className="text-owl-cyan glow-text">Night OwL</span>
              <br />
              <span className="text-owl-purple">Developer</span>
              <span className="text-owl-amber animate-blink">_</span>
            </motion.h1>

            <motion.p
              className="text-night-500 text-lg mb-8 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              I craft beautiful web experiences while the world sleeps. Fueled
              by <span className="text-coffee-light">☕ coffee</span> and
              inspired by the <span className="text-owl-yellow">🌙 night</span>,
              I turn ideas into elegant code.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <a
                href="#projects"
                className="px-8 py-3 bg-owl-cyan text-night-900 font-semibold rounded-lg hover:bg-owl-green transition-colors duration-300 shadow-lg shadow-owl-cyan/20"
              >
                View My Work
              </a>
              <a
                href="/Tran-Huy-Hoang.pdf"
                download
                className="px-8 py-3 border border-owl-purple text-owl-purple font-semibold rounded-lg hover:bg-owl-purple/10 transition-colors duration-300 inline-flex items-center justify-center gap-2"
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
              </a>
            </motion.div>

            {/* Tech stack */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <p className="text-night-600 text-sm mb-4">Tech I work with:</p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {["React", "TypeScript", "Node.js", "Next.js", "Tailwind"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-night-800 border border-night-600 rounded-md text-sm text-night-500 hover:border-owl-cyan hover:text-owl-cyan transition-colors duration-300"
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
              <div className="absolute inset-0 bg-owl-purple/20 blur-3xl rounded-full" />

              {/* Owl */}
              <OwlIcon className="w-64 h-64 lg:w-80 lg:h-80 animate-float relative z-10" />

              {/* Coffee positioned near the owl */}
              <div className="absolute -right-8 bottom-0">
                <CoffeeCup />
              </div>

              {/* Moon */}
              <div className="absolute -top-8 -right-8 w-20 h-20 bg-owl-yellow rounded-full shadow-lg shadow-owl-yellow/50">
                <div className="absolute top-2 right-2 w-16 h-16 bg-night-900 rounded-full" />
              </div>

              {/* Code snippets floating */}
              <div className="absolute -left-12 top-1/4 px-3 py-2 bg-night-800/90 backdrop-blur rounded-lg border border-night-600 font-display text-sm">
                <span className="text-owl-purple">const</span>{" "}
                <span className="text-owl-blue">sleep</span>{" "}
                <span className="text-white">=</span>{" "}
                <span className="text-owl-amber">false</span>
                <span className="text-white">;</span>
              </div>

              <div className="absolute -right-16 top-1/3 px-3 py-2 bg-night-800/90 backdrop-blur rounded-lg border border-night-600 font-display text-sm">
                <span className="text-owl-pink">{"// TODO:"}</span>
                <br />
                <span className="text-night-500">{"// more coffee"}</span>
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
        <span className="text-night-600 text-sm">Scroll down</span>
        <div className="w-6 h-10 border-2 border-night-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-owl-cyan rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
