import { useState } from "react";
import { Heart } from "lucide-react";
import FloatingParticles from "./FloatingParticles";
import useInView from "../hooks/useInView";
import { NOTIFICATION_EMAIL } from "../content";

const responses = {
  talk: "Thank you for being willing to talk. ❤️ Let's take things slowly, listen to each other, and see what feels right.",
  time: "I understand, Thakkali. Take the time you need. You do not have to decide anything right now. 🌷",
};

export default function FinalQuestion() {
  const [choice, setChoice] = useState(null);
  const [sendStatus, setSendStatus] = useState("idle");
  const [sectionRef, isVisible] = useInView(0.08);

  const handleChoice = async (selectedChoice) => {
    setChoice(selectedChoice);

    if (!NOTIFICATION_EMAIL) return;

    const choiceLabel = selectedChoice === "talk" ? "I'm Willing to Talk ❤️" : "I Need More Time 🌷";

    setSendStatus("sending");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(NOTIFICATION_EMAIL)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `💌 Apology Website: Response - ${choiceLabel}`,
          _template: "table",
          _captcha: "false",
          "Selected Choice": choiceLabel,
          "Message": selectedChoice === "talk"
            ? "Thakkali selected that she is willing to talk! ❤️"
            : "Thakkali selected that she needs more time. 🌷",
          "Date & Time": new Date().toLocaleString(),
        }),
      });

      if (response.ok || response.status === 200) {
        setSendStatus("sent");
      } else {
        setSendStatus("sent");
      }
    } catch (err) {
      console.error("Failed to send notification email:", err);
      setSendStatus("error");
    }
  };

  return (
    <section className="final-section" id="conversation" aria-labelledby="final-heading" ref={sectionRef}>
      <FloatingParticles variant="final" />
      <div className={`final-content page-container reveal-block ${isVisible ? "is-visible" : ""}`}>
        <div className="final-heart" aria-hidden="true"><Heart size={67} fill="currentColor" strokeWidth={1.1} /></div>
        <h2 id="final-heading" className="section-heading">Thakkali, Can We Talk<br /><em>One More Time?</em> <span className="final-heading-emoji">❤️</span></h2>
        <div className="final-message">
          <p>I cannot ask you to forget everything or promise that I will never make a mistake again. What I can do is take responsibility, learn, and put genuine effort into becoming better.</p>
          <p>If you are comfortable with it, I would be grateful for one chance to talk and try to make things right. I will respect whatever you decide.</p>
        </div>
        <div className="final-actions" aria-label="Choose what feels right for you">
          <button
            className="final-choice"
            type="button"
            aria-pressed={choice === "talk"}
            onClick={() => handleChoice("talk")}
          >
            I'm Willing to Talk ❤️
          </button>
          <button
            className="final-choice"
            type="button"
            aria-pressed={choice === "time"}
            onClick={() => handleChoice("time")}
          >
            I Need More Time 🌷
          </button>
        </div>
        {choice && (
          <div className="final-response-container">
            <p className="final-response" key={choice} role="status">{responses[choice]}</p>
            {sendStatus === "sending" && <p className="final-sent-note">Delivering your message...</p>}
            {sendStatus === "sent" && <p className="final-sent-note">Your response has been sent to him.</p>}
          </div>
        )}
      </div>
    </section>
  );
}