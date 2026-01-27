import { ThemedBackground } from "./components/ThemedBackground";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";

function App() {
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

export default App;
