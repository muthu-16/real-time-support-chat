import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ conversations, activeConversationId, onSelect, searchTerm, setSearchTerm }) => {
  return (
    <aside className="w-full max-w-sm border-r border-slate-800 bg-slate-950 p-4 sm:w-80">
      <div className="mb-4 flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 p-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search conversations"
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-slate-500"
        />
      </div>
      <div className="space-y-3">
        {conversations.length === 0 ? (
          <p className="text-sm text-slate-400">No conversations yet.</p>
        ) : (
          conversations.map((conversation) => {
            const other = conversation.members[0];
            return (
              <button
                key={conversation._id}
                onClick={() => onSelect(conversation)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  activeConversationId === conversation._id
                    ? 'border-blue-500 bg-blue-500/10 text-white'
                    : 'border-slate-800 bg-slate-900 text-slate-100 hover:border-slate-600 hover:bg-slate-900/80'
                }`}>
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold">{other.name || 'Support'}</p>
                    <p className="text-sm text-slate-400">
                      {conversation.lastMessage || 'Start a new chat'}
                    </p>
                  </div>
                  <span className="text-xs text-slate-500">{new Date(conversation.updatedAt).toLocaleDateString()}</span>
                </div>
              </button>
            );
          })
        )}
      </div>
      <Link to="/chat" className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-500">
        Start New Chat
      </Link>
    </aside>
  );
};

export default Sidebar;
