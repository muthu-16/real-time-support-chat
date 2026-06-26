const ChatHeader = ({ member, isOnline, lastSeen }) => {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-lg font-semibold text-slate-100">
          {member?.name?.slice(0, 1).toUpperCase() || 'S'}
        </div>
        <div>
          <p className="font-semibold text-white">{member?.name || 'Support'}</p>
          <p className="text-sm text-slate-400">{isOnline ? 'Online' : lastSeen}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
