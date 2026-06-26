const express = require('express');
const {
  createMessage,
  getMessagesByConversation,
  deleteMessage,
} = require('../controllers/messageController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.post('/', createMessage);
router.get('/:conversationId', getMessagesByConversation);
router.delete('/:id', deleteMessage);

module.exports = router;
