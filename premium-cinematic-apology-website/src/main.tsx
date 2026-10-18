import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/base.css";
import "./styles/effects.css";
import "./styles/opening.css";
import "./styles/sections.css";
import "./styles/letter.css";
import "./styles/music-player.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
