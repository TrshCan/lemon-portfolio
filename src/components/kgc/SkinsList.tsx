import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

interface SkinRow {
    season: number | null;
    date: string;
    newHero: string;
    passSkin: string;
    passReturn: string | string[];
    godSkin: string;
    godReturn: string;
    league: string;
    leagueSkin: string | string[];
    legacyRateUp: string | string[];
    event: string;
}

interface ColumnDef {
    key: keyof SkinRow;
    label: string;
    defaultVisible: boolean;
    colorClass?: string;
}

const COLUMNS: ColumnDef[] = [
    { key: "season", label: "Season", defaultVisible: true, colorClass: "text-text-secondary font-mono" },
    { key: "date", label: "Date", defaultVisible: true, colorClass: "text-text-secondary font-mono" },
    { key: "passSkin", label: "Pass Skin", defaultVisible: true, colorClass: "text-green-400 font-bold" },
    { key: "passReturn", label: "Pass Return", defaultVisible: true, colorClass: "text-green-400/70" },
    { key: "godSkin", label: "God Skin", defaultVisible: true, colorClass: "text-yellow-400 font-medium" },
    { key: "godReturn", label: "God Return", defaultVisible: false, colorClass: "text-yellow-400/70" },
    { key: "league", label: "League", defaultVisible: false, colorClass: "text-blue-300" },
    { key: "leagueSkin", label: "League Skin", defaultVisible: true, colorClass: "text-blue-400" },
    { key: "legacyRateUp", label: "Legacy Rate Up", defaultVisible: false, colorClass: "text-purple-400" },
    { key: "newHero", label: "New Hero", defaultVisible: false, colorClass: "text-text-primary" },
    { key: "event", label: "Event", defaultVisible: true, colorClass: "text-accent-primary" },
];

