import { useEffect, useState } from "react";
import { ArrowRight, Mail, X } from "lucide-react";
import { LETTER_PARAGRAPHS } from "../content";
import useInView from "../hooks/useInView";
import useReducedMotion from "../hooks/useReducedMotion";

export default function ApologyLetter({ pageVisible }) {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [showImmediately, setShowImmediately] = useState(false);
  const [headingRef, headingVisible] = useInView();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen || !pageVisible || visibleCount >= LETTER_PARAGRAPHS.length) return;
    const timer = window.setTimeout(() => setVisibleCount((count) => count + 1), visibleCount === 0 ? 180 : 470);
    return () => window.clearTimeout(timer);
  }, [isOpen, pageVisible, visibleCount]);

  useEffect(() => {
    if (reducedMotion && isOpen) {
      setShowImmediately(true);
      setVisibleCount(LETTER_PARAGRAPHS.length);
    }
  }, [reducedMotion, isOpen]);

  const openLetter = () => {
    setIsOpen(true);
    setShowImmediately(reducedMotion);
    setVisibleCount(reducedMotion ? LETTER_PARAGRAPHS.length : 0);
  };

  const showFullLetter = () => {
    setIsOpen(true);
    setShowImmediately(true);
    setVisibleCount(LETTER_PARAGRAPHS.length);
  };

  const closeLetter = () => {
    setIsOpen(false);
    setShowImmediately(false);
    setVisibleCount(0);
  };

  return (
    <section className="letter-section" id="letter" aria-labelledby="letter-heading">
      <div className="page-container">
        <div ref={headingRef} className={`letter-heading-block reveal-block ${headingVisible ? "is-visible" : ""}`}>
          <p className="section-kicker section-kicker--center"><span /> The words I owe you <span /></p>
          <h2 id="letter-heading" className="section-heading">A Letter From <em>My Heart</em></h2>
          <p className="section-description">No excuses. Just the things I should have said sincerely.</p>
        </div>

        <div className={`letter-card ${isOpen ? "letter-card--open" : ""}`}>
          {!isOpen && (
            <div className="letter-seal">
              <span className="envelope-glow" aria-hidden="true"><Mail size={43} strokeWidth={1.05} /></span>
              <p>Whenever you feel ready to read it.</p>
            </div>
          )}
          <div className="letter-actions">
            {isOpen ? (
              <button className="button-outline letter-close" type="button" onClick={closeLetter}>
                <X size={16} aria-hidden="true" /> Close the Letter
              </button>
            ) : (
              <button className="button-primary" type="button" onClick={openLetter}>Open the Letter 💌</button>
            )}
            {visibleCount < LETTER_PARAGRAPHS.length && (
              <button className="button-text" type="button" onClick={showFullLetter}>
                Read Full Letter <ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" />
              </button>
            )}
          </div>

          {isOpen && (
            <div className={`letter-paper ${showImmediately ? "" : "is-revealing"}`} aria-label="Apology letter">
              {LETTER_PARAGRAPHS.slice(0, visibleCount).map((paragraph, index) => (
                <p
                  key={index}
                  className={`letter-paragraph ${index === 0 ? "letter-salutation" : ""} ${index === LETTER_PARAGRAPHS.length - 1 ? "letter-signature" : ""}`}
                >
                  {paragraph.split("\n").map((line, lineIndex) => (
                    <span key={lineIndex}>{lineIndex > 0 && <br />}{line}</span>
                  ))}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}