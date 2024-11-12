const { query } = require('../functions/database');
const nodemailer = require('nodemailer');

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Function to send unsent notifications
module.exports.sendNotifications = async function() {
    try {
        // Fetch unsent notifications
        const notifications = await query(`
            SELECT * FROM Email_notifications WHERE sent = 0
        `);

        for (let notification of notifications) {
            // Send the email
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: notification.recipientEmail,
                subject: notification.subject,
                text: notification.message
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

