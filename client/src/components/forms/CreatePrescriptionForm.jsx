import { useState, useEffect } from 'react';
import axios from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const CreatePrescriptionForm = ({ onSuccess }) => {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patient: '',
    diagnosis: '',
    medications: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch patients on mount
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get('/patients');
        setPatients(res.data);
      } catch (err) {
        console.error('Failed to load patients');
      }
    };
    fetchPatients();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('/prescriptions', {
        ...formData,
        doctor: user._id,
      });

      if (onSuccess) onSuccess();
      setFormData({
        patient: '',
        diagnosis: '',
        medications: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting prescription.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md w-full max-w-xl">
      <h2 className="text-lg font-bold mb-4">📝 Create Prescription</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <select
        name="patient"
        value={formData.patient}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      >
        <option value="">Select Patient</option>
        {patients.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      <textarea
        name="diagnosis"
        value={formData.diagnosis}
        onChange={handleChange}
        placeholder="Diagnosis"
        rows="3"
        className="w-full p-2 border rounded"
        required
      />

      <textarea
        name="medications"
        value={formData.medications}
        onChange={handleChange}
        placeholder="Medications & Instructions"
        rows="4"
        className="w-full p-2 border rounded"
        required
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Prescription'}
      </button>
    </form>
  );
};

export default CreatePrescriptionForm;
