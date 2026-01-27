import { Link } from "react-router-dom";
import { WeatherProject } from "../components/projects/WeatherProject";

export function WeatherView() {
    return (
        <div className="min-h-screen bg-bg-900 text-text-primary">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-900/80 backdrop-blur-md border-b border-bg-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <span className="text-2xl group-hover:-translate-x-1 transition-transform">
                            ←
                        </span>
                        <span className="font-display font-bold">Back to Portfolio</span>
                    </Link>
                    <div className="text-accent-primary font-bold">Lemon Forecast</div>
                </div>
            </nav>

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <WeatherProject />
            </main>
        </div>
    );
}
