
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000';

<<<<<<< HEAD
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

const ALLOWED_EXTENSIONS = [
  '.txt',
  '.csv',
  '.json',
  '.log',
  '.md',
];

function scanSensitiveData(content) {
  const patterns = [
    {
      name: 'Email address',
      regex: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
    },
    {
      name: 'Phone number',
      regex: /(?:\+?\d{1,3}[-.\s]?)?(?:\d[-.\s]?){10}\b/g,
    },
    {
      name: 'Aadhaar-like number',
      regex: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g,
    },
    {
      name: 'PAN-like ID',
      regex: /\b[A-Z]{5}\d{4}[A-Z]\b/gi,
    },
    {
      name: 'Possible payment card number',
      regex: /\b(?:\d[ -]?){13,19}\b/g,
    },
    {
      name: 'Password or secret',
      regex:
        /\b(?:password|passwd|pwd|secret|api[_-]?key|access[_-]?token)\b\s*[:=]\s*["']?[^"'\s,;]{4,}/gi,
    },
    {
      name: 'Private key marker',
      regex: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g,
    },
  ];

  return patterns
    .map(({ name, regex }) => {
      const matches = content.match(regex) || [];

      return {
        name,
        count: matches.length,
      };
    })
    .filter((item) => item.count > 0);
}

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(
    'Loading your profile...'
  );

  const [scanning, setScanning] = useState(false);
  const [scanError, setScanError] = useState('');
  const [findings, setFindings] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
=======
export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('Loading your profile...');
>>>>>>> 838a9db3ccb3d9c24dfd0694c14adecd618a0cfc

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
<<<<<<< HEAD
              Authorization: `Bearer ${token}`,
            },
=======
              Authorization: `Bearer ${token}`
            }
>>>>>>> 838a9db3ccb3d9c24dfd0694c14adecd618a0cfc
          }
        );

        const data = await response.json();

        if (!response.ok) {
<<<<<<< HEAD
<<<<<<< HEAD
          throw new Error(
            data.message || 'Unable to load profile.'
          );
=======
          throw new Error(data.message || 'Unable to load profile.');
>>>>>>> 838a9db3ccb3d9c24dfd0694c14adecd618a0cfc
=======
          throw new Error(data.message || 'Unable to Load Profile.');
>>>>>>> origin/main
        }

        if (!cancelled) {
          setUser(data.user);
          setMessage('');
        }
      } catch (error) {
        if (cancelled) return;

        localStorage.removeItem('authToken');
<<<<<<< HEAD

        navigate('/login', {
          replace: true,
          state: {
            message:
              error.message || 'Unable to load your profile.',
          },
=======
        navigate('/login', {
          replace: true,
          state: { message: error.message }
>>>>>>> 838a9db3ccb3d9c24dfd0694c14adecd618a0cfc
        });
      }
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

<<<<<<< HEAD
  async function handleFileChange(event) {
    const file = event.target.files?.[0];

    setScanError('');
    setFindings(null);
    setSelectedFileName('');

    if (!file) return;

    const extension = file.name
      .slice(file.name.lastIndexOf('.'))
      .toLowerCase();

    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      setScanError(
        'Unsupported file type. Choose a TXT, CSV, JSON, LOG, or MD file.'
      );
      event.target.value = '';
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setScanError(
        'File is larger than 2 MB. Please choose a smaller file.'
      );
      event.target.value = '';
      return;
    }

    setScanning(true);
    setSelectedFileName(file.name);

    try {
      // The file is read and scanned in this browser.
      // It is NOT sent to the backend or an external service.
      const content = await file.text();

      const results = scanSensitiveData(content);

      setFindings(results);
    } catch {
      setScanError(
        'Unable to read this file. Please try another supported text file.'
      );
    } finally {
      setScanning(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem('authToken');

    navigate('/login', {
      replace: true,
      state: {
        message: 'You have logged out.',
      },
=======
  function handleLogout() {
    localStorage.removeItem('authToken');
    navigate('/login', {
      replace: true,
<<<<<<< HEAD
      state: { message: 'You have logged out.' }
>>>>>>> 838a9db3ccb3d9c24dfd0694c14adecd618a0cfc
=======
      state: { message: 'You have Logged Out.' }
>>>>>>> origin/main
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
          You have successfully logged in to AI-Workflow.
        </p>

        <div className="profile-details">
<<<<<<< HEAD
          <p>
            <strong>Name:</strong> {user.name}
          </p>

          <p>
            <strong>Username:</strong> {user.username}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        {/* Personal Data Vulnerability Scanner */}
        <div className="security-scanner">
          <p className="eyebrow">FILE SECURITY</p>

          <h2>Check Your File Before Sharing</h2>

          <p>
            Check for possible personal information, passwords,
            and other sensitive data before sharing a file online.
          </p>

          <div className="privacy-notice">
            <strong>Your privacy matters</strong>
            <p>
              Your selected file is scanned locally in your
              browser. This feature does not send the file to
              the backend or an external AI service.
            </p>
          </div>

          <label
            className="file-upload-area"
            htmlFor="security-file"
          >
            <span className="upload-icon" aria-hidden="true">
              ⬆
            </span>

            <strong>Choose a file to scan</strong>

            <span>
              TXT, CSV, JSON, LOG or MD · Maximum 2 MB
            </span>

            <input
              id="security-file"
              type="file"
              accept=".txt,.csv,.json,.log,.md"
              onChange={handleFileChange}
              disabled={scanning}
            />
          </label>

          {selectedFileName && (
            <p className="selected-file">
              Selected file: {selectedFileName}
            </p>
          )}

          {scanning && (
            <p className="form-message" role="status">
              Scanning your file...
            </p>
          )}

          {scanError && (
            <div className="security-warning" role="alert">
              <h3>Unable to scan file</h3>
              <p>{scanError}</p>
            </div>
          )}

          {findings !== null && !scanError && (
            <div
              className={
                findings.length > 0
                  ? 'security-warning'
                  : 'security-safe'
              }
              role="status"
              aria-live="polite"
            >
              {findings.length > 0 ? (
                <>
                  <h3>
                    ⚠ Sensitive information may be present
                  </h3>

                  <p>
                    Do not upload or share this file online
                    until you have reviewed and removed any
                    sensitive information.
                  </p>

                  <ul>
                    {findings.map((item) => (
                      <li key={item.name}>
                        {item.name}: {item.count} possible
                        match(es)
                      </li>
                    ))}
                  </ul>

                  <p>
                    These are pattern matches, not proof that
                    every match is sensitive data.
                  </p>
                </>
              ) : (
                <>
                  <h3>
                    No matching patterns detected
                  </h3>

                  <p>
                    This does not guarantee that your file is
                    safe to share. The scanner may miss sensitive
                    information or information in unsupported
                    formats.
                  </p>
                </>
              )}
            </div>
          )}
=======
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
>>>>>>> 838a9db3ccb3d9c24dfd0694c14adecd618a0cfc
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
