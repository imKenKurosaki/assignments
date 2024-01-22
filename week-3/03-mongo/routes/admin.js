const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");
const zod = require("zod");

// Admin Routes
router.post('/signup', async (req, res) => {
    try {
        // Implement admin signup logic
        const username = req.body.username;
        const password = req.body.password;

        const validateAdmin = zod.object({
            username: zod.string().email(),
            password: zod.string().min(6).max(10)
        });

        if (!validateAdmin.safeParse({ username, password }).success) {
            return res.status(400).json({ message: "Invalid input" });
        }

        if (await Admin.findOne({ username: username })) {
            return res.status(400).json({
                message: "Admin already exist"
            });
        }

        Admin.create({ username, password }).then(() => res.status(200).json({ message: "Admin created successfully" }));
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong, try again later"
        });
    }
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    try {
        const title = req.body.title;
        const description = req.body.description;
        const price = req.body.price;
        const imageLink = req.body.imageLink;

        const validateCourse = zod.object({
            title: zod.string().min(3),
            description: zod.string().min(5),
            price: zod.number(),
            imageLink: zod.string()
        });

        if (!validateCourse.safeParse({ title, description, price, imageLink }).success) {
            return res.status(400).json({
                message: "Invalid input"
            });
        }

        Course.create(req.body).then((response) => {
            res.status(200).json({
                message: "Course created successfully",
                courseId: response._id
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong, try again later"
        });
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    try {
        // Implement fetching all courses logic
        const response = await Course.find({});
        res.status(200).json({
            courses: response
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong, try again later"
        });
    }
});

module.exports = router;