const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Admin, Course } = require("../db");
const zod = require("zod");

// User Routes
router.post('/signup', async (req, res) => {
    try {
        // Implement user signup logic
        const username = req.body.username;
        const password = req.body.password;

        const validateUser = zod.object({
            username: zod.string().email(),
            password: zod.string().min(6).max(10)
        });

        if (!validateUser.safeParse({ username, password }).success) {
            return res.status(400).json({ message: "Invalid input" });
        }

        if (await User.findOne({ username: username }) || await Admin.findOne({ username: username })) {
            return res.status(400).json({ message: "User already exist" });
        }

        User.create(req.body).then(() => { res.status(200).json({ message: "User created successfully" }); });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong, try again later"
        });
    }
});

router.get('/courses', userMiddleware, (req, res) => {
    // Implement listing all courses logic
    try {
        Course.find({}).then((response) => {
            if (!response.length) return res.status(404).json({ message: "No courses found" });
            res.status(200).json({ courses: response });
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong, try again later"
        });
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    try {
        // Implement course purchase logic
        const username = req.headers.username;
        const courseId = req.params.courseId;

        const isCourseExist = Course.findById(courseId).exec();
        if (!isCourseExist) return res.status(404).json({ message: "Course is not found" });

        const result = await User.updateOne(
            { username: username },
            { $push: { purchasedCourse: courseId } }
        );

        res.status(200).json({
            message: "Course purchased successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong, try again later"
        });
    }
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    try {
        // Implement fetching purchased courses logic
        const username = req.headers.username;

        User.findOne({ username }).then((user) => {
            if (!user.purchasedCourse.length) return res.status(404).json({ message: "No product purchase" });

            Course.find({ _id: user.purchasedCourse })
                .then((response) => {
                    res.status(200).json({
                        courses: response
                    })
                });
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong, try again later"
        });
    }
});

module.exports = router