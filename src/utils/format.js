export const formatTime = (timestamp) => {
  if (!timestamp) return '';
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));
};

export const lastSeenText = (lastSeen) => {
  if (!lastSeen) return 'Offline';
  const date = new Date(lastSeen);

  return `Last seen ${date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })}`;
};

export const scrollToBottom = (element) => {
  if (!element) return;
  element.scrollTop = element.scrollHeight;
};
