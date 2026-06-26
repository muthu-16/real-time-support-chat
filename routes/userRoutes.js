const express = require('express');
const { getUsers, getUserById, deleteUser } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect, authorize('admin'));
router.get('/', getUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);

module.exports = router;
