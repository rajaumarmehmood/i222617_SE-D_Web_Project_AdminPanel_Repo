const express = require('express');
const {
  getUsers, searchUsers, approveUser, blockUser,
  setPermissions, getUserById, updateUser, deleteUser
} = require('../controllers/userController');

const router = express.Router();

router.get('/', getUsers);
router.get('/search/:query', searchUsers);
router.put('/approve/:id', approveUser);
router.put('/block/:id', blockUser);
router.put('/permissions/:id', setPermissions);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
