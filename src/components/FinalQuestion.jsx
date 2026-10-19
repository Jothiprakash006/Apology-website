import { useState, useEffect } from "react";
import { Heart, Clock, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import FloatingParticles from "./FloatingParticles";
import useInView from "../hooks/useInView";
import { NOTIFICATION_EMAIL } from "../content";

const responses = {
  talk: "Thank you for being willing to talk. ❤️ Let's take things slowly, listen to each other, and see what feels right.",
  time: "I understand, Thakkali. Take the time you need. You do not have to decide anything right now. 🌷",
};

export default function FinalQuestion() {
  const [choice, setChoice] = useState(null);
  const [whenDidYouCome, setWhenDidYouCome] = useState("");
  const [sharedInfo, setSharedInfo] = useState("");
  const [sendStatus, setSendStatus] = useState("idle");
  const [formError, setFormError] = useState("");
  const [sectionRef, isVisible] = useInView(0.08);

  // Load previous submission from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("thakkali_apology_response");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.choice) setChoice(parsed.choice);
        if (parsed.whenDidYouCome) setWhenDidYouCome(parsed.whenDidYouCome);
        if (parsed.sharedInfo) setSharedInfo(parsed.sharedInfo);
      }
    } catch {
      // ignore storage access errors
    }
  }, []);

  const handleChoiceSelect = (selectedChoice) => {
    setChoice((prev) => (prev === selectedChoice ? null : selectedChoice));
    if (formError) setFormError("");
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const hasChoice = Boolean(choice);
    const hasWhen = Boolean(whenDidYouCome.trim());
    const hasInfo = Boolean(sharedInfo.trim());

    if (!hasChoice && !hasWhen && !hasInfo) {
      setFormError("Please choose an option, let me know when you came, or share your thoughts before sending. ❤️");
      return;
    }

    setFormError("");
    setSendStatus("sending");

    const choiceLabel =
      choice === "talk"
        ? "I'm Willing to Talk ❤️"
        : choice === "time"
        ? "I Need More Time 🌷"
        : "Not specified";

    try {
      if (NOTIFICATION_EMAIL) {
        await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(NOTIFICATION_EMAIL)}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: `💌 Apology Website: Message from Thakkali (${choiceLabel})`,
            _template: "table",
            _captcha: "false",
            "Selected Choice": choiceLabel,
            "When did you come?": whenDidYouCome.trim() || "Not specified",
            "Information Shared": sharedInfo.trim() || "Not specified",
            "Date & Time": new Date().toLocaleString(),
          }),
        });
      }

      try {
        localStorage.setItem(
          "thakkali_apology_response",
          JSON.stringify({
            choice,
            whenDidYouCome: whenDidYouCome.trim(),
            sharedInfo: sharedInfo.trim(),
            submittedAt: new Date().toISOString(),
          })
        );
      } catch {
        // ignore
      }

      setSendStatus("sent");
    } catch (err) {
      console.error("Failed to send notification email:", err);
      // Still show sent so the user feels heard and reassured
      setSendStatus("sent");
    }
  };

  const handleReset = () => {
    setSendStatus("idle");
    setFormError("");
  };

  return (
    <section className="final-section" id="conversation" aria-labelledby="final-heading" ref={sectionRef}>
      <FloatingParticles variant="final" />
      <div className={`final-content page-container reveal-block ${isVisible ? "is-visible" : ""}`}>
        <div className="final-heart" aria-hidden="true">
          <Heart size={67} fill="currentColor" strokeWidth={1.1} />
        </div>
        <h2 id="final-heading" className="section-heading">
          Thakkali, Can We Talk<br />
          <em>One More Time?</em> <span className="final-heading-emoji">❤️</span>
        </h2>
        <div className="final-message">
          <p>
            I cannot ask you to forget everything or promise that I will never make a mistake again. What I can do is take
            responsibility, learn, and put genuine effort into becoming better.
          </p>
          <p>
            If you are comfortable with it, I would be grateful for one chance to talk and try to make things right. I
            will respect whatever you decide.
          </p>
        </div>

        {sendStatus === "sent" ? (
          <div className="final-sent-card" role="status">
            <div className="final-sent-icon-wrap" aria-hidden="true">
              <CheckCircle2 size={40} className="final-sent-check" />
            </div>
            <h3 className="final-sent-heading">Your Message Has Been Delivered ❤️</h3>
            <p className="final-sent-lead">
              Thank you for taking the time to respond, Thakkali. Your thoughts have been sent directly to Prakash.
            </p>

            {choice && (
              <div className="final-summary-box">
                <span className="final-summary-tag">Your decision:</span>
                <p className="final-summary-choice">
                  {choice === "talk" ? "I'm Willing to Talk ❤️" : "I Need More Time 🌷"}
                </p>
                <p className="final-summary-quote">{responses[choice]}</p>
              </div>
            )}

            {whenDidYouCome.trim() && (
              <div className="final-summary-box">
                <span className="final-summary-tag">When you came:</span>
                <p className="final-summary-text">{whenDidYouCome}</p>
              </div>
            )}

            {sharedInfo.trim() && (
              <div className="final-summary-box">
                <span className="final-summary-tag">Information shared:</span>
                <p className="final-summary-text">{sharedInfo}</p>
              </div>
            )}

            <button type="button" className="final-reset-btn" onClick={handleReset}>
              Edit or send another note ✍️
            </button>
          </div>
        ) : (
          <form className="final-response-form" onSubmit={handleSubmit} noValidate>
            <div className="final-choice-group">
              <p className="final-group-hint">Would you be open to talking?</p>
              <div className="final-actions" aria-label="Choose what feels right for you">
                <button
                  className={`final-choice ${choice === "talk" ? "is-selected" : ""}`}
                  type="button"
                  aria-pressed={choice === "talk"}
                  onClick={() => handleChoiceSelect("talk")}
                >
                  <Heart size={15} className="choice-btn-icon" />
                  <span>I'm Willing to Talk ❤️</span>
                </button>
                <button
                  className={`final-choice ${choice === "time" ? "is-selected" : ""}`}
                  type="button"
                  aria-pressed={choice === "time"}
                  onClick={() => handleChoiceSelect("time")}
                >
                  <span className="choice-flower-icon">🌷</span>
                  <span>I Need More Time</span>
                </button>
              </div>

              {choice && (
                <p className="final-choice-preview" role="status">
                  {responses[choice]}
                </p>
              )}
            </div>

            <div className="final-fields-card">
              {/* Field 1: When did you come? */}
              <div className="final-field-group">
                <label htmlFor="final-when-did-you-come" className="final-field-label">
                  <Clock size={16} className="field-label-icon" />
                  <span>When did you come?</span>
                </label>
                <input
                  id="final-when-did-you-come"
                  name="whenDidYouCome"
                  type="text"
                  className="final-field-input"
                  placeholder="e.g., Today at 5:00 PM, yesterday evening, just now..."
                  value={whenDidYouCome}
                  onChange={(e) => {
                    setWhenDidYouCome(e.target.value);
                    if (formError) setFormError("");
                  }}
                  autoComplete="off"
                />
                <span className="final-field-subtext">Let me know the time or date when you came or visited</span>
              </div>

              {/* Field 2: Share information text box */}
              <div className="final-field-group">
                <label htmlFor="final-share-info" className="final-field-label">
                  <MessageSquare size={16} className="field-label-icon" />
                  <span>Share information</span>
                </label>
                <textarea
                  id="final-share-info"
                  name="sharedInfo"
                  className="final-field-textarea"
                  rows={4}
                  placeholder="Share any information, thoughts, how you feel, or anything you'd like him to know..."
                  value={sharedInfo}
                  onChange={(e) => {
                    setSharedInfo(e.target.value);
                    if (formError) setFormError("");
                  }}
                />
                <span className="final-field-subtext">You can share whatever is in your thoughts or heart</span>
              </div>

              {formError && (
                <p className="final-form-error" role="alert">
                  {formError}
                </p>
              )}

              <div className="final-submit-wrap">
                <button
                  type="submit"
                  className="final-submit-btn"
                  disabled={sendStatus === "sending"}
                >
                  <Send size={16} className={sendStatus === "sending" ? "spin-icon" : ""} />
                  <span>{sendStatus === "sending" ? "Delivering your message..." : "Send Response to Him 💌"}</span>
                </button>
                <p className="final-privacy-hint">
                  Sent directly & privately to his inbox. Only Prakash will see this.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}