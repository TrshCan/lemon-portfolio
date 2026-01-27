import { ThemedBackground } from "../components/layout/ThemedBackground";
import { Navbar } from "../components/layout/Navbar";
import { Hero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { Skills } from "../components/sections/Skills";
import { Projects } from "../components/sections/Projects";
import { Contact } from "../components/sections/Contact";
import { Footer } from "../components/layout/Footer";
import { Analytics } from "@vercel/analytics/react";

export function Home() {
    return (
        <div className="min-h-screen bg-bg-900 text-text-primary relative transition-colors duration-300">
            {/* Background elements */}
            <ThemedBackground />

            {/* Navigation */}
            <Navbar />

            {/* Main content */}
            <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Contact />
            </main>

            {/* Footer */}
            <Footer />
            <Analytics />
        </div>
    );
}
