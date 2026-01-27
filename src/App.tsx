import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { WeatherView } from "./pages/WeatherView";
import { MusicPlayerView } from "./pages/MusicPlayerView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<WeatherView />} />
        <Route path="/music" element={<MusicPlayerView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
