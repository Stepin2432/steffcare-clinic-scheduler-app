import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-2xl mt-4">Oops! Page not found.</p>
      <p className="text-gray-600 mt-2 mb-6">
        The page you are looking for might have been removed, renamed, or doesn’t exist.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
