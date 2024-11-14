const { query } = require('../functions/database');
const nodemailer = require('nodemailer');
require("dotenv").config();

const transport = nodemailer.createTransport({
  service: "Gmail",
  host: process.env.GMAIL_HOST,
  port: process.env.GMAIL_HOST, // try 587 or 465 if needed
  secure: true, // set to true if using port 465
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  connectionTimeout: 10000, // 10 seconds
});

// Test connection
transport.verify((error, success) => {
  if (error) {
    console.error("SMTP connection error:", error);
  } else {
    console.log("SMTP connection successful:", success);
  }
});

// Sample function to send a test email
async function sendTestEmail() {
  try {
    const info = await transport.sendMail({
      from: process.env.GMAIL_USER, // sender address
      to: process.env.GMAIL_TEST, // recipient's email
      subject: "Coog Zoo Test Email", // Subject line
      text: "This is a test email sent with Nodemailer!", // plain text body
      html: "<b>This is a test email sent with Nodemailer!</b>", // HTML body
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Call the function to send a test email
sendTestEmail();

// Function to send unsent notifications
module.exports.sendNotifications = async function() {
  try {
    // Fetch unsent notifications
    const notifications = await query(`
      SELECT * FROM Email_notifications WHERE sent = 0
    `);

    if (notifications.length === 0) {
      console.log("No emails to be sent");
      return;
    }

    for (let notification of notifications) {
      // Send the email
      await transport.sendMail({
        from: process.env.GMAIL_USER,
        to: notification.recipientEmail,
        subject: notification.subject,
        text: notification.message,
      });

      // Update notification as sent
      await query(`
        UPDATE Email_notifications 
        SET sent = 1 
        WHERE notificationID = ?
      `, [notification.notificationID]);

      console.log(`Notification sent to ${notification.recipientEmail}`);
    }
  } catch (error) {
    console.error('Error sending notifications:', error);
  }
};
