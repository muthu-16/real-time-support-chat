const ProfileModal = ({ user, onClose, onSave, onChange }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
      <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Update Profile</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            Close
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={onChange}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-slate-500"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Avatar URL</label>
            <input
              type="text"
              name="avatar"
              value={user.avatar}
              onChange={onChange}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-slate-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={onClose} className="rounded-2xl border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800">
              Cancel
            </button>
            <button onClick={onSave} className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
