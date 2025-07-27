import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberEmail');
    const savedPassword = localStorage.getItem('rememberPassword');
    const remember = localStorage.getItem('rememberMe') === 'true';

    if (remember && savedEmail && savedPassword) {
      setFormData({ email: savedEmail, password: savedPassword });
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const email = formData.email.trim();
    const password = formData.password.trim();

    // 🔒 Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      // ✅ Login with trimmed inputs
      await login(email, password, rememberMe);

      if (rememberMe) {
        localStorage.setItem('rememberEmail', email);
        localStorage.setItem('rememberPassword', password);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberEmail');
        localStorage.removeItem('rememberPassword');
        localStorage.removeItem('rememberMe');
      }

      toast.success('✅ Login successful!', {
        position: 'top-center',
        autoClose: 2000,
      });

      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Login error:', err.message || err);
      setError(err.message || 'Login failed');
      toast.error('❌ Login failed. Please check your credentials.', {
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: darkMode ? '#1a1a1a' : 'linear-gradient(135deg, #f0f8ff, #e0f7fa)',
      padding: '20px',
      color: darkMode ? '#f5f5f5' : '#333',
    },
    card: {
      maxWidth: '400px',
      width: '100%',
      backgroundColor: darkMode ? '#2c2c2c' : '#ffffff',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: darkMode
        ? '0 0 15px rgba(255,255,255,0.05)'
        : '0 10px 20px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      textAlign: 'center',
    },
    label: {
      display: 'block',
      fontWeight: '600',
      marginBottom: '8px',
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '14px',
      marginBottom: '20px',
      backgroundColor: darkMode ? '#3a3a3a' : '#fff',
      color: darkMode ? '#f0f0f0' : '#000',
    },
    passwordContainer: {
      position: 'relative',
    },
    toggleIcon: {
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      fontSize: '18px',
    },
    button: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      backgroundColor: loading ? '#95a5a6' : '#3498db',
      color: '#fff',
      fontWeight: 'bold',
      fontSize: '16px',
      border: 'none',
      cursor: loading ? 'not-allowed' : 'pointer',
    },
    errorText: {
      color: '#e74c3c',
      fontSize: '14px',
      marginBottom: '15px',
      textAlign: 'center',
      fontWeight: '600',
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '15px',
    },
    checkbox: {
      marginRight: '8px',
    },
    footer: {
      marginTop: '16px',
      fontSize: '14px',
      textAlign: 'center',
    },
    link: {
      color: '#3498db',
      textDecoration: 'none',
      fontWeight: '600',
    },
    darkModeToggle: {
      textAlign: 'center',
      marginBottom: '16px',
      cursor: 'pointer',
      fontSize: '13px',
      color: darkMode ? '#bbb' : '#555',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.darkModeToggle} onClick={toggleDarkMode}>
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </div>

        <h2 style={styles.title}>🔐 Login</h2>

        {error && <div style={styles.errorText}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" style={styles.label}>📧 Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label htmlFor="password" style={styles.label}>🔒 Password</label>
          <div style={styles.passwordContainer}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <span onClick={togglePassword} style={styles.toggleIcon}>
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <div style={styles.checkboxContainer}>
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={handleRememberMe}
              style={styles.checkbox}
            />
            <label htmlFor="remember">Remember Me</label>
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? '⏳ Logging in...' : '🚀 Login'}
          </button>
        </form>

        <p style={styles.footer}>
          Don’t have an account?{' '}
          <Link to="/register" style={styles.link}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
