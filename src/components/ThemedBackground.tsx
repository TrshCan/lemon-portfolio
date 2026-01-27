import { useMemo, useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";

interface Star {
    id: number;
    left: string;
    top: string;
    size: number;
    delay: string;
    duration: string;
}

interface ShootingStar {
    id: number;
    left: string;
    top: string;
    width: number;
    delay: string;
}

interface Bird {
    id: number;
    top: string;
    scale: number;
    delay: string;
    duration: string;
}

interface Tree {
    id: number;
    scale: number;
    delay: string;
}

export function ThemedBackground() {
    const { theme } = useTheme();
    const [isVisible, setIsVisible] = useState(false);

    // Re-trigger delay when theme changes
    useEffect(() => {
        setIsVisible(false);
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, [theme]);

    const stars = useMemo<Star[]>(() => {
        return Array.from({ length: 80 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: Math.random() * 2 + 1,
            delay: `${Math.random() * 3}s`,
            duration: `${Math.random() * 2 + 2}s`,
        }));
    }, []);

    const shootingStars = useMemo<ShootingStar[]>(() => {
        return Array.from({ length: 3 }, (_, i) => ({
            id: i,
            left: `${50 + Math.random() * 50}%`,
            top: `${Math.random() * 40}%`,
            width: 60 + Math.random() * 60,
            delay: `${Math.random() * 10}s`,
        }));
    }, []);

    const birds = useMemo<Bird[]>(() => {
        return Array.from({ length: 4 }, (_, i) => ({
            id: i,
            top: `${10 + Math.random() * 20}%`,
            scale: 0.8 + Math.random() * 0.7,
            delay: `${Math.random() * 15}s`,
            duration: `${15 + Math.random() * 10}s`,
        }));
    }, []);

    const trees = useMemo<Tree[]>(() => {
        return [1.2, 0.8, 1.5, 1.0, 1.3].map((baseScale, i) => ({
            id: i,
            scale: baseScale * (0.9 + Math.random() * 0.2),
            delay: `${i * 0.5}s`,
        }));
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 transition-colors duration-500">
            {/* Celestial Orb (Black Hole / Sun) */}
            <div className="absolute top-[-50px] right-[-50px] sm:top-[-100px] sm:right-[-100px] w-64 h-64 sm:w-96 sm:h-96 opacity-40 sm:opacity-60 transition-opacity duration-1000">
                {theme === "dark" ? (
                    /* Black Hole */
                    <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full bg-linear-to-tr from-accent-tertiary via-transparent to-accent-primary animate-swirl blur-xl opacity-30" />
                        <div className="absolute inset-4 rounded-full bg-linear-to-bl from-accent-secondary via-transparent to-accent-tertiary animate-swirl blur-2xl opacity-20" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
                        <div className="w-1/3 h-1/3 rounded-full bg-black shadow-[0_0_40px_rgba(251,191,36,0.5)] z-10" />
                        <div className="absolute inset-0 rounded-full border border-white/5 blur-[2px]" />
                    </div>
                ) : (
                    /* Sun */
                    <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full bg-accent-secondary blur-[60px] animate-sun-glow opacity-60" />
                        <div className="absolute inset-8 rounded-full bg-accent-primary blur-[40px] animate-sun-glow opacity-40" style={{ animationDelay: '1s' }} />
                        <div className="w-1/4 h-1/4 rounded-full bg-accent-secondary shadow-[0_0_60px_rgba(201,147,0,0.6)] z-10" />
                    </div>
                )}
            </div>

            {/* Stars (Constant in Dark Mode) */}
            {theme === "dark" && (
                <div className="absolute inset-0 transition-opacity duration-1000">
                    {stars.map((star) => (
                        <div
                            key={`star-${star.id}`}
                            className="absolute rounded-full bg-white animate-twinkle"
                            style={{
                                left: star.left,
                                top: star.top,
                                width: star.size,
                                height: star.size,
                                animationDelay: star.delay,
                                animationDuration: star.duration,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Restricted-display elements (with 2s delay) */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                {theme === "dark" ? (
                    /* Shooting Stars */
                    <>
                        {shootingStars.map((ss) => (
                            <div
                                key={`ss-${ss.id}`}
                                className="absolute h-[1px] bg-linear-to-r from-white/80 to-transparent animate-shooting-star"
                                style={{
                                    left: ss.left,
                                    top: ss.top,
                                    width: `${ss.width}px`,
                                    animationDelay: ss.delay,
                                }}
                            />
                        ))}
                    </>
                ) : (
                    /* Birds & Trees */
                    <>
                        {birds.map((bird) => (
                            <div
                                key={`bird-${bird.id}`}
                                className="absolute animate-bird-fly"
                                style={{
                                    top: bird.top,
                                    animationDelay: bird.delay,
                                    animationDuration: bird.duration,
                                    transform: `scale(${bird.scale})`,
                                }}
                            >
                                <svg
                                    className="w-6 h-4 text-text-secondary/30 animate-bird-flap"
                                    viewBox="0 0 24 16"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                >
                                    <path d="M2 10c4-4 8-4 10 0 2-4 6-4 10 0" />
                                </svg>
                            </div>
                        ))}

                        <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end opacity-10">
                            {trees.map((tree) => (
                                <div
                                    key={`tree-${tree.id}`}
                                    className="animate-tree-sway"
                                    style={{
                                        animationDelay: tree.delay,
                                        transform: `scale(${tree.scale})`,
                                    }}
                                >
                                    <svg
                                        className="w-24 h-48 text-accent-primary"
                                        viewBox="0 0 100 200"
                                        fill="currentColor"
                                    >
                                        <path d="M50 20 L85 150 L50 140 L15 150 Z" />
                                        <rect x="45" y="140" width="10" height="60" />
                                    </svg>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
