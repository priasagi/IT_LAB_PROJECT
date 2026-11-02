
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('Loading your profile...');

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    let cancelled = false;

    async function loadProfile() {
      try {
        const response = await fetch(
          `${API_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Unable to load profile.');
        }

        if (!cancelled) {
          setUser(data.user);
          setMessage('');
        }
      } catch (error) {
        if (cancelled) return;

        localStorage.removeItem('authToken');
        navigate('/login', {
          replace: true,
          state: { message: error.message }
        });
      }
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem('authToken');
    navigate('/login', {
      replace: true,
      state: { message: 'You have logged out.' }
    });
  }

  if (!user) {
    return (
      <section className="auth-section">
        <p>{message}</p>
      </section>
    );
  }

  return (
    <section className="dashboard-section">
      <div className="dashboard-card">
        <p className="eyebrow">YOUR DASHBOARD</p>

        <h1>Welcome, {user.name}!</h1>

        <p>
          You have successfully logged in to AI Workflow.
        </p>

        <div className="profile-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        <button
          className="primary-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </section>
  );
}
