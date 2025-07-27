import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
    country: '',
    county: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRegistrationError('');

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      setLoading(false);
      return;
    }

    try {
      await register({
        ...formData,
        profilePicFile: profilePic,
      });

      toast.success('✅ Registered successfully! Redirecting...', {
        position: 'top-center',
        autoClose: 3000,
      });

      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      console.error('❌ Registration error:', err);
      setRegistrationError('Registration failed. Please try again.');
      toast.error('❌ Registration failed', { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      {registrationError && (
        <div style={{
          backgroundColor: '#ff4d4d',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '10px',
          marginBottom: '20px',
          textAlign: 'center',
          fontWeight: 'bold',
          boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
          width: '400px'
        }}>
          {registrationError}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 0 20px #FF00FF',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '400px',
          border: '4px solid #00FFFF'
        }}
        encType="multipart/form-data"
      >
        <h2 style={{ textAlign: 'center', color: '#FF1493', fontWeight: 'bold', fontSize: '26px' }}>
          🚀 Create Your Account!
        </h2>

        <input
          placeholder="👤 Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          style={inputStyle('#FF4500')}
        />

        <input
          type="email"
          placeholder="📧 Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          style={inputStyle('#FF8C00')}
        />

        <input
          placeholder="📍 Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
          style={inputStyle('#6A5ACD')}
        />

        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="🔒 Create Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          style={inputStyle('#32CD32')}
        />

        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="🔁 Re-enter Password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
          style={inputStyle('#32CD32')}
        />

        <label style={{ fontSize: '14px' }}>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          /> 👁️ Show Password
        </label>

        <select
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          required
          style={inputStyle('#1E90FF')}
        >
          <option value="">🌍 Select Country</option>
          <option value="Kenya">🇰🇪 Kenya</option>
          <option value="Uganda">🇺🇬 Uganda</option>
          <option value="Tanzania">🇹🇿 Tanzania</option>
        </select>

        <select
          value={formData.county}
          onChange={(e) => setFormData({ ...formData, county: e.target.value })}
          required
          style={inputStyle('#20B2AA')}
        >
          <option value="">🏙️ Select County</option>
          <option value="Nairobi">Nairobi</option>
          <option value="Mombasa">Mombasa</option>
          <option value="Kisumu">Kisumu</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={inputStyle('#DA70D6')}
        />

        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            style={{
              width: '100%',
              maxHeight: '180px',
              objectFit: 'cover',
              borderRadius: '10px'
            }}
          />
        )}

        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          required
          style={inputStyle('#FFD700')}
        >
          <option value="patient">🧑‍⚕️ Patient</option>
          <option value="doctor">👨‍⚕️ Doctor</option>
          <option value="receptionist">🧾 Receptionist</option>
          <option value="admin">🛡️ Admin</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px',
            backgroundColor: loading ? '#999' : '#FF1493',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '18px',
            border: 'none',
            borderRadius: '10px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '⏳ Registering...' : '🚨 Register Now'}
        </button>
      </form>
    </div>
  );
};

const inputStyle = (borderColor) => ({
  padding: '12px',
  borderRadius: '10px',
  border: `2px solid ${borderColor}`
});

export default Register;
