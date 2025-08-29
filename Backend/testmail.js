require('dotenv').config();
const nodemailer = require('nodemailer');

async function testMail() {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // apna email hi dal ke dekho
      subject: 'Test Email',
      text: 'This is a nodemailer test email!',
    });

    console.log('✅ Message sent:', info.messageId);
  } catch (error) {
    console.error('❌ Error sending mail:', error);
  }
}

testMail();
