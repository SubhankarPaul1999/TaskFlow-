const cron = require('node-cron');
const nodemailer = require('nodemailer');
const Todo = require('../model/list');
const moment = require('moment');
require('dotenv').config(); // Load environment variables

// Setup Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL, // Use environment variables
        pass: process.env.USER_PASSWORD
    }
});

// Function to send email reminder
const sendReminderEmail = async (task, userMail) => {
    try {
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: process.env.USER_EMAIL, // Send email to the actual user
            subject: `Reminder: Task Due - ${task.title}`,
            text: `Your task "${task.title}" is due on ${moment(task.dueDate).format('LLLL')}. Please complete it soon.`
        };

        await transporter.sendMail(mailOptions);
        console.log(`Reminder email sent for task: ${task.title}`);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

// Scheduled Task: Runs every minute to check for due tasks
cron.schedule('* * * * *', async () => {
    console.log("Checking for due tasks...");

    try {
        const now = new Date();
        // const tasks1 = await Todo.find({});
        // console.log("All Tasks in DB:", tasks1);
        
        const tasks = await Todo.find({ dueDate: { $lte: now }, reminderSent: false });
        console.log(tasks);
        for (const task of tasks) {
            if (task.user ) {
                await sendReminderEmail(task, task.user.email);
                task.reminderSent = true;
                await task.save();
            } else {
                console.warn(`Skipping task "${task.title}" - User email not found.`);
            }
        }

        console.log("Reminders sent.");
    } catch (error) {
        console.error("Error checking tasks:", error);
    }
});

module.exports = {};
