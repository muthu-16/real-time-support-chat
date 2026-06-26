import { useState, useRef } from 'react';

const MessageInput = ({ onSend, onTyping, onStopTyping }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const typingTimeoutRef = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);
    onTyping();
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      onStopTyping();
    }, 1000);
  };

  const handleSend = () => {
    if (!text.trim() && !image && !file) return;

    const payload = {
      message: text.trim(),
      image: image || '',
      file: file || '',
    };

    onSend(payload);
    setText('');
    setImage(null);
    setFile(null);
    onStopTyping();
  };

  const handleFileChange = async (event) => {
    const selected = event.target.files[0];
    if (!selected) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (selected.type.startsWith('image/')) {
        setImage(reader.result);
        setFile(null);
      } else {
        setFile(reader.result);
        setImage(null);
      }
    };
    reader.readAsDataURL(selected);
  };

  return (
    <div className="border-t border-slate-800 bg-slate-950 p-4">
      <div className="flex items-center gap-3">
        <label className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800">
          Attach
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Type your message..."
          className="flex-1 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-slate-600"
        />
        <button onClick={handleSend} className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-500">
          Send
        </button>
      </div>
      {(image || file) && (
        <div className="mt-3 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200">
          Attached: {image ? 'Image preview' : 'File attached'}
        </div>
      )}
    </div>
  );
};

export default MessageInput;
