const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

const createMessage = async (req, res) => {
  const { conversationId, sender, receiver, message, image, file } = req.body;

  if (!conversationId || !sender || !receiver) {
    return res.status(400).json({ message: 'Conversation, sender, and receiver are required' });
  }

  const conversation = await Conversation.findById(conversationId);
  if (!conversation) {
    return res.status(404).json({ message: 'Conversation not found' });
  }

  const createdMessage = await Message.create({
    conversationId,
    sender,
    receiver,
    message: message || '',
    image: image || '',
    file: file || '',
  });

  conversation.lastMessage = message || image || file || '';
  await conversation.save();

  res.status(201).json(createdMessage);
};

const getMessagesByConversation = async (req, res) => {
  const messages = await Message.find({ conversationId: req.params.conversationId })
    .sort({ createdAt: 1 })
    .populate('sender', 'name email avatar')
    .populate('receiver', 'name email avatar');

  res.json(messages);
};

const deleteMessage = async (req, res) => {
  const message = await Message.findById(req.params.id);
  if (!message) {
    return res.status(404).json({ message: 'Message not found' });
  }

  if (message.sender.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  await message.remove();
  res.json({ message: 'Message deleted' });
};

module.exports = {
  createMessage,
  getMessagesByConversation,
  deleteMessage,
};
