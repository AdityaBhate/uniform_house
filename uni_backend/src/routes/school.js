const express = require("express");
const School = require("../models/School");
const { authenticateToken, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const schools = await School.find();
		res.json(schools);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.post("/", authenticateToken, isAdmin, async (req, res) => {
	try {
		const { name, imageUrl, location } = req.body;
		const school = new School({ name, imageUrl, location });
		await school.save();
		res.status(201).json(school);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.put("/:id", authenticateToken, isAdmin, async (req, res) => {
	try {
		const { name, imageUrl, location } = req.body;
		const school = await School.findByIdAndUpdate(
			req.params.id,
			{ name, imageUrl, location },
			{ new: true }
		);
		res.json(school);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.delete("/:id", authenticateToken, isAdmin, async (req, res) => {
	try {
		await School.findByIdAndDelete(req.params.id);
		res.json({ message: "School deleted successfully" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
