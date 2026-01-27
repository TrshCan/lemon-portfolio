import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";

const projects: {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  accent: string;
  status?: "completed" | "in-progress" | "concept";
}[] = [
    {
      title: "King God Castle Toolkit",
      description:
        "A powerful desktop utility for King God Castle game. Download game versions and convert assets for Unity. Built with Tauri v2, Next.js 15, Rust, and TypeScript.",
      image: "/projects/kgc-toolkit.png",
      tags: ["Tauri", "Next.js", "Rust", "TypeScript"],
      githubUrl: "https://github.com/nowl-it/King-God-Castle-Toolkit",
      accent: "primary",
      status: "completed",
    },
    {
      title: "KGC Team Share",
      description:
        "Full-stack web app for creating, sharing, and discovering King God Castle team compositions. Features drag & drop team builder, community builds, and multi-language support.",
      image: "/projects/kgc-team-share.png",
      tags: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
      liveUrl: "https://kgc-team-share.vercel.app",
      githubUrl: "https://github.com/nowl-it/kgc-team-share",
      accent: "secondary",
      status: "completed",
    },
    {
      title: "King God Castle Assets",
      description:
        "A platform for sharing and browsing King God Castle game assets. Explore hero images, icons, and other game resources.",
      image: "/projects/kgc-assets.png",
      tags: ["Coming Soon"],
      accent: "tertiary",
      status: "concept",
    },
    {
      title: "King God Castle AI",
      description:
        "AI assistant for King God Castle. Answer questions about the game, suggest team compositions, and auto-play features. Premium subscription service.",
      image: "/projects/kgc-ai.png",
      tags: ["AI", "Premium"],
      accent: "primary",
      status: "concept",
    },
  ];

export function Projects() {
  // Nếu chưa có project nào, hiển thị placeholder
  if (projects.length === 0) {
    return (
      <section id="projects" className="py-20 relative bg-bg-800/30 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <span className="text-accent-primary font-display text-sm tracking-wider">
              MY WORK
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-text-primary">
              Projects
            </h2>
            <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
              I'm currently working on some exciting projects. Stay tuned! 🚀
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="text-center py-16 bg-bg-900/50 rounded-2xl border border-bg-700 border-dashed">
              <div className="text-6xl mb-4">🛠️</div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Coming Soon</h3>
              <p className="text-text-secondary max-w-md mx-auto">
                I'm a student working on various projects. Check back soon or
                visit my GitHub to see what I'm building!
              </p>
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 border border-accent-primary text-accent-primary rounded-lg hover:bg-accent-primary hover:text-bg-900 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View GitHub Profile</span>
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 relative bg-bg-800/30 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <span className="text-accent-primary font-display text-sm tracking-wider">
            MY WORK
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-text-primary">
            Projects
          </h2>
          <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
            Here are some projects I've been working on
          </p>
        </ScrollReveal>

        {/* Projects grid */}
        <StaggerContainer
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          staggerDelay={0.1}
        >
          {projects.map((project) => (
            <StaggerItem key={project.title}>
              <motion.article
                className="group bg-bg-900 rounded-2xl overflow-hidden border border-bg-700 hover:border-accent-primary transition-all duration-300 h-full cursor-pointer"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  {project.status === "concept" ? (
                    <div className="w-full h-full bg-linear-to-br from-bg-800 to-bg-700 flex items-center justify-center">
                      <span className="text-6xl">💡</span>
                    </div>
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-bg-900 via-transparent to-transparent" />

                  {/* Status badge */}
                  {project.status === "concept" && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-accent-tertiary/20 border border-accent-tertiary rounded-full text-accent-tertiary text-xs font-medium">
                      💡 Concept
                    </div>
                  )}
                  {project.status === "in-progress" && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-accent-secondary/20 border border-accent-secondary rounded-full text-accent-secondary text-xs font-medium">
                      🚧 In Progress
                    </div>
                  )}

                  {/* Overlay links - only for completed projects */}
                  {project.status !== "concept" &&
                    (project.liveUrl || project.githubUrl) && (
                      <div className="absolute inset-0 bg-bg-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-accent-primary rounded-full flex items-center justify-center text-bg-900 hover:scale-110 transition-transform"
                            title="View Live"
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
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-bg-900 hover:scale-110 transition-transform"
                            title="View Code"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className={`text-xl font-bold text-accent-${project.accent} mb-2`}
                  >
                    {project.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-bg-800 rounded text-xs text-text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
