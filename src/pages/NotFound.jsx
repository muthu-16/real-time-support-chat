import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main className="mx-auto flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">404</p>
        <h1 className="mt-6 text-4xl font-semibold text-white sm:text-5xl">Page not found</h1>
        <p className="mt-4 max-w-xl text-slate-400">The page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="mt-8 inline-flex rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500">
          Back to Home
        </Link>
      </main>
    </div>
  );
};

export default NotFound;
