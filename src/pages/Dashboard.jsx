import { useEffect, useState, useContext } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import UserCard from '../components/UserCard.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import { getConversations } from '../services/conversationService.js';
import api from '../services/api.js';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const convRes = await getConversations();
        setConversations(convRes.data);
        if (user.role === 'admin') {
          const usersRes = await api.get('/api/users');
          setUsers(usersRes.data.filter((item) => item._id !== user.id));
        }
      } catch (error) {
        toast.error('Unable to load dashboard data');
      }
    };

    loadData();
  }, [user.id, user.role]);

  const filteredConversations = conversations.filter((conversation) => {
    const other = conversation.members.find((member) => member._id !== user.id);
    return other?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || conversation.lastMessage?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[320px_1fr] lg:px-6">
        <Sidebar
          conversations={filteredConversations}
          activeConversationId={null}
          onSelect={() => null}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <section className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white">Welcome back, {user.name}</h2>
            <p className="mt-2 text-slate-400">Use the dashboard to view support requests, users, and message activity.</p>
          </div>
          <div className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
              <h3 className="mb-4 text-xl font-semibold text-white">Active users</h3>
              <div className="space-y-3">
                {users.length === 0 ? (
                  <p className="text-slate-400">No users available.</p>
                ) : (
                  users.map((item) => (
                    <UserCard key={item._id} user={item} onClick={() => setSelectedUser(item)} selected={selectedUser?._id === item._id} />
                  ))
                )}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
              <h3 className="mb-4 text-xl font-semibold text-white">Recent conversations</h3>
              <div className="space-y-3">
                {filteredConversations.length === 0 ? (
                  <p className="text-slate-400">No conversations yet.</p>
                ) : (
                  filteredConversations.slice(0, 5).map((conversation) => {
                    const other = conversation.members.find((member) => member._id !== user.id);
                    return (
                      <div key={conversation._id} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                        <p className="font-semibold text-white">{other?.name || 'Support'}</p>
                        <p className="text-sm text-slate-400">{conversation.lastMessage || 'No messages yet'}</p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
