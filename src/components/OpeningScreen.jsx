import { ArrowUpRight, Heart } from "lucide-react";
import FloatingParticles from "./FloatingParticles";

export default function OpeningScreen({ isLeaving, onOpen, onComplete }) {
  const handleAnimationEnd = (event) => {
    if (isLeaving && event.target === event.currentTarget) onComplete();
  };

  return (
    <section
      className={`opening-screen ${isLeaving ? "is-leaving" : ""}`}
      aria-label="A letter for Thakkali"
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="opening-image" aria-hidden="true" />
      <FloatingParticles variant="opening" active={isLeaving} />
      <div className="opening-content page-container">
        <div className="opening-heart" aria-hidden="true">
          <Heart size={35} fill="currentColor" strokeWidth={1.2} />
        </div>
        <h1>For <em>Thakkali</em><span className="heading-emoji"> ❤️</span></h1>
        <p className="opening-quote">Some words come late...<br />but they still come from the heart.</p>
        <p className="opening-subtext">I have something I want to tell you.</p>
        <button className="button-primary opening-button" type="button" onClick={onOpen} disabled={isLeaving}>
          <span>Open My Heart</span>
          <ArrowUpRight size={19} strokeWidth={1.7} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}