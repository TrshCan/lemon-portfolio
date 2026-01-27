import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "../ui/ScrollReveal";
import { useTheme } from "../../contexts/ThemeContext";
import { WIPModal } from "../ui/WIPModal";

export function About() {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <span className="text-accent-primary font-display text-sm tracking-wider">
            ABOUT ME
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-text-primary">
            The Developer Behind the Screen
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image/Illustration side */}
          <ScrollReveal direction="left">
            <div className="relative bg-bg-800 rounded-2xl p-8 border border-bg-700">
              {/* Terminal window */}
              <div className="bg-bg-900 rounded-lg overflow-hidden border border-bg-700/50 shadow-2xl">
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-bg-800 border-b border-bg-700">
                  <div className="w-3 h-3 rounded-full bg-accent-tertiary" />
                  <div className="w-3 h-3 rounded-full bg-accent-secondary" />
                  <div className="w-3 h-3 rounded-full bg-accent-primary" />
                  <span className="ml-4 text-text-secondary text-sm font-display">
                    ~/lemon-dev/about.ts
                  </span>
                </div>

                {/* Terminal content */}
                <div className="p-4 font-display text-sm leading-relaxed">
                  <p>
                    <span className="text-accent-primary">interface</span>{" "}
                    <span className="text-accent-secondary">Developer</span> {"{"}
                  </p>
                  <p className="pl-4">
                    <span className="text-accent-secondary">name</span>:{" "}
                    <span className="text-accent-primary">"{theme === "dark" ? "Sleepy" : "Lemon"} Dev"</span>;
                  </p>
                  <p className="pl-4">
                    <span className="text-accent-secondary">role</span>:{" "}
                    <span className="text-accent-primary">"Web Developer"</span>;
                  </p>
                  <p className="pl-4">
                    <span className="text-accent-secondary">location</span>:{" "}
                    <span className="text-accent-primary">"Vietnam 🇻🇳"</span>;
                  </p>
                  <p className="pl-4">
                    <span className="text-accent-secondary">{theme === "dark" ? "coffeePerDay" : "lemonadePerDay"}</span>:{" "}
                    <span className="text-accent-tertiary">Infinity</span>;
                  </p>
                  <p className="pl-4">
                    <span className="text-accent-secondary">passions</span>: [
                  </p>
                  <p className="pl-8">
                    <span className="text-accent-primary">"Clean Code"</span>,
                  </p>
                  <p className="pl-8">
                    <span className="text-accent-primary">"UI/UX Design"</span>
                  </p>
                  <p className="pl-4">];</p>
                  <p>{"}"}</p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-primary/10 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-secondary/10 rounded-full blur-xl" />
            </div>
          </ScrollReveal>

          {/* Text content side */}
          <ScrollReveal direction="right" delay={0.2}>
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              {theme === "dark" ? "Dreaming Up Better Code 🌙" : "Squeezing Every Drop of Creativity 🍋"}
            </h3>

            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                {theme === "dark" ? (
                  "Just like a calm night brings clarity, I find peace in writing clean and focused code. I specialize in turning complex requirements into seamless digital experiences."
                ) : (
                  "Just like a fresh lemon adds zest to any dish, I bring a fresh perspective to every project I work on. There's something magical about turning ideas into clean, functional code."
                )}
              </p>
              <p>
                As a <span className="text-accent-primary">full-stack developer</span>
                , I specialize in building modern web applications with{" "}
                <span className="text-accent-secondary">React</span>,
                <span className="text-accent-secondary"> TypeScript</span>,
                <span className="text-accent-primary"> Laravel</span>, and
                <span className="text-accent-primary"> Node.js</span>.
              </p>
              <p>
                When I'm not coding, I'm {theme === "dark" ? "enjoying the quiet of the night" : "exploring new technologies"} or searching for the perfect {theme === "dark" ? "brew" : "squeeze"} to fuel my next project.
              </p>
            </div>

            {/* CTA */}
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-bg-800 border border-bg-700 rounded-lg text-text-primary hover:border-accent-primary hover:text-accent-primary transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
              Download Resume
            </motion.button>
          </ScrollReveal>
        </div>
      </div>
      <WIPModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
