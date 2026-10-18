import { Heart } from "lucide-react";
import useInView from "../hooks/useInView";

export default function Footer() {
  const [footerRef, isVisible] = useInView();

  return (
    <footer className="site-footer" ref={footerRef}>
      <div className={`footer-content reveal-block ${isVisible ? "is-visible" : ""}`}>
        <Heart size={21} fill="currentColor" strokeWidth={1.2} aria-hidden="true" />
        <p>Made with sincerity, for Thakkali. ❤️</p>
        <span>Some things cannot be changed overnight. But a sincere apology can be the beginning of change.</span>
      </div>
    </footer>
  );
}