const Conversation = require('../models/Conversation');
const User = require('../models/User');

const createConversation = async (req, res) => {
  let { members, targetEmail } = req.body;

  if (targetEmail) {
    const targetUser = await User.findOne({ email: targetEmail.trim().toLowerCase() });
    if (!targetUser) {
      return res.status(404).json({ message: 'Target user not found' });
    }
    members = [req.user._id.toString(), targetUser._id.toString()];
  }

  if (!members || !Array.isArray(members) || members.length < 2) {
    return res.status(400).json({ message: 'Conversation requires at least two members' });
  }

  const normalizedMembers = members.map((member) => member.toString());

  const existing = await Conversation.findOne({
    members: { $all: normalizedMembers, $size: normalizedMembers.length },
  });

  if (existing) {
    return res.status(200).json(existing);
  }

  const conversation = await Conversation.create({ members: normalizedMembers });
  res.status(201).json(conversation);
};

const getConversations = async (req, res) => {
  const conversations = await Conversation.find({ members: req.user._id })
    .sort({ updatedAt: -1 })
    .populate('members', 'name email avatar isOnline lastSeen role');

  res.json(conversations);
};

const deleteConversation = async (req, res) => {
  const conversation = await Conversation.findById(req.params.id);
  if (!conversation) {
    return res.status(404).json({ message: 'Conversation not found' });
  }

  if (!conversation.members.includes(req.user._id) && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  await conversation.remove();
  res.json({ message: 'Conversation deleted' });
};

module.exports = {
  createConversation,
  getConversations,
  deleteConversation,
};
