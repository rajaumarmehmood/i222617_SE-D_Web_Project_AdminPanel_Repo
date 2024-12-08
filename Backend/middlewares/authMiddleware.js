// // // middleware/authMiddleware.js
// // const jwt = require('jsonwebtoken');
// // const User = require('../models/userModel'); // Adjust the path as necessary
// // const Admin = require('../models/adminModel'); // Adjust the path as necessary

// // const protect = async (req, res, next) => {
// //   let token;

// //   // Check if token is in cookies or headers
// //   if (req.cookies.token) {
// //     token = req.cookies.token;
// //   } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
// //     token = req.headers.authorization.split(' ')[1];
// //   }

// //   if (!token) {
// //     return res.status(401).json({ message: 'Not authorized, no token' });
// //   }

// //   try {
// //     // Verify token
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     // Get user from the token
// //     req.user = await User.findById(decoded.id).select('-password'); // Exclude password
// //     if (!req.user) {
// //       return res.status(404).json({ message: 'User  not found' });
// //     }

// //     next();
// //   } catch (error) {
// //     console.error("Token verification failed:", error);
// //     return res.status(401).json({ message: 'Not authorized, token failed' });
// //   }
// // };

// // module.exports = protect;

// // // Correctly export the protect function
// // module.exports = protect;
// const jwt = require('jsonwebtoken');
// const Admin = require('../models/adminModel');

// const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// // Middleware to protect routes
// const protect = async (req, res, next) => {
//   // let token;
//   console.log(req.headers.authorization);
//   console.log(req.cookies.token);
//   // console.log(token);



//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     try {
//       const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
//       if (!token) {
//         return res.status(401).json({ message: 'Not authorized, no token' });
//       }

//       const decoded = jwt.verify(token, JWT_SECRET);
//       req.admin = await Admin.findById(decoded.id).select('-password');
//       next();
//     } catch (error) {
//       res.status(401).json({ message: 'Not authorized, token failed' });
//     }
//   }

//   if (!token) {
//     res.status(401).json({ message: 'Not authorized, no token' });
//   }
// };

// module.exports = { protect };
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token; // Declare the token variable here
  
  console.log('Authorization Header:', req.headers.authorization);
  console.log('Cookies:', req.cookies);


  // Check if token is present in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.token) {
    // Fallback to token in cookies if not in Authorization header
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = await Admin.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = { protect };
