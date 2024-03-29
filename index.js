const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Your Gmail email address
    pass: 'your-password' // Your Gmail password
  }
});

// Send email function
function sendEmail(to, subject, text) {
  const mailOptions = {
    from: 'Pirate\'s Treasure <your-email@gmail.com>',
    to: to,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error occurred while sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

// Order placement endpoint
app.post('/place-order', (req, res) => {
  const { email, orderDetails } = req.body;

  // Process order details (e.g., store in database)

  // Send email confirmation
  sendEmail(email, 'Order Confirmation', 'Your order has been placed successfully.');

  res.json({ message: 'Order placed successfully' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
