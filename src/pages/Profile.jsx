import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar.jsx';
import ProfileModal from '../components/ProfileModal.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import { updateProfile } from '../services/authService.js';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: user?.name || '', avatar: user?.avatar || '' });

  const handleOpen = () => {
    setFormData({ name: user.name, avatar: user.avatar });
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await updateProfile(formData);
      setUser(response.data.user);
      toast.success('Profile updated');
      setIsOpen(false);
    } catch (error) {
      toast.error('Update failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-8 shadow-2xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-white">Your Profile</h1>
              <p className="mt-2 text-slate-400">Manage your account details and avatar settings.</p>
            </div>
            <button onClick={handleOpen} className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500">
              Edit Profile
            </button>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
              <p className="text-sm text-slate-400">Name</p>
              <p className="mt-2 text-lg font-semibold text-white">{user.name}</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
              <p className="text-sm text-slate-400">Email</p>
              <p className="mt-2 text-lg font-semibold text-white">{user.email}</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
              <p className="text-sm text-slate-400">Status</p>
              <p className="mt-2 text-lg font-semibold text-white">{user.isOnline ? 'Online' : 'Offline'}</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
              <p className="text-sm text-slate-400">Last Seen</p>
              <p className="mt-2 text-lg font-semibold text-white">{new Date(user.lastSeen).toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-950 p-6">
            <p className="text-sm text-slate-400">Avatar URL</p>
            <div className="mt-4 flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-slate-800 text-2xl leading-[80px] text-slate-100">
                {user.name?.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <p className="text-lg font-semibold text-white">{user.avatar || 'No avatar set'}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      {isOpen && <ProfileModal user={formData} onClose={handleClose} onSave={handleSave} onChange={handleChange} />}
    </div>
  );
};

export default Profile;
