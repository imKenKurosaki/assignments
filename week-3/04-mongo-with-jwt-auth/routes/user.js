const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Admin, User, Course } = require("../db");
const z = require("zod");
const { JWT_SECRET } = require("../lib");
const jwt = require("jsonwebtoken");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
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
            return res.status(400).json({ message: "User already exist" });
        }

        const newUser = await User.create({
            username: username,
            password: password
        });

        res.status(200).json({
            message: "User created successfully"
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

        const user = await User.findOne({
            username: username,
            password: password
        })

        if (!user) {
            return res.status(404).json({
                message: "User doesn't exist"
            });
        }

        const token = jwt.sign({ username: username }, JWT_SECRET);
        res.status(200).json({
            token: token
        });
    } catch (err) {
        res.status(500).json({
            msg: "There something error"
        });
    }
});

router.get('/courses', userMiddleware, (req, res) => {
    try {
        // Implement listing all courses logic
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

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    try {
        // Implement course purchase logic
        const courseId = req.params.courseId;
    
        const isCourseExist = await Course.findById({ _id: courseId });
        if (!isCourseExist) {
            return res.status(404).json({
                message: "Product doesn't found"
            });
        }
    
        User.updateOne(
            { username: req.user.username },
            { $push: { purchasedCourses: courseId } })
            .then((response) => {
                res.status(200).json({
                    message: "Course purchased successfully"
                });
            })
    } catch (err) {
        res.status(500).json({
            msg: "There something error"
        });
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    try {
        // Implement fetching purchased courses logic
        const user = await User.findOne({ username: req.user.username });
        Course.find({ _id: user.purchasedCourses })
            .then((response) => {
                res.status(200).json({
                    purchasedCourses: response
                });
            });
    } catch (err) {
        res.status(500).json({
            msg: "There something error"
        });
    }
});

module.exports = router