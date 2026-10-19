import { Ear, HeartHandshake, MessageCircle, RotateCcw } from "lucide-react";
import useInView from "../hooks/useInView";

const promises = [
  { title: "Listen Better", text: "I want to understand your feelings instead of making assumptions.", Icon: Ear },
  { title: "Communicate Honestly", text: "I want to speak calmly, openly, and honestly.", Icon: MessageCircle },
  { title: "Learn From My Mistakes", text: "I want to improve my behavior, not just repeat the same apologies.", Icon: RotateCcw },
  { title: "Respect Your Feelings", text: "I will respect your boundaries, your time, and your decision.", Icon: HeartHandshake },
];

export default function PromiseSection() {
  const [sectionRef, isVisible] = useInView(0.08);

  return (
    <section className="promise-section" id="promises" aria-labelledby="promise-heading" ref={sectionRef}>
      <div className="page-container">
        <div className={`promise-intro reveal-block ${isVisible ? "is-visible" : ""}`}>
          <p className="section-kicker"><span /> More than words</p>
          <h2 id="promise-heading" className="section-heading">What I Want <em>to Change</em></h2>
          <p className="section-description">These are things I want to show through my actions, not just say.</p>
        </div>
        <div className={`promise-grid ${isVisible ? "is-visible" : ""}`}>
          {promises.map(({ title, text, Icon }, index) => (
            <article className="promise-card" key={title}>
              <div className="promise-card-top">
                <Icon size={29} strokeWidth={1.3} aria-hidden="true" />
                <span>0{index + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}