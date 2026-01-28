import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KGCHeader } from "../components/kgc/KGCHeader";
import {
    Box,
    Typography,
    Paper,
    Grid,
    MenuItem,
    TextField,
    FormControlLabel,
    Checkbox,
    Card,
    CardContent,
    Slider,
    Tooltip,
    LinearProgress
} from "@mui/material";

interface Hero {
    id: string;
    name: string;
    baseAtk: number;
    baseSp: number;
    baseHp: number;
}

const NumberCounter = ({ value, className }: { value: number; className?: string }) => {
    return (
        <motion.span
            key={value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={className}
        >
            {value}
        </motion.span>
    );
};

export function SacramentumCalculatorView() {
    const [heroes, setHeroes] = useState<Hero[]>([]);
    const [targetHero, setTargetHero] = useState<string>("");
    const [sourceHero, setSourceHero] = useState<string>("");
    const [hasSacramentum, setHasSacramentum] = useState<boolean>(true);
    const [level, setLevel] = useState<number>(1);
    const [guardPoint, setGuardPoint] = useState<number>(0);

    useEffect(() => {
        fetch('/json/kgc/heroes.json')
            .then(res => res.json())
            .then(data => {
                setHeroes(data);
                if (data.length > 0) {
                    setTargetHero(data[0].id);
                    setSourceHero(data[1] ? data[1].id : data[0].id);
                }
            })
            .catch(err => console.error("Failed to load heroes:", err));
    }, []);

    const selectedTarget = heroes.find(h => h.id === targetHero);
    const selectedSource = heroes.find(h => h.id === sourceHero);

    // Calculation logic
    const calculateRate = () => {
        if (!hasSacramentum) return 0;
        return (5 + (level * 0.75) + (guardPoint * 0.1));
    };

    const transferRate = calculateRate();

    const calculateExtra = (baseValue: number) => {
        if (!hasSacramentum || !selectedSource) return 0;
        return Math.floor(baseValue * (transferRate / 100));
    };

    const extraAtk = calculateExtra(selectedSource?.baseAtk || 0);
    const extraSp = calculateExtra(selectedSource?.baseSp || 0);
    const extraHp = calculateExtra(selectedSource?.baseHp || 0);

    return (
        <div className="min-h-screen bg-bg-900 text-text-primary selection:bg-accent-tertiary/30">
            <KGCHeader />
            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    <Box textAlign="center" className="relative">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Typography variant="h2" className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent-tertiary to-accent-secondary">
                                Sacramentum Calculator
                            </Typography>
                        </motion.div>
                        <Typography variant="body1" className="text-text-secondary max-w-2xl mx-auto">
                            Optimize your <span className="text-accent-tertiary font-bold">Legacy</span> stats. Calculate the exact transfer values from your provider to your carry hero.
                        </Typography>
                    </Box>



                    {/* Maintenance Mode Overlay Wrapper */}
                    <div className="relative">
                        {/* Overlay */}
                        <div className="absolute inset-0 z-50 bg-bg-900/60 backdrop-blur-[1px] flex items-center justify-center rounded-3xl border border-bg-700/50">
                            <div className="text-center p-8 bg-bg-900 shadow-2xl rounded-2xl border border-bg-700">
                                <span className="text-4xl mb-4 block">🚫</span>
                                <Typography variant="h5" className="text-white font-bold mb-2">System Offline</Typography>
                                <Typography className="text-text-secondary">Calculator temporarily disabled for adjustments.</Typography>
                            </div>
                        </div>

                        <div className="opacity-25 grayscale pointer-events-none select-none filter">
                            <Grid container spacing={4}>
                                {/* Selector Section */}
                                <Grid size={{ xs: 12, md: 7 }}>
                                    <Paper className="p-8 bg-bg-800/40 border border-bg-700/50 rounded-3xl backdrop-blur-md h-full shadow-xl">
                                        <Box className="mb-8 flex items-center gap-3">
                                            <div className="p-3 bg-accent-tertiary/10 rounded-xl">
                                                <span className="text-2xl">🛡️</span>
                                            </div>
                                            <div>
                                                <Typography variant="h6" fontWeight="bold" className="text-white">
                                                    Hero Configuration
                                                </Typography>
                                                <Typography variant="caption" className="text-text-secondary">
                                                    Select who gives and who receives stats
                                                </Typography>
                                            </div>
                                        </Box>

                                        <div className="space-y-8">
                                            <TextField
                                                select
                                                fullWidth
                                                label="Receiver Hero (Target)"
                                                value={targetHero}
                                                onChange={(e) => setTargetHero(e.target.value)}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        color: '#e2e8f0',
                                                        backgroundColor: 'rgba(15, 23, 42, 0.3)',
                                                        borderRadius: '12px',
                                                        '& fieldset': { borderColor: '#334155' },
                                                        '&:hover fieldset': { borderColor: '#64748b' },
                                                        '&.Mui-focused fieldset': { borderColor: '#60a5fa' },
                                                    },
                                                    '& .MuiInputLabel-root': { color: '#94a3b8' },
                                                    '& .MuiInputLabel-root.Mui-focused': { color: '#60a5fa' },
                                                }}
                                            >
                                                {heroes.map((hero) => (
                                                    <MenuItem key={hero.id} value={hero.id}>
                                                        <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
                                                            <span>{hero.name}</span>
                                                        </Box>
                                                    </MenuItem>
                                                ))}
                                            </TextField>

                                            <div className="relative p-6 bg-bg-900/50 rounded-2xl border border-dashed border-bg-700">
                                                <Typography variant="caption" className="absolute -top-3 left-4 px-2 bg-bg-800 text-accent-tertiary font-bold uppercase tracking-wider">
                                                    Provider Source
                                                </Typography>

                                                <TextField
                                                    select
                                                    fullWidth
                                                    label="Select Provider"
                                                    value={sourceHero}
                                                    onChange={(e) => setSourceHero(e.target.value)}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            color: '#e2e8f0',
                                                            '& fieldset': { borderColor: 'transparent' }, // hide border to blend in
                                                            '&:hover fieldset': { borderColor: 'transparent' },
                                                            '&.Mui-focused fieldset': { borderColor: 'transparent' },
                                                        },
                                                        '& .MuiInputLabel-root': { color: '#94a3b8' },
                                                        '& .MuiInputLabel-root.Mui-focused': { color: '#60a5fa' },
                                                    }}
                                                    variant="standard"
                                                >
                                                    {heroes.map((hero) => (
                                                        <MenuItem key={hero.id} value={hero.id}>
                                                            {hero.name}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>

                                                {selectedSource && (
                                                    <div className="mt-4 grid grid-cols-3 gap-2">
                                                        <div className="bg-bg-800 p-2 rounded-lg text-center">
                                                            <Typography variant="caption" className="block text-green-400 font-bold">ATK</Typography>
                                                            <Typography variant="body2" className="text-white font-mono">{selectedSource.baseAtk}</Typography>
                                                        </div>
                                                        <div className="bg-bg-800 p-2 rounded-lg text-center">
                                                            <Typography variant="caption" className="block text-blue-400 font-bold">SP</Typography>
                                                            <Typography variant="body2" className="text-white font-mono">{selectedSource.baseSp}</Typography>
                                                        </div>
                                                        <div className="bg-bg-800 p-2 rounded-lg text-center">
                                                            <Typography variant="caption" className="block text-red-400 font-bold">HP</Typography>
                                                            <Typography variant="body2" className="text-white font-mono">{selectedSource.baseHp}</Typography>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Paper>
                                </Grid>

                                {/* Legacy Settings Section */}
                                <Grid size={{ xs: 12, md: 5 }}>
                                    <Paper className="p-8 bg-bg-800/40 border border-bg-700/50 rounded-3xl backdrop-blur-md h-full shadow-xl flex flex-col">
                                        <Box className="mb-6 flex items-center gap-3">
                                            <div className="p-3 bg-purple-500/10 rounded-xl">
                                                <span className="text-2xl">✨</span>
                                            </div>
                                            <div>
                                                <Typography variant="h6" fontWeight="bold" className="text-white">
                                                    Sacramentum
                                                </Typography>
                                                <Typography variant="caption" className="text-text-secondary">
                                                    Legacy artifact settings
                                                </Typography>
                                            </div>
                                        </Box>

                                        <div className="space-y-8 flex-1">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={hasSacramentum}
                                                        onChange={(e) => setHasSacramentum(e.target.checked)}
                                                        sx={{
                                                            color: '#94a3b8',
                                                            '&.Mui-checked': { color: '#a855f7' },
                                                            '& .MuiSvgIcon-root': { fontSize: 28 }
                                                        }}
                                                    />
                                                }
                                                label={<Typography className="text-lg font-medium">Activate Legacy</Typography>}
                                            />

                                            <AnimatePresence>
                                                {hasSacramentum && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="space-y-6 overflow-hidden"
                                                    >
                                                        <Box>
                                                            <div className="flex justify-between mb-2">
                                                                <Typography variant="body2" className="text-text-secondary">Legacy Level</Typography>
                                                                <Typography variant="body2" className="text-purple-400 font-bold">Lvl {level}</Typography>
                                                            </div>
                                                            <Slider
                                                                value={level}
                                                                onChange={(_, val) => setLevel(val as number)}
                                                                min={1}
                                                                max={20}
                                                                step={1}
                                                                marks={[
                                                                    { value: 1, label: '1' },
                                                                    { value: 10, label: '10' },
                                                                    { value: 20, label: '20' },
                                                                ]}
                                                                sx={{
                                                                    color: '#a855f7',
                                                                    '& .MuiSlider-thumb': {
                                                                        boxShadow: '0 0 0 8px rgba(168, 85, 247, 0.16)',
                                                                    },
                                                                    '& .MuiSlider-rail': {
                                                                        opacity: 0.2,
                                                                    },
                                                                }}
                                                            />
                                                        </Box>

                                                        <TextField
                                                            fullWidth
                                                            type="number"
                                                            label="Guard Points (GP)"
                                                            value={guardPoint}
                                                            onChange={(e) => setGuardPoint(Math.max(0, parseInt(e.target.value) || 0))}
                                                            inputProps={{ min: 0 }}
                                                            sx={{
                                                                '& .MuiOutlinedInput-root': {
                                                                    color: '#e2e8f0',
                                                                    borderRadius: '12px',
                                                                    backgroundColor: 'rgba(15, 23, 42, 0.3)',
                                                                    '& fieldset': { borderColor: '#334155' },
                                                                    '&:hover fieldset': { borderColor: '#64748b' },
                                                                    '&.Mui-focused fieldset': { borderColor: '#a855f7' },
                                                                },
                                                                '& .MuiInputLabel-root': { color: '#94a3b8' },
                                                                '& .MuiInputLabel-root.Mui-focused': { color: '#a855f7' },
                                                            }}
                                                        />

                                                        <div className="bg-purple-500/10 p-4 rounded-xl border border-purple-500/20">
                                                            <div className="flex justify-between items-center">
                                                                <Typography variant="caption" className="text-purple-300">Total Transfer Rate</Typography>
                                                                <Typography variant="h6" className="text-purple-400 font-bold">{transferRate.toFixed(2)}%</Typography>
                                                            </div>
                                                            <LinearProgress
                                                                variant="determinate"
                                                                value={Math.min(100, transferRate * 2)} // Roughly scale for visual
                                                                sx={{ mt: 1, height: 6, borderRadius: 3, bgcolor: 'rgba(168, 85, 247, 0.1)', '& .MuiLinearProgress-bar': { bgcolor: '#a855f7' } }}
                                                            />
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </Paper>
                                </Grid>
                            </Grid>

                            {/* Result Section */}
                            <Paper className="p-8 md:p-12 bg-linear-to-br from-bg-900 to-bg-800 border border-bg-700 rounded-3xl shadow-2xl relative overflow-hidden group">
                                {/* Decorative background element */}
                                <div className="absolute top-0 right-0 w-full h-full bg-linear-to-bl from-accent-tertiary/5 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />

                                <div className="relative z-10 text-center mb-10">
                                    <Typography variant="h4" className="font-bold text-white mb-2">
                                        <span className="text-text-secondary font-light">Transfer to</span> {selectedTarget?.name || "..."}
                                    </Typography>
                                    <Box className="inline-block px-4 py-1 rounded-full bg-bg-900/80 border border-white/10 backdrop-blur-sm">
                                        <Typography variant="caption" className="text-text-secondary tracking-widest uppercase">
                                            Statistics Preview
                                        </Typography>
                                    </Box>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 w-full">
                                    {[
                                        { label: "ATK", value: extraAtk, color: "text-green-400", border: "border-green-500/20", bg: "bg-green-500/5" },
                                        { label: "SP", value: extraSp, color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/5" },
                                        { label: "HP", value: extraHp, color: "text-red-400", border: "border-red-500/20", bg: "bg-red-500/5" }
                                    ].map((stat) => (
                                        <motion.div
                                            key={stat.label}
                                            whileHover={{ y: -5, scale: 1.02 }}
                                            className={`relative p-6 rounded-2xl border ${stat.border} ${stat.bg} backdrop-blur-sm overflow-hidden`}
                                        >
                                            <div className={`absolute top-0 right-0 p-4 opacity-10 font-black text-6xl ${stat.color} select-none`}>
                                                {stat.label}
                                            </div>
                                            <div className="relative z-10">
                                                <Typography className={`${stat.color} font-bold tracking-widest text-sm mb-2`}>
                                                    BONUS {stat.label}
                                                </Typography>
                                                <Typography variant="h2" className="text-white font-mono font-bold">
                                                    +<NumberCounter value={stat.value} />
                                                </Typography>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="mt-8 text-center"
                                >
                                    <Typography variant="caption" className="text-text-secondary">
                                        * Values are rounded down. Actual in-game values may vary slightly due to floating point precision.
                                    </Typography>
                                </motion.div>
                            </Paper>
                        </div>
                    </div>

                    {/* WIP Section */}
                    <Paper className="p-8 bg-dashed bg-bg-900 border-2 border-dashed border-bg-700 rounded-3xl relative overflow-hidden opacity-75 hover:opacity-100 transition-opacity duration-300">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-yellow-500/10 rounded-2xl">
                                    <span className="text-3xl">🚧</span>
                                </div>
                                <div>
                                    <Typography variant="h6" className="text-white font-bold">
                                        Work in Progress
                                    </Typography>
                                    <Typography variant="body2" className="text-text-secondary max-w-md">
                                        This calculator is currently in beta and not ready to use. More advanced features are being developed to help you maximize your potential.
                                    </Typography>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                {["Equipment Stats", "Rune Bonuses", "Save Presets"].map((feature) => (
                                    <span key={feature} className="px-3 py-1 bg-bg-800 rounded-full text-xs text-text-secondary border border-bg-700">
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Paper>
                </motion.div>
            </main>
        </div >
    );
}
