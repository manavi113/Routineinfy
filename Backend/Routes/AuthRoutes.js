const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const JWT_SECRET = "mindfullSecretKey";
const multer = require('multer');
const path = require('path');
const upload = require('../middleware/multer');

 require('dotenv').config();
// router.post('/register', async (req, res) => {
//   const { name, email, password, age, gender } = req.body;

//   const existingUser = await User.findOne({ email });
//   if (existingUser) return res.status(400).json({ msg: "User already exists" });

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = new User({ name, email, password: hashedPassword, age, gender });
//   await user.save();
 
//   res.status(201).json({
//   msg: "User registered successfully",
//   user: {
//     _id: user._id,
//     name: user.name,
//     email: user.email,
//     age: user.age,
//     gender: user.gender
//   }
// });

// });


const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;


console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌");


router.post('/register', upload.single('profilePic'), async (req, res) => {
  try {
    const { name, email, password, age, gender } = req.body;
    const profilePic = req.file ? req.file.filename : null;  // optional

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      age,
      gender,
      profilePic   
    });

    await user.save();

    res.status(201).json({
      msg: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        profilePic: user.profilePic || null
      }
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});



router.put('/profile/:id', upload.single('profilePic'), async (req, res) => {
  try {
    const { name, email, age, gender } = req.body;
    const profilePic = req.file ? req.file.filename : null;

    const updatedFields = { name, email, age, gender };
    if (profilePic) updatedFields.profilePic = profilePic;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    ).select("-password");

    res.status(200).json({ msg: 'Profile updated!', user: updatedUser });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ msg: 'Server error' });
  }
});






 
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
user.loginLogs.push(today);
await user.save();
console.log("Updated loginLogs:", user.loginLogs);
     
    res.json({ 
  token, 
  user: { 
    _id: user._id, 
    name: user.name, 
    email: user.email,
    age: user.age,
    gender: user.gender 
  } 
});

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});




router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.params.userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching tasks' });
  }
});





router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const token = crypto.randomBytes(32).toString("hex");
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 3600000;  
  await user.save();

  const resetLink = `https://routineinfy-3.onrender.com/reset-password/${token}`;  

 
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
       user: EMAIL_USER,
        pass: EMAIL_PASS
    },
  });

  await transporter.sendMail({
    to: user.email,
    subject: 'Password Reset',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
  });

  res.json({ msg: 'Reset link sent to email' });
});





 
// router.post('/reset-password/:token', async (req, res) => {
//   const { token } = req.params;
//   const { password } = req.body;

//   const user = await User.findOne({
//     resetToken: token,
//     resetTokenExpiry: { $gt: Date.now() } 
//   });

//   if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

//   const hashedPassword = await bcrypt.hash(password, 10);
//   user.password = hashedPassword;
//   user.resetToken = undefined;
//   user.resetTokenExpiry = undefined;
//   await user.save();

//   res.json({ msg: "Password has been reset successfully" });
// });







// 📌 Forgot Password
// Debug-friendly forgot-password (temporary)
// router.post('/forgot-password', async (req, res) => {
//   console.log("📩 Route hit - forgot-password, body:", req.body);

//   try {
//     const { email } = req.body;
//     if (!email) {
//       console.warn("⚠️ No email provided in request body");
//       return res.status(400).json({ msg: "Email is required" });
//     }

//     // find user
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.warn("❌ User not found for:", email);
//       return res.status(400).json({ msg: "User not found" });
//     }
//     console.log("✅ User found:", user.email);

//     // generate token
//     const token = crypto.randomBytes(32).toString("hex");
//     user.resetToken = token;
//     user.resetTokenExpiry = Date.now() + 3600000;
//     await user.save();
//     console.log("🔑 Token generated and saved:", token);

//     // reset link - prefer environment var with fallback
//     const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
//     const resetLink = `${frontendUrl.replace(/\/$/, '')}/reset-password/${token}`;
//     console.log("🔗 Reset link:", resetLink);

//     // check env values
//     console.log("📧 Using EMAIL_USER:", !!process.env.EMAIL_USER ? process.env.EMAIL_USER : 'MISSING');
//     console.log("🔒 EMAIL_PASS loaded?:", !!process.env.EMAIL_PASS);

//     // create transporter with debug flags enabled
//     let transporter;
//     try {
//       transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASS
//         },
//         logger: true,
//         debug: true
//       });
//       console.log("✅ Transporter created");
//     } catch (tErr) {
//       console.error("❌ Transporter create error:", tErr);
//       return res.status(500).json({ msg: "Transporter creation failed", error: tErr.message });
//     }

//     // attempt to send mail and catch/send back any error details
//     try {
//       const info = await transporter.sendMail({
//         from: process.env.EMAIL_USER,
//         to: user.email,
//         subject: 'Password Reset',
//         html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
//       });
//       console.log("📨 Email sent successfully:", info && (info.messageId || info.response));
//       return res.json({ msg: 'Reset link sent to email', info: info });
//     } catch (mailErr) {
//       console.error("❌ sendMail error:", mailErr);
//       // return detailed error for debugging (remove in prod)
//       return res.status(500).json({
//         msg: "Failed to send email",
//         error: mailErr && (mailErr.message || mailErr.toString()),
//         code: mailErr?.code || null,
//         response: mailErr?.response || null
//       });
//     }

//   } catch (err) {
//     console.error("🔥 Forgot-password outer error:", err);
//     return res.status(500).json({ msg: "Server error", error: err.message || err.toString() });
//   }
// });

// 📌 Reset Password
router.post('/reset-password/:token', async (req, res) => {
  try {
    console.log("🔑 Reset password request received with token:", req.params.token);

    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      console.log("❌ Invalid or expired token:", token);
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    console.log("✅ Token valid for user:", user.email);

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    console.log("✅ Password updated successfully for:", user.email);

    res.json({ msg: "Password has been reset successfully" });
  } catch (err) {
    console.error("🔥 Reset password error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});



router.get('/login-logs/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    
    res.status(200).json({ loginLogs: user.loginLogs });
  } catch (err) {
    console.error("Login logs fetch error:", err); // Debug
    res.status(500).json({ msg: 'Error fetching logs' });
  }
});






router.post('/log-login', async (req, res) => {
  const { userId, date } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    if (!user.loginLogs.includes(date)) {
      user.loginLogs.push(date);
      await user.save();
    }

    res.status(200).json({ msg: 'Login date logged successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Error logging login date' });
  }
});





module.exports = router;
