import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import OpeningScreen from "./components/OpeningScreen";
import HeroSection from "./components/HeroSection";
import PhotoSection from "./components/PhotoSection";
import ApologyLetter from "./components/ApologyLetter";
import PromiseSection from "./components/PromiseSection";
import FinalQuestion from "./components/FinalQuestion";
import Footer from "./components/Footer";

type OpeningPhase = "opening" | "leaving" | "entered";

export default function App() {
  const [openingPhase, setOpeningPhase] = useState<OpeningPhase>("opening");
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  const hasEntered = openingPhase === "entered";

  useEffect(() => {
    const onVisibilityChange = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("page-hidden", !pageVisible);
    return () => document.body.classList.remove("page-hidden");
  }, [pageVisible]);

  useEffect(() => {
    document.body.style.overflow = hasEntered ? "" : "hidden";
    if (hasEntered) {
      document.getElementById("hero-heading")?.focus({ preventScroll: true });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [hasEntered]);

  return (
    <>
      <div className="site-shell" inert={!hasEntered} aria-hidden={!hasEntered}>
        <header className="site-header">
          <a className="site-logo" href="#top" aria-label="For Thakkali, back to the beginning">
            <Heart size={17} strokeWidth={1.8} fill="currentColor" aria-hidden="true" />
            <span>FOR THAKKALI</span>
          </a>
          <nav className="site-nav" aria-label="Page sections">
            <a href="#letter">The letter</a>
            <a href="#photo">Your photo</a>
            <a href="#promises">What I'll change</a>
            <a className="nav-conversation" href="#conversation">One more conversation <span aria-hidden="true">↗</span></a>
          </nav>
        </header>

        <main id="main-content">
          <HeroSection />
          <PhotoSection />
          <ApologyLetter pageVisible={pageVisible} />
          <PromiseSection />
          <FinalQuestion />
        </main>
        <Footer />
      </div>

      {!hasEntered && (
        <OpeningScreen
          isLeaving={openingPhase === "leaving"}
          onOpen={() => setOpeningPhase("leaving")}
          onComplete={() => setOpeningPhase("entered")}
        />
      )}
    </>
  );
}
