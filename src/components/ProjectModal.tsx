import { motion, AnimatePresence } from "framer-motion";
import { LemonIcon } from "./LemonIcon";
import { CoffeeCup } from "./CoffeeCup";
import { useTheme } from "./ThemeContext";

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: {
        title: string;
        description: string;
        accent: string;
        tags: string[];
        status?: "completed" | "in-progress" | "concept";
        liveUrl?: string;
        githubUrl?: string;
        image?: string;
    } | null;
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
    const { theme } = useTheme();

    if (!project) return null;

    const isConcept = project.status === "concept";
    const hasImage = !!project.image;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-bg-900/80 backdrop-blur-md z-[60] cursor-pointer"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 flex items-center justify-center z-[70] pointer-events-none px-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className={`bg-bg-800 border border-bg-700 rounded-3xl overflow-hidden shadow-2xl relative pointer-events-auto border-t-4 border-t-accent-${project.accent} ${hasImage ? 'max-w-3xl w-full' : 'max-w-2xl w-full'}`}
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 bg-bg-900/50 backdrop-blur-sm rounded-full text-text-secondary hover:text-accent-primary transition-colors z-20"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Conditional Layout */}
                            {hasImage ? (
                                /* Image-based Layout (Banner) */
                                <div className="flex flex-col">
                                    <div className="relative h-64 md:h-96 overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className={`absolute inset-0 bg-linear-to-t from-bg-800 via-bg-800/20 to-transparent`} />

                                        {/* Overlay Title */}
                                        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-3 bg-accent-${project.accent}/20 backdrop-blur-md text-accent-${project.accent} border border-accent-${project.accent}/30`}>
                                                {project.status || "Completed"}
                                            </div>
                                            <h3 className="text-3xl md:text-4xl font-bold text-text-primary leading-tight">
                                                {project.title}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="p-8 md:p-12 grid md:grid-cols-3 gap-8 overflow-y-auto max-h-[50vh]">
                                        <div className="md:col-span-2 space-y-6">
                                            <p className="text-text-secondary text-lg leading-relaxed">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tags.map(tag => (
                                                    <span key={tag} className="px-3 py-1 bg-bg-900 border border-bg-700 rounded-lg text-sm text-text-secondary">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="pt-2">
                                                {isConcept ? (
                                                    <div className="space-y-4">
                                                        <p className="text-sm font-medium text-text-primary flex items-center gap-2">
                                                            <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
                                                            {theme === "dark" ? "Drafting the blueprint..." : "Squeezing out the details..."}
                                                        </p>
                                                        <button
                                                            onClick={onClose}
                                                            className={`w-full py-4 bg-accent-${project.accent} text-bg-900 font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-accent-${project.accent}/20`}
                                                        >
                                                            Looking Forward!
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col gap-3">
                                                        {project.liveUrl && (
                                                            <a
                                                                href={project.liveUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className={`flex items-center justify-center gap-2 py-4 bg-accent-${project.accent} text-bg-900 font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-accent-${project.accent}/20`}
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                </svg>
                                                                Live Preview
                                                            </a>
                                                        )}
                                                        {project.githubUrl && (
                                                            <a
                                                                href={project.githubUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center justify-center gap-2 py-4 bg-bg-700 text-text-primary font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all border border-bg-600"
                                                            >
                                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                                </svg>
                                                                Source Code
                                                            </a>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* Animation-based Layout (2-Column) */
                                <div className="grid md:grid-cols-2">
                                    {/* Visual Side */}
                                    <div className={`aspect-square md:aspect-auto bg-accent-${project.accent}/5 flex items-center justify-center relative overflow-hidden p-12`}>
                                        <div className="absolute inset-0 opacity-20 pointer-events-none">
                                            <svg width="100%" height="100%">
                                                <pattern id="modal-dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                                                    <circle cx="2" cy="2" r="1.5" fill="currentColor" className={`text-accent-${project.accent}`} />
                                                </pattern>
                                                <rect width="100%" height="100%" fill="url(#modal-dots)" />
                                            </svg>
                                        </div>

                                        <motion.div
                                            animate={{
                                                scale: [1, 1.05, 1],
                                                rotate: [0, 2, -2, 0]
                                            }}
                                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                            className="relative z-10"
                                        >
                                            {theme === "dark" ? (
                                                <CoffeeCup className="w-48 h-48 drop-shadow-2xl" />
                                            ) : (
                                                <LemonIcon className="w-48 h-48 drop-shadow-2xl" />
                                            )}
                                        </motion.div>

                                        {/* Decorative bits */}
                                        <div className={`absolute top-0 left-0 w-full h-full bg-linear-to-br from-accent-${project.accent}/10 to-transparent`} />
                                    </div>

                                    {/* Content Side */}
                                    <div className="p-8 md:p-12 overflow-y-auto max-h-[80vh]">
                                        <div className="mb-6">
                                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-3 bg-accent-${project.accent}/10 text-accent-${project.accent} border border-accent-${project.accent}/20`}>
                                                {project.status || "Completed"}
                                            </div>
                                            <h3 className="text-3xl font-bold text-text-primary leading-tight">
                                                {project.title}
                                            </h3>
                                        </div>

                                        <div className="space-y-6">
                                            <p className="text-text-secondary leading-relaxed">
                                                {project.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2">
                                                {project.tags.map(tag => (
                                                    <span key={tag} className="px-3 py-1 bg-bg-900 border border-bg-700 rounded-lg text-sm text-text-secondary">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="pt-6 space-y-4">
                                                {isConcept ? (
                                                    <>
                                                        <p className="text-sm font-medium text-text-primary mb-4 flex items-center gap-2">
                                                            <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
                                                            {theme === "dark" ? "Drafting the blueprint..." : "Squeezing out the details..."}
                                                        </p>
                                                        <button
                                                            onClick={onClose}
                                                            className={`w-full py-4 bg-accent-${project.accent} text-bg-900 font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-accent-${project.accent}/20`}
                                                        >
                                                            Looking Forward!
                                                        </button>
                                                    </>
                                                ) : (
                                                    <div className="grid grid-cols-2 gap-4">
                                                        {project.liveUrl && (
                                                            <a
                                                                href={project.liveUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className={`flex items-center justify-center gap-2 py-3 bg-accent-${project.accent} text-bg-900 font-bold rounded-xl hover:scale-[1.05] transition-all`}
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                </svg>
                                                                Live
                                                            </a>
                                                        )}
                                                        {project.githubUrl && (
                                                            <a
                                                                href={project.githubUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center justify-center gap-2 py-3 bg-bg-700 text-text-primary font-bold rounded-xl hover:scale-[1.05] transition-all"
                                                            >
                                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                                </svg>
                                                                Code
                                                            </a>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
