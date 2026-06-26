import { formatTime } from '../utils/format.js';

const MessageBubble = ({ message, isOwn }) => {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] rounded-3xl px-4 py-3 shadow-xl ${isOwn ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-100'}`}>
        {message.message && <p className="whitespace-pre-wrap">{message.message}</p>}
        {message.image && <img src={message.image} alt="uploaded" className="mt-3 max-h-64 w-full rounded-xl object-cover" />}
        {message.file && (
          <a href={message.file} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm text-blue-200 underline">
            View attachment
          </a>
        )}
        <div className="mt-2 flex items-center justify-end text-xs text-slate-300">
          <span>{formatTime(message.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
