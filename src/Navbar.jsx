
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link className="logo" to="/">
        AI<span>Workflow</span>
      </Link>

      <ul className="nav-links">
        <li><Link to="/#home">Home</Link></li>
        <li><Link to="/#features">Features</Link></li>
        <li><Link to="/#contact">Contact</Link></li>
      </ul>

      <div className="nav-actions">
        <Link className="login-link" to="/login">
          Log in
        </Link>
        <Link className="nav-register" to="/register">
          Get Started
        </Link>
      </div>
    </nav>
  );
}
