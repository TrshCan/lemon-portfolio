import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface Song {
    name: string;
    url: string;
}

export function MusicPlayerProject() {
    const [songs] = useState<Song[]>([
        { name: "2hollis - poster boy", url: "/music/2hollis - poster boy (official audio) [H2vTrHc-OGk].mp3" },
        { name: "BEFORE", url: "/music/BEFORE [gBD5rseNPXU].mp3" },
        { name: "LET THE WORLD BURN", url: "/music/LET THE WORLD BURN (with G-Eazy & Ari Abdul) - Remix [Official Lyric Video] [7iB20fByOb0].mp3" },
        { name: "Luigi's Mansion [Remix]", url: "/music/Luigi's Mansion [Remix][2024] [L92p8mrUK2g].mp3" },
        { name: "Where We Are", url: "/music/Sync, Triangle, Eytan Peled - Where We Are _ Alternative _ NCS - Copyright Free Music [n3Jq0BKxsfY].mp3" },
        { name: "itazura (sped up)", url: "/music/itazura (sped up) [TNbVdhx1r10].mp3" }
    ]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(0.1);
    const [currentTime, setCurrentTime] = useState("0:00");
    const [duration, setDuration] = useState("0:00");
    const [repeatMode, setRepeatMode] = useState<"none" | "one" | "all">("all");
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' + secs : secs}`;
    };

    const togglePlay = () => {
        if (!audioRef.current || currentIndex === -1) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const playSong = (index: number) => {
        setCurrentIndex(index);
        setIsPlaying(true);
        // Playback will be handled by the useEffect watching currentIndex
    };

    const nextSong = () => {
        if (songs.length === 0) return;
        const nextIdx = (currentIndex + 1) % songs.length;
        playSong(nextIdx);
    };

    const prevSong = () => {
        if (songs.length === 0) return;
        const prevIdx = (currentIndex - 1 + songs.length) % songs.length;
        playSong(prevIdx);
    };

    const toggleRepeat = () => {
        const modes: ("none" | "one" | "all")[] = ["none", "one", "all"];
        const nextMode = modes[(modes.indexOf(repeatMode) + 1) % modes.length];
        setRepeatMode(nextMode);
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateProgress = () => {
            const p = (audio.currentTime / audio.duration) * 100;
            setProgress(p || 0);
            setCurrentTime(formatTime(audio.currentTime));
            setDuration(formatTime(audio.duration));
        };

        const handleEnded = () => {
            if (repeatMode === "one") {
                audio.currentTime = 0;
                audio.play();
            } else if (repeatMode === "all") {
                nextSong();
            } else if (currentIndex < songs.length - 1) {
                nextSong();
            } else {
                setIsPlaying(false);
            }
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', handleEnded);
        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [currentIndex, songs, repeatMode]);

    useEffect(() => {
        if (audioRef.current && isPlaying) {
            audioRef.current.play().catch(err => console.log("Playback failed:", err));
        }
    }, [currentIndex, isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!audioRef.current || !audioRef.current.duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const p = clickX / rect.width;
        audioRef.current.currentTime = p * audioRef.current.duration;
    };

    return (
        <div className="bg-bg-900 border border-bg-700 rounded-3xl p-6 md:p-8 shadow-xl max-w-4xl mx-auto overflow-hidden relative">
            <audio ref={audioRef} src={songs[currentIndex]?.url} />

            {/* Decorative Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-accent-secondary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row gap-8 relative z-10">
                {/* Playlist Section */}
                <div className="lg:w-1/3 flex flex-col h-[400px]">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-text-primary">Playlist</h3>
                        <span className="text-xs text-text-secondary bg-bg-800 px-2 py-1 rounded-full">{songs.length} Songs</span>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                        {songs.map((song, i) => (
                            <button
                                key={i}
                                onClick={() => playSong(i)}
                                className={`w-full text-left p-3 rounded-xl transition-all border ${i === currentIndex
                                    ? "bg-accent-primary/10 border-accent-primary/30 text-accent-primary"
                                    : "bg-bg-800 border-bg-700 text-text-secondary hover:border-bg-600 hover:bg-bg-700"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-bold opacity-30">{String(i + 1).padStart(2, '0')}</span>
                                    <p className="text-xs font-bold truncate">{song.name}</p>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Volume Control */}
                    <div className="mt-6 pt-6 border-t border-bg-700">
                        <div className="flex items-center gap-3">
                            <span className="text-text-secondary">
                                {volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}
                            </span>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                className="flex-1 h-1.5 bg-bg-800 rounded-full appearance-none cursor-pointer accent-accent-primary"
                            />
                        </div>
                    </div>
                </div>

                {/* Player Section */}
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 bg-bg-800 border border-bg-700 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
                        {/* Visualizer Placeholder */}
                        <div className="flex items-center gap-1 h-32">
                            {[...Array(12)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ height: isPlaying ? [20, 80, 40, 60, 20] : 20 }}
                                    transition={{
                                        duration: 1.2,
                                        repeat: Infinity,
                                        delay: i * 0.1,
                                        ease: "easeInOut"
                                    }}
                                    className="w-2 bg-accent-primary rounded-full opacity-50"
                                />
                            ))}
                        </div>

                        <div className="mt-8 text-center w-full px-4">
                            <h4 className="text-xl font-black text-text-primary tracking-tight truncate">
                                {songs[currentIndex]?.name || "Select a song"}
                            </h4>
                            <p className="text-xs text-accent-primary font-bold uppercase tracking-widest mt-1">
                                {isPlaying ? "Playing Now" : "Paused"}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        {/* Progress Bar */}
                        <div className="space-y-2">
                            <div
                                className="h-2 bg-bg-800 border border-bg-700 rounded-full cursor-pointer relative overflow-hidden group"
                                onClick={handleProgressClick}
                            >
                                <div
                                    className="absolute top-0 left-0 h-full bg-accent-primary transition-all duration-100 group-hover:bg-accent-secondary"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                                <span>{currentTime}</span>
                                <span>{duration}</span>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between px-4">
                            <button
                                onClick={toggleRepeat}
                                className={`p-2 transition-all ${repeatMode !== 'none' ? 'text-accent-primary' : 'text-text-secondary hover:text-text-primary'}`}
                                title={`Repeat Mode: ${repeatMode}`}
                            >
                                <div className="relative">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    {repeatMode === 'one' && (
                                        <span className="absolute -top-1 -right-1 text-[8px] font-bold bg-accent-primary text-bg-900 rounded-full w-3 h-3 flex items-center justify-center">1</span>
                                    )}
                                </div>
                            </button>

                            <div className="flex items-center gap-6">
                                <button
                                    onClick={prevSong}
                                    className="p-3 text-text-primary hover:text-accent-primary transition-colors hover:scale-110 active:scale-90"
                                    title="Previous"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                                    </svg>
                                </button>

                                <button
                                    onClick={togglePlay}
                                    className="w-16 h-16 flex items-center justify-center bg-accent-primary text-bg-900 rounded-full hover:scale-105 transition-all shadow-lg active:scale-95 shadow-accent-primary/20"
                                    title={isPlaying ? "Pause" : "Play"}
                                >
                                    {isPlaying ? (
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    )}
                                </button>

                                <button
                                    onClick={nextSong}
                                    className="p-3 text-text-primary hover:text-accent-primary transition-colors hover:scale-110 active:scale-90"
                                    title="Next"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Spacer to balance repeat button */}
                            <div className="w-9" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-bg-700 flex justify-between items-center text-[10px] uppercase tracking-widest text-text-secondary">
                <span>Web Audio API</span>
                <span className="text-accent-secondary font-bold">Harmony Player 2.0</span>
            </div>
        </div>
    );
}
