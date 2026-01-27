import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { WeatherView } from "./pages/WeatherView";
import { MusicPlayerView } from "./pages/MusicPlayerView";
import { KingGodCastleHelperView } from "./pages/KingGodCastleHelperView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<WeatherView />} />
        <Route path="/music" element={<MusicPlayerView />} />
        <Route path="/kgc-helper" element={<KingGodCastleHelperView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
