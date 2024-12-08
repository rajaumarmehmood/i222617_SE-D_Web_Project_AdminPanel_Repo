const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  getAdmins,
  addAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/adminController");

const router = express.Router();

// Define routes
router.get("/", protect, getAdmins);
router.post("/", protect, addAdmin);
router.put("/:id", protect, updateAdmin);
router.delete("/:id", protect, deleteAdmin);

module.exports = router;
