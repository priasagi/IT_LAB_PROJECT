
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(
    location.state?.message || ''
  );
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed.');
      }

      localStorage.setItem('authToken', data.token);

      navigate('/dashboard', { replace: true });
    } catch (err) {
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
        <p className="eyebrow">WELCOME BACK</p>
        <h2>Login</h2>

        <label htmlFor="login-username">Username</label>
        <input
          id="login-username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter your username"
          autoComplete="username"
          required
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />

        <button
          className="primary-button"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {message && (
          <p className="auth-error" role="alert">
            {message}
          </p>
        )}

        <p className="auth-switch">
          New user? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </section>
  );
}
