import { useEffect, useState } from 'react';
import axios from '../../services/api';

const MyPrescriptionsTable = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/prescriptions/mine');
        setPrescriptions(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-medium mb-2">My Prescriptions</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Date</th>
            <th>Medication</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription) => (
            <tr key={prescription._id}>
              <td>{prescription.doctor?.name}</td>
              <td>{new Date(prescription.date).toLocaleDateString()}</td>
              <td>{prescription.medication}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPrescriptionsTable;
