import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble.jsx';

const ChatBody = ({ messages, userId, typing }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, typing]);

  return (
    <div className="flex h-full flex-col gap-4 overflow-hidden p-4">
      <div className="flex-1 space-y-4 overflow-y-auto pr-2">
        {messages.length === 0 ? (
          <p className="text-center text-slate-500">No messages yet. Start the conversation.</p>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message._id} message={message} isOwn={message.sender._id === userId} />
          ))
        )}
        {typing && <div className="text-sm text-slate-400">Typing...</div>}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatBody;
