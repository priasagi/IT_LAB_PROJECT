import { useState } from 'react';

export default function ContactSection() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim()) {
      setMessage('Please enter your email address.');
      return;
    }

    setMessage(`Thank you! Your email is ${email}.`);
    setEmail('');
  }

  return (
    <section className="contact section" id="contact">
      <p className="eyebrow">GET STARTED</p>
      <h2>Explore AI-Assisted Development</h2>
      <p className="section-description">
        Enter your email to try this sample front-end form.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email address</label>

        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <button className="primary-button" type="submit">
          Submit
        </button>

        {message && <p className="form-message">{message}</p>}
      </form>
    </section>
  );
}