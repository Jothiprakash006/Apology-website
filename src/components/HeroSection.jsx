import { ArrowDownRight, ArrowUpRight, Heart } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero-section" id="top" aria-labelledby="hero-heading">
      <div className="hero-image" aria-hidden="true" />
      <div className="hero-content page-container">
        <div className="hero-intro-mark">
          <Heart className="hero-glowing-heart" size={50} strokeWidth={1.1} fill="currentColor" aria-hidden="true" />
          <span>An honest beginning</span>
        </div>
        <h1 id="hero-heading" tabIndex={-1}>Hey,<br /><em>Thakkali...</em></h1>
        <p>
          I know I made mistakes, and I am truly sorry. I cannot change what happened,
          but I want to take responsibility and show that I can do better.
        </p>
        <div className="hero-actions">
          <a className="button-primary" href="#letter">
            Read My Letter <ArrowUpRight size={19} strokeWidth={1.7} aria-hidden="true" />
          </a>
          <a className="button-text" href="#photo">
            See Your Photo <ArrowDownRight size={19} strokeWidth={1.7} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}