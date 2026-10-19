import { Heart } from "lucide-react";
import { DEFAULT_PHOTO_URL } from "../content";
import useInView from "../hooks/useInView";

export default function PhotoSection() {
  const [frameRef, isVisible] = useInView(0.15);
  const photoUrl = DEFAULT_PHOTO_URL || "/images/Kaviya.jpg";

  return (
    <section className="photo-section" id="photo" aria-labelledby="photo-heading">
      <div className="page-container photo-layout">
        <div className="photo-copy">
          <p className="section-kicker"><span /> A space for you</p>
          <h2 id="photo-heading" className="section-heading">A Face That<br />Means <em>So Much</em><br />to Me</h2>
          <p className="section-description">
            Every time I look at this picture, I am reminded of how much you mean to me and why making things right matters more than anything.
          </p>
        </div>

        <div ref={frameRef} className={`photo-frame reveal-block ${isVisible ? "is-visible" : ""} has-photo`}>
          {photoUrl ? (
            <img src={photoUrl} alt="Photo of Kaviya" className="personal-photo" />
          ) : (
            <div className="photo-placeholder">
              <div className="placeholder-heart" aria-hidden="true"><Heart size={73} strokeWidth={0.7} /></div>
              <p>Your photo belongs here.</p>
              <span>A frame waiting for the real you.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}