import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";

const skillCategories = [
  {
    title: "Frontend",
    icon: "🖥️",
    color: "owl-cyan",
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "HTML/CSS",
      "JavaScript",
    ],
  },
  {
    title: "Backend",
    icon: "⚙️",
    color: "owl-purple",
    skills: ["Node.js", "Express", "Python", "REST API", "SQL", "Supabase"],
  },
  {
    title: "Tools & Others",
    icon: "🛠️",
    color: "owl-green",
    skills: ["Git", "VS Code", "Linux", "Figma", "Docker", "Vercel"],
  },
];

const learningSkills = ["Rust", "Go", "Kubernetes", "AWS", "GraphQL", "Redis"];

export function Skills() {
  return (
    <section id="skills" className="py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-owl-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-owl-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <span className="text-owl-cyan font-display text-sm tracking-wider">
            MY SKILLS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-white">
            Technologies I'm Learning
          </h2>
          <p className="text-night-500 mt-4 max-w-2xl mx-auto">
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
                className={`bg-night-800/50 backdrop-blur rounded-2xl p-6 border border-night-700 hover:border-${category.color}/50 transition-colors duration-300 h-full`}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-12 h-12 bg-${category.color}/20 rounded-xl flex items-center justify-center`}
                  >
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {category.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      className={`px-3 py-2 bg-night-900 border border-night-600 rounded-lg text-sm text-white hover:border-${category.color} hover:text-${category.color} transition-colors duration-300`}
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
          <h4 className="text-night-500 mb-4">📚 Currently Learning:</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {learningSkills.map((tech) => (
              <motion.span
                key={tech}
                className="px-4 py-2 bg-night-800/50 border border-night-700 rounded-full text-sm text-night-500 hover:text-owl-amber hover:border-owl-amber transition-colors duration-300"
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
