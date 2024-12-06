// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   isApproved: { type: Boolean, default: false },
//   isBlocked: { type: Boolean, default: false },
//   permissions: { type: [String], default: [] },
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
  imageUrls: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',  // Reference to the Property model
  }],
  isApproved: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  permissions: { type: [String], default: [] },
}, { timestamps: true });

// Pre-save hook to hash the password before saving to the DB
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Match password method for login comparison
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);


// this si the current i am working on, iss mein you please add two bool fields (is blocked, is suspended) buss
