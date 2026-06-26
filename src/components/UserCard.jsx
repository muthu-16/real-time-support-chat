const UserCard = ({ user, onClick, selected }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        selected ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-slate-800 bg-slate-900 text-slate-100 hover:border-slate-600 hover:bg-slate-900/80'
      }`}>
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-lg font-semibold text-slate-100">
          {user.name?.slice(0, 1).toUpperCase() || 'U'}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold">{user.name}</p>
            <span className={`rounded-full px-2 py-1 text-xs ${user.isOnline ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-400'}`}>
              {user.isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
          <p className="text-sm text-slate-400">{user.email}</p>
        </div>
      </div>
    </button>
  );
};

export default UserCard;
