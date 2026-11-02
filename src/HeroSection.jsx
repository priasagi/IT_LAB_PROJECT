export default function HeroSection() {
  function handleClick() {
    document.getElementById('features')?.scrollIntoView({
      behavior: 'smooth',
    });
  }

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="eyebrow">BUILD SMARTER WITH AI</p>

        <h1>
          Enhance Your Workflow
          <span> with AI</span>
        </h1>

        <p className="hero-description">
          Explore how AI-assisted tools can help you design,
          develop, debug and improve modern web applications.
        </p>

        <button className="primary-button" onClick={handleClick}>
          Explore Features →
        </button>
      </div>
    </section>
  );
}