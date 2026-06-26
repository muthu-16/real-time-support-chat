const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    socket.on('join_room', async ({ userId, conversationId }) => {
      socket.join(conversationId);
      const user = await User.findById(userId);
      if (user) {
        user.isOnline = true;
        await user.save();
        io.emit('user_online', { userId, isOnline: true });
      }
    });

    socket.on('send_message', async (payload) => {
      const message = await Message.create(payload);
      const conversation = await Conversation.findById(payload.conversationId);
      if (conversation) {
        conversation.lastMessage = payload.message || payload.image || payload.file || '';
        await conversation.save();
      }
      io.to(payload.conversationId).emit('receive_message', message);
    });

    socket.on('typing', ({ conversationId, senderId }) => {
      socket.to(conversationId).emit('typing', { conversationId, senderId });
    });

    socket.on('stop_typing', ({ conversationId, senderId }) => {
      socket.to(conversationId).emit('stop_typing', { conversationId, senderId });
    });

    socket.on('message_seen', async ({ conversationId, userId }) => {
      await Message.updateMany({ conversationId, receiver: userId, isSeen: false }, { isSeen: true });
      io.to(conversationId).emit('message_seen', { conversationId, userId });
    });

    socket.on('disconnect', async () => {
      const matchingSockets = await io.fetchSockets();
      const userSocket = matchingSockets.find((s) => s.id === socket.id);
      if (!userSocket) {
        return;
      }
      const userId = socket.handshake.query.userId;
      if (userId) {
        const user = await User.findById(userId);
        if (user) {
          user.isOnline = false;
          user.lastSeen = Date.now();
          await user.save();
          io.emit('user_offline', { userId, isOnline: false, lastSeen: user.lastSeen });
        }
      }
    });
  });
};

module.exports = socketHandler;
