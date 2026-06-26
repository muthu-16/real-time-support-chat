const emojis = ['😀', '😂', '😍', '😎', '😉', '😭', '🙌', '👍', '🎉', '❤️'];

const EmojiPicker = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-5 gap-2 rounded-3xl border border-slate-800 bg-slate-950 p-3">
      {emojis.map((emoji) => (
        <button
          key={emoji}
          type="button"
          onClick={() => onSelect(emoji)}
          className="rounded-2xl bg-slate-900 px-3 py-2 text-lg hover:bg-slate-800">
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default EmojiPicker;
