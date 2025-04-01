const router = require('express').Router();
const User = require('../model/user');
const List = require('../model/list');
const path = require('path');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');
// Create Task API
router.post('/addTask', authMiddleware, async (req, res) => {
    try {
        const { title, description, dueDate, id } = req.body;

        const existingUser = await User.findById(id);

        if (existingUser) {
            const list = new List({ title, body: description, dueDate: dueDate, user: existingUser });
            await list.save().then(() => res.status(200).json({ list }));
            existingUser.list.push(list._id);
            await existingUser.save();
        }
    } catch (error) {
        console.log(error);
    }
});

// Update Task API
router.put('/updateTask/:id', authMiddleware, async (req, res) => {
    try {
        const { title, body, email, completed, dueDate } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            /* 
                updating the task in database by finding the id (provided in `req.params.id`) &
                updates its `title` and `body` fields with the values passed in the request body.
            */
            const list = await List.findByIdAndUpdate(req.params.id, { title, body, completed, dueDate }, { new: true });
            res.status(200).json({ message: "Task Updated!" });
        }
    } catch (error) {
        console.log(error);
    }
});

// Delete Task API
router.delete('/deleteTask/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.body;

        const existingUser = await User.findByIdAndUpdate(
            id,
            { $pull: { list: req.params.id } }
        );

        if (existingUser) {
            // deleting the task in database by finding the id (provided in `req.params.id`)
            await List.findByIdAndDelete(req.params.id).then(() =>
                res.status(200).json({ message: "Task Deleted!" })
            );
        }
    } catch (error) {
        console.log(error);
    }
});

// Get All Task API
router.get('/getTask/:id', authMiddleware, async (req, res) => {
    /*
        To find all tasks (or lists) that belong to a specific user & 
        the sort method is used to arrange the task added recently at the top.
    */
    const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });

    if (list.length !== 0) {
        res.status(200).json({ list });
    } else {
        res.status(200).json({ message: "Task Not Found!!" });
    }
});


const storage = multer.diskStorage({
    destination: './uploads/',  // Save files in 'uploads' folder
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });
// File Upload API
router.post('/upload/:todoId', authMiddleware, upload.single('file'), async (req, res) => {
    try {
        console.log("Received request body:", req.body);
        console.log("Received file:", req.file);
        const todoId = req.params.todoId; // Capture the todoId from the URL

        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        res.status(200).json({ message: 'File uploaded successfully', filePath: req.file.path });
    } catch (error) {
        res.status(500).json({ message: 'File upload failed', error });
    }
});

module.exports = router;