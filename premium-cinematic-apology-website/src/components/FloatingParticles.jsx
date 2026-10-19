const particles = [
  [8, 2, 17, 2.5], [17, 8, 21, 1.5], [27, 4, 15, 2], [39, 11, 19, 2],
  [52, 1, 18, 1.5], [63, 7, 23, 2], [74, 3, 16, 2.5], [86, 12, 20, 1.5],
  [94, 5, 17, 2], [13, 13, 22, 1.5], [44, 6, 24, 1.5], [69, 15, 19, 1.5],
];

const petals = [
  [9, 0, 16, 12], [22, 5, 20, 10], [34, 2, 18, 13], [48, 8, 23, 11],
  [61, 1, 19, 9], [73, 6, 22, 12], [87, 3, 17, 10], [96, 9, 21, 11],
];

export default function FloatingParticles({ variant = "ambient", active = true }) {
  return (
    <div className={`floating-particles floating-particles--${variant} ${active ? "is-active" : ""}`} aria-hidden="true">
      {particles.map(([x, delay, duration, size], index) => (
        <span
          className="floating-particle"
          key={`particle-${index}`}
          style={{ "--x": `${x}%`, "--delay": `-${delay}s`, "--duration": `${duration}s`, "--size": `${size}px` }}
        />
      ))}
      {petals.map(([x, delay, duration, size], index) => (
        <span
          className="floating-petal"
          key={`petal-${index}`}
          style={{ "--x": `${x}%`, "--delay": `-${delay}s`, "--duration": `${duration}s`, "--size": `${size}px` }}
        />
      ))}
    </div>
  );
}