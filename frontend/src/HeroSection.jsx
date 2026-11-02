
export default function HeroSection() {
  function handleClick() {
    document.getElementById('features')?.scrollIntoView({
      behavior: 'smooth',
    });
  }

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="eyebrow">
          AI WORKFLOW · FILE SECURITY
        </p>

        <h1>
          Protect Your Data
          <span> Before You Share</span>
        </h1>

        <p className="hero-description">
          Keep your personal information safer with AI Workflow.
          Scan text-based files for possible email addresses,
          phone numbers, Aadhaar-like numbers, PAN-like IDs,
          passwords, API keys, and other sensitive information.
          Get security warnings before sharing files online.
        </p>

        <button
          className="primary-button"
          onClick={handleClick}
        >
          Explore Security Features →
        </button>
      </div>
    </section>
  );
}
