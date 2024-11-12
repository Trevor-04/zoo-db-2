const { query } = require('../functions/database');
const nodemailer = require('nodemailer');
require("dotenv").config();

const transport = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: 2525, // try 587 or 465 if needed
  secure: false, // set to true if using port 465
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
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


const sender = {
  address: "hello@example.com",
  name: "Mailtrap Test",
};
const recipientEmail = "cooguarzooguar@gmail.com";

// Sample function to send a test email
async function sendTestEmail() {
  try {
    const info = await transport.sendMail({
      from: `"${sender.name}" <${sender.address}>`, // sender address
      to: recipientEmail, // recipient's email
      subject: "Hello from Mailtrap", // Subject line
      text: "This is a test email sent with Mailtrap!", // plain text body
      html: "<b>This is a test email sent with Mailtrap!</b>", // HTML body
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

    for (let notification of notifications) {
      // Send the email
      await transport.sendMail({
        from: `"${sender.name}" <${sender.address}>`,
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
