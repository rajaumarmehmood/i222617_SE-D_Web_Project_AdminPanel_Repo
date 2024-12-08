const express = require('express');
const {
  getUsers, searchUsers, approveUser, blockUser,
  setPermissions, getUserById, updateUser, deleteUser
} = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', protect, getUsers);
// router.get('users/', getUsers);
router.get('/search/:query', protect, searchUsers);
router.put('/approve/:id', protect, approveUser);
router.put('/block/:id', protect, blockUser);
router.put('/permissions/:id', protect, setPermissions);
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);

module.exports = router;
