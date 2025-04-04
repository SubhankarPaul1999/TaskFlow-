const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    completed: { type: Boolean, default: false },
    dueDate: { type: Date, required: true }, // Add due date
    reminderSent: { type: Boolean, default: false },
    files: [{ type: String }],
    user: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ]
},
    { timestamps: true },
);

module.exports = mongoose.model('List', listSchema);