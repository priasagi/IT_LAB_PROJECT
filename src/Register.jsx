
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setError(false);

    if (form.password !== form.confirmPassword) {
      setError(true);
      setMessage('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: form.name,
            username: form.username,
            email: form.email,
            password: form.password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed.');
      }

      navigate('/login', {
        state: { message: data.message }
      });
    } catch (err) {
      setError(true);
      setMessage(
        err.message === 'Failed to fetch'
          ? 'Cannot connect to the backend. Please check that the server is running.'
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-section">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">CREATE YOUR ACCOUNT</p>
        <h2>Register</h2>

        <label htmlFor="name">Full name</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          maxLength={100}
          autoComplete="name"
          required
        />

        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Choose a username"
          minLength={3}
          maxLength={50}
          pattern="[a-zA-Z0-9_]{3,50}"
          title="Use 3–50 letters, numbers or underscores."
          autoComplete="username"
          required
        />

        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          autoComplete="email"
          maxLength={150}
          required
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="At least 8 characters"
          minLength={8}
          autoComplete="new-password"
          required
        />

        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Enter password again"
          minLength={8}
          autoComplete="new-password"
          required
        />

        <button
          className="primary-button"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Create Account'}
        </button>

        {message && (
          <p className={error ? 'auth-error' : 'form-message'}
             role="alert">
            {message}
          </p>
        )}

        <p className="auth-switch">
          Already registered? <Link to="/login">Login here</Link>
        </p>
      </form>
    </section>
  );
}
