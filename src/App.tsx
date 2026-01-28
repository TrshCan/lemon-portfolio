import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { WeatherView } from "./pages/WeatherView";
import { MusicPlayerView } from "./pages/MusicPlayerView";
import { KingGodCastleHelperView } from "./pages/KingGodCastleHelperView";
import { SkinsPageView } from "./pages/SkinsPageView";
import { SacramentumCalculatorView } from "./pages/SacramentumCalculatorView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<WeatherView />} />
        <Route path="/music" element={<MusicPlayerView />} />
        <Route path="/kgc-helper" element={<KingGodCastleHelperView />} />
        <Route path="/kgc-helper/skins" element={<SkinsPageView />} />
        <Route path="/kgc-helper/calculator/sacramentum" element={<SacramentumCalculatorView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
