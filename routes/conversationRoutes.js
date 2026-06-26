const express = require('express');
const {
  createConversation,
  getConversations,
  deleteConversation,
} = require('../controllers/conversationController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.post('/', createConversation);
router.get('/', getConversations);
router.delete('/:id', deleteConversation);

module.exports = router;
