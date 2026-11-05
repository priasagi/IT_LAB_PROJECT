<<<<<<< HEAD

=======
>>>>>>> 838a9db3ccb3d9c24dfd0694c14adecd618a0cfc
export default function HeroSection() {
  function handleClick() {
    document.getElementById('features')?.scrollIntoView({
      behavior: 'smooth',
    });
  }

  return (
    <section className="hero" id="home">
      <div className="hero-content">
<<<<<<< HEAD
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
=======
        <p className="eyebrow">BUILD SMARTER WITH AI</p>

        <h1>
          Enhance Your Workflow
          <span> with AI</span>
        </h1>

        <p className="hero-description">
          Explore How AI-assisted Tools can Help you Design,
          develop, debug and improve modern web applications.
        </p>

        <button className="primary-button" onClick={handleClick}>
          Explore Features →
>>>>>>> 838a9db3ccb3d9c24dfd0694c14adecd618a0cfc
        </button>
      </div>
    </section>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 838a9db3ccb3d9c24dfd0694c14adecd618a0cfc
