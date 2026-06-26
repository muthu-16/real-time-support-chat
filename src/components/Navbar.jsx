import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext.jsx';
import { logout } from '../services/authService.js';

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      toast.success('Logged out');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <header className="border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-semibold text-slate-100">
          Support Chat
        </Link>
        <nav className="flex items-center gap-4 text-slate-300">
          {user ? (
            <>
              <NavLink to="/dashboard" className="hover:text-white">
                Dashboard
              </NavLink>
              <NavLink to="/chat" className="hover:text-white">
                Chat
              </NavLink>
              <NavLink to="/profile" className="hover:text-white">
                Profile
              </NavLink>
              <button onClick={handleLogout} className="rounded-md bg-slate-700 px-3 py-2 text-sm text-white hover:bg-slate-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="hover:text-white">
                Login
              </NavLink>
              <NavLink to="/register" className="hover:text-white">
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
