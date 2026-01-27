import { useNavigate } from "react-router-dom";
import { MusicPlayerProject } from "../components/projects/MusicPlayerProject";

export function MusicPlayerView() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-bg-900 text-text-primary p-6 md:p-12">
            <div className="max-w-6xl mx-auto space-y-8">
                <button
                    onClick={() => navigate('/')}
                    className="group flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors mb-4"
                >
                    <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="font-bold uppercase tracking-widest text-xs">Back to Home</span>
                </button>

                <MusicPlayerProject />
            </div>
        </div>
    );
}