export function SkinsList() {
    const [rows, setRows] = useState<SkinRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Initialize state with default visibility
    const [visibleColumns, setVisibleColumns] = useState<Set<string>>(() =>
        new Set(COLUMNS.filter(c => c.defaultVisible).map(c => c.key))
    );
    const [showColumnSelector, setShowColumnSelector] = useState(false);

    useEffect(() => {
        const fetchSkins = async () => {
            try {
                // Add timestamp to prevent caching
                const response = await fetch(`/json/skins/skins-v3.json?t=${new Date().getTime()}`);
                if (!response.ok) throw new Error("Failed to fetch skin data file");

                const jsonData = await response.json();
                const parsedRows: SkinRow[] = jsonData.map((item: any) => ({
                    season: item["Season"] || null,
                    date: item["Date"] || "",
                    passSkin: item["Pass Skin"] || "",
                    newHero: item["New Hero"] || "",
                    godSkin: item["God Skin"] || "",
                    passReturn: item["Pass Skin Return"] || "",
                    godReturn: item["God Return"] || "",
                    league: item["League"] || "",
                    leagueSkin: item["League Skin"] || "",
                    legacyRateUp: item["Legacy Rate Up"] || "",
                    event: item["Festival/Event"] || ""
                }));

                // Reverse to show newest/future first if the json is ordered chronologically from old to new
                setRows(parsedRows.reverse());
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to load skins data.");
                setLoading(false);
            }
        };

        fetchSkins();
    }, []);

    const toggleColumn = (key: string) => {
        const newSet = new Set(visibleColumns);
        if (newSet.has(key)) {
            newSet.delete(key);
        } else {
            newSet.add(key);
        }
        setVisibleColumns(newSet);
    };

    const renderCellContent = (content: string | string[] | number | null) => {
        if (Array.isArray(content)) {
            if (content.length === 0) return "-";
            return (
                <div className="flex flex-col gap-1">
                    {content.map((item, i) => (
                        <span key={i} className="block">{item}</span>
                    ))}
                </div>
            );
        }
        return content || "-";
    };

    // Pre-calculate merged cells for League Skin
    const mergedData = useMemo(() => {
        // We only need to calculate spans if leagueSkin is actually visible
        // But for simplicity, we calculate spans for the data array anyway
        // Mapping rows to include span info
        type MergedRow = SkinRow & { leagueSkinSpan: number; leagueSkinDisplay: string | string[] };
        const processed: MergedRow[] = [];

        let i = 0;
        while (i < rows.length) {
            const currentRow = rows[i];
            const currentLeague = currentRow.league;

            if (!currentLeague) {
                processed.push({ ...currentRow, leagueSkinSpan: 1, leagueSkinDisplay: currentRow.leagueSkin });
                i++;
                continue;
            }

            let count = 1;
            // Collect all skins in this league group
            let collectedSkins: string[] = [];
            // Start with League Title
            if (currentLeague) collectedSkins.push(currentLeague);

            // Helper to add skins
            const addSkins = (skinData: string | string[]) => {
                if (Array.isArray(skinData)) {
                    skinData.forEach(s => {
                        if (s && s !== currentLeague && !collectedSkins.includes(s)) collectedSkins.push(s);
                    });
                } else if (skinData && skinData !== currentLeague && !collectedSkins.includes(skinData)) {
                    collectedSkins.push(skinData);
                }
            };

            addSkins(currentRow.leagueSkin);

            let j = i + 1;
            while (j < rows.length && rows[j].league === currentLeague) {
                addSkins(rows[j].leagueSkin);
                count++;
                j++;
            }

            // Deduplicate just in case
            const uniqueSkins = Array.from(new Set(collectedSkins));
            const displayContent = uniqueSkins.length === 1 ? uniqueSkins[0] : uniqueSkins;

            processed.push({ ...currentRow, leagueSkinSpan: count, leagueSkinDisplay: displayContent });
            for (let k = 1; k < count; k++) {
                processed.push({ ...rows[i + k], leagueSkinSpan: 0, leagueSkinDisplay: "" });
            }
            i += count;
        }
        return processed;
    }, [rows]);

    if (loading) return <div className="text-center p-10">Loading schedule...</div>;
    if (error) return <div className="text-center p-10 text-red-400">{error}</div>;

    return (
        <div className="space-y-4">
            {/* Column Selector */}
            <div className="relative inline-block text-left mb-4">
                <button
                    onClick={() => setShowColumnSelector(!showColumnSelector)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-bg-800 border border-bg-700 rounded-lg text-sm font-medium hover:bg-bg-700 transition-colors"
                >
                    <span>Customize Columns</span>
                    <span className="text-xs">▼</span>
                </button>

                {showColumnSelector && (
                    <div className="absolute left-0 mt-2 w-56 bg-bg-800 border border-bg-700 rounded-xl shadow-xl z-50 p-2">
                        <div className="space-y-1">
                            {COLUMNS.map((col) => (
                                <label key={col.key} className="flex items-center gap-2 px-2 py-1.5 hover:bg-bg-700 rounded cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={visibleColumns.has(col.key)}
                                        onChange={() => toggleColumn(col.key)}
                                        className="rounded border-bg-600 bg-bg-900 text-accent-primary focus:ring-accent-primary"
                                    />
                                    <span className="text-sm">{col.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="overflow-x-auto rounded-xl border border-bg-700 bg-bg-800/50 shadow-xl max-h-[80vh]">
                <table className="w-full text-left text-sm border-collapse min-w-[1500px]">
                    <thead className="bg-bg-900 text-text-secondary uppercase text-xs font-bold sticky top-0 outline outline-1 outline-bg-700 z-40">
                        <tr>
                            {COLUMNS.map(col => visibleColumns.has(col.key) && (
                                <th
                                    key={col.key}
                                    className={`px-4 py-4 bg-bg-900 ${col.key === 'date' ? 'sticky left-20 z-50 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.5)] whitespace-nowrap' : col.key === 'season' ? 'sticky left-0 z-50 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.5)] whitespace-nowrap' : ''} ${col.colorClass || ''}`}
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-bg-700/50">
                        {mergedData.map((row, index) => (
                            <motion.tr
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.005 }}
                                className="hover:bg-bg-700/30 transition-colors"
                            >
                                {COLUMNS.map(col => {
                                    if (!visibleColumns.has(col.key)) return null;

                                    // Special rendering for Season (sticky)
                                    if (col.key === 'season') {
                                        return (
                                            <td key={col.key} className="px-4 py-3 font-mono text-text-secondary whitespace-nowrap sticky left-0 z-20 bg-bg-800 border-r border-bg-700/50">
                                                {row.season}
                                            </td>
                                        );
                                    }

                                    // Special rendering for Date (sticky)
                                    if (col.key === 'date') {
                                        return (
                                            <td key={col.key} className={`px-4 py-3 font-mono text-text-secondary whitespace-nowrap sticky left-20 z-20 bg-bg-800/80 backdrop-blur-sm border-r border-bg-700/50 ${!visibleColumns.has('season') ? '!left-0' : ''}`}>
                                                {row.date}
                                            </td>
                                        );
                                    }

                                    // Special rendering for League Skin (Merged Cells)
                                    if (col.key === 'leagueSkin') {
                                        if (row.leagueSkinSpan === 0) return null; // Skip merged cells
                                        return (
                                            <td
                                                key={col.key}
                                                className={`px-4 py-3 align-middle font-medium text-blue-100/80 ${row.league ? 'border border-blue-500/30 bg-blue-500/5' : ''}`}
                                                rowSpan={row.leagueSkinSpan}
                                            >
                                                {renderCellContent(row.leagueSkinDisplay)}
                                            </td>
                                        );
                                    }

                                    // Default rendering
                                    return (
                                        <td key={col.key} className={`px-4 py-3 ${col.colorClass || 'text-text-secondary'}`}>
                                            {renderCellContent(row[col.key] as string | string[] | number | null)}
                                        </td>
                                    );
                                })}
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
