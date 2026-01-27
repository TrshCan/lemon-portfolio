import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../ui/ScrollReveal";

const skillCategories = [
  {
    title: "Frontend",
    icon: "🖥️",
    accent: "primary",
    skills: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Bootstrap",
      "HTML/CSS",
      "JavaScript",
    ],
  },
  {
    title: "Backend",
    icon: "⚙️",
    accent: "secondary",
    skills: [
      "Node.js",
      "NestJS",
      "Laravel",
      "GraphQL",
      "PostgreSQL",
      "Prisma",
      "Zod",
      "REST API",
      "SQL",
    ],
  },
  {
    title: "Tools & Others",
    icon: "🛠️",
    accent: "tertiary",
    skills: ["Git", "VS Code", "Figma", "Docker", "Vercel"],
  },
];

const learningSkills = ["Redis"];

export function Skills() {
  return (
    <section id="skills" className="py-20 relative transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <span className="text-accent-primary font-display text-sm tracking-wider">
            MY SKILLS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-text-primary">
            Technologies I'm Learning
          </h2>
          <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
            As a student, I'm constantly exploring and learning new technologies
          </p>
        </ScrollReveal>

        <StaggerContainer
          className="grid md:grid-cols-3 gap-8"
          staggerDelay={0.15}
        >
          {skillCategories.map((category) => (
            <StaggerItem key={category.title}>
              <motion.div
                className={`bg-bg-800/50 backdrop-blur rounded-2xl p-6 border border-bg-700 hover:border-accent-${category.accent}/50 transition-colors duration-300 h-full`}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-12 h-12 bg-accent-${category.accent}/20 rounded-xl flex items-center justify-center`}
                  >
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">
                      {category.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      className={`px-3 py-2 bg-bg-900 border border-bg-700 rounded-lg text-sm text-text-primary hover:border-accent-${category.accent} hover:text-accent-${category.accent} transition-colors duration-300 cursor-pointer`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Currently Learning */}
        <ScrollReveal className="mt-12 text-center" delay={0.3}>
          <h4 className="text-text-secondary mb-4">📚 Currently Learning:</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {learningSkills.map((tech) => (
              <motion.span
                key={tech}
                className="px-4 py-2 bg-bg-800/50 border border-bg-700 rounded-full text-sm text-text-secondary hover:text-accent-tertiary hover:border-accent-tertiary transition-colors duration-300 cursor-pointer"
                whileHover={{ scale: 1.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
