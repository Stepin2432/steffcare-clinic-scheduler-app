const PatientQueueBoard = () => {
  return (
    <div className="bg-white shadow p-4 rounded mt-4">
      <h2 className="text-lg font-bold mb-2">Real-Time Queue</h2>
      <p>🕐 Live patient queue will be shown here via socket events.</p>
    </div>
  );
};

export default PatientQueueBoard;
