const { Router, response } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const z = require("zod");
const jwt = require("jsonwebtoken");
const secretKey = "secret";
const { Admin, User, Course } = require("../db");

// Admin Routes
router.post('/signup', async (req, res) => {
    try {
        // Implement admin signup logic
        const { username, password } = req.body;

        const validateSignup = z.object({
            username: z.string().email(),
            password: z.string().min(5).max(10)
        });

        if (!validateSignup.safeParse({ username, password }).success) {
            return res.status(400).json({ message: "Invalid input" });
        }

        if (await User.findOne({ username: username }) || await Admin.findOne({ username: username })) {
            return res.status(400).json({ message: "Admin already exist" });
        }

        const newAdmin = await Admin.create({
            username,
            password
        });

        res.status(200).json({
            message: "Admin created successfully"
        });
    } catch (err) {
        res.status(500).json({
            msg: "There something error"
        });
    }
});

router.post('/signin', async (req, res) => {
    try {
        // Implement admin signup logic
        const { username, password } = req.body;

        const admin = await Admin.findOne({
            username: username,
            password: password
        })

        if (!admin) {
            return res.status(404).json({
                message: "Admin doesn't exist"
            });
        }

        const token = jwt.sign({ username }, secretKey);
        res.status(200).json({
            token: token
        });
    } catch (err) {
        res.status(500).json({
            msg: "There something error"
        });
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    try {
        // Implement course creation logic
        const { title, description, price, imageLink } = req.body;

        const validateCourse = z.object({
            title: z.string(),
            description: z.string(),
            price: z.number(),
            imageLink: z.string()
        });

        if (!validateCourse.safeParse({
            title,
            description,
            price,
            imageLink
        }).success) {
            return res.status(400).json({
                message: "Invalid input"
            });
        }

        const newCourse = await Course.create({
            title: title,
            description: description,
            price: price,
            imageLink: imageLink
        });

        res.status(200).json({
            message: "Course created successfully",
            courseId: newCourse._id
        });
    } catch (err) {
        res.status(500).json({
            msg: "There something error"
        });
    }
});

router.get('/courses', adminMiddleware, (req, res) => {
    try {
        // Implement fetching all courses logic
        Course.find({})
            .then((response) => {
                res.status(200).json({
                    courses: response
                });
            });
    } catch (err) {
        res.status(500).json({
            msg: "There something error"
        });
    }
});

module.exports = router;