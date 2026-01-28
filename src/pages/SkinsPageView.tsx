import { Link } from "react-router-dom";
import { SkinsList } from "../components/kgc/SkinsList";

import { KGCHeader } from "../components/kgc/KGCHeader";

export function SkinsPageView() {
    return (
        <div className="min-h-screen bg-bg-900 text-text-primary">
            <KGCHeader />

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1920px] mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">Skins Database</h2>
                    <Link
                        to="/kgc-helper"
                        className="text-sm text-text-secondary hover:text-text-primary underline"
                    >
                        Back to Helper
                    </Link>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-200 p-4 rounded-xl mb-6 flex items-start gap-3">
                    <span className="text-xl">⚠️</span>
                    <div>
                        <p className="font-bold text-yellow-100">Work In Progress</p>
                        <p className="text-sm opacity-90 mt-1">
                            The data presented in the table below is currently being updated. Some fields may be incomplete or out of date.
                            Only fields currently visible in the table are verified to be up-to-date.
                        </p>
                    </div>
                </div>
                <SkinsList />
            </main>
        </div>
    );
}
