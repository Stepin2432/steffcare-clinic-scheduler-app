import { Link } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  const containerStyle = {
    backgroundImage: 'url("https://images.unsplash.com/photo-1588776814546-b4d50c09c46d?auto=format&fit=crop&w=1920&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '2rem',
    position: 'relative',
  };

  const titleStyle = {
    fontSize: '3.5rem',
    fontWeight: '900',
    marginBottom: '1rem',
    textShadow: '3px 3px 8px rgba(0,0,0,0.8)',
    color: '#ffeb3b',
  };

  const subtitleStyle = {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    color: '#ff5722',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: '0.5rem 1rem',
    borderRadius: '10px',
    fontWeight: 'bold',
  };

  const aboutStyle = {
    fontSize: '1.1rem',
    maxWidth: '700px',
    marginBottom: '1.5rem',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 0 15px rgba(0,0,0,0.5)',
    color: '#00e5ff',
  };

  const infoStyle = {
    fontSize: '1.1rem',
    maxWidth: '600px',
    marginBottom: '2rem',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    color: '#ffffff',
  };

  const buttonStyle = {
    backgroundColor: '#00e676',
    color: '#000000',
    padding: '0.9rem 1.8rem',
    border: '2px solid #ffffff',
    borderRadius: '0.75rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    textDecoration: 'none',
    margin: '0.75rem',
    boxShadow: '0 6px 12px rgba(0,0,0,0.4)',
    transition: 'all 0.3s ease',
  };

  const floatingButtonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    zIndex: 1000,
  };

  const singleFloatButton = {
    backgroundColor: '#ff4081',
    color: '#ffffff',
    border: 'none',
    borderRadius: '50px',
    padding: '0.7rem 1.5rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
    textDecoration: 'none',
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  };

  const modalContentStyle = {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '12px',
    maxWidth: '400px',
    width: '90%',
    textAlign: 'center',
    color: '#000',
    boxShadow: '0 0 30px rgba(0,0,0,0.3)',
    position: 'relative',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '15px',
    backgroundColor: '#ff5252',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    fontSize: '1.1rem',
    width: '30px',
    height: '30px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Welcome to Steffcare Medclinic</h1>
      <h2 style={subtitleStyle}>Your Health, Our Priority!</h2>

      <div style={aboutStyle}>
        <strong>About Steffcare:</strong> We are a modern digital clinic offering fast, accessible, and affordable healthcare services. From appointment scheduling and doctor consultations to prescription management — everything is just a click away.
      </div>

      <p style={infoStyle}>
        Book appointments instantly, consult top professionals, access your medical history securely, and take control of your wellness. Join thousands who trust Steffcare to care, serve, and deliver!
      </p>

      <div>
        <Link
          to="/login"
          style={buttonStyle}
          onMouseOver={e => Object.assign(e.target.style, { ...buttonStyle, backgroundColor: '#00c853', color: '#ffffff' })}
          onMouseOut={e => Object.assign(e.target.style, buttonStyle)}
        >
          Login
        </Link>
        <Link
          to="/register"
          style={buttonStyle}
          onMouseOver={e => Object.assign(e.target.style, { ...buttonStyle, backgroundColor: '#00c853', color: '#ffffff' })}
          onMouseOut={e => Object.assign(e.target.style, buttonStyle)}
        >
          Register
        </Link>
      </div>

      {/* Floating Buttons with Icons */}
      <div style={floatingButtonStyle}>
        <button style={singleFloatButton} onClick={() => setShowHelp(true)}>
          💬 Help?
        </button>
        <button
          style={{ ...singleFloatButton, backgroundColor: '#448aff' }}
          onClick={() => setShowSupport(true)}
        >
          📞 Contact Support
        </button>
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <button style={closeButtonStyle} onClick={() => setShowHelp(false)}>×</button>
            <h3>Need Help?</h3>
            <p>Visit our FAQ page or email <strong>support@steffcare.com</strong>. We’re here to assist you 24/7.</p>
          </div>
        </div>
      )}

      {/* Support Modal */}
      {showSupport && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <button style={closeButtonStyle} onClick={() => setShowSupport(false)}>×</button>
            <h3>Contact Support</h3>
            <p>Call us at <strong>+254-700-123456</strong> or WhatsApp us for instant replies. Alternatively, email <strong>support@steffcare.com</strong>.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
