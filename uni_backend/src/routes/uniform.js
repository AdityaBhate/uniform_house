const express = require("express");
const Uniform = require("../models/Uniform");
const { authenticateToken, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const uniforms = await Uniform.find().populate("schoolId");
		res.json(uniforms);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.post("/", authenticateToken, isAdmin, async (req, res) => {
	try {
		const { name, price, size, color, imageUrl, schoolId } = req.body;
		const uniform = new Uniform({
			name,
			price,
			size,
			color,
			imageUrl,
			schoolId,
		});
		await uniform.save();
		res.status(201).json(uniform);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.put("/:id", authenticateToken, isAdmin, async (req, res) => {
	try {
		const { name, price, size, color, imageUrl, schoolId } = req.body;
		const uniform = await Uniform.findByIdAndUpdate(
			req.params.id,
			{ name, price, size, color, imageUrl, schoolId },
			{ new: true }
		);
		res.json(uniform);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.delete("/:id", authenticateToken, isAdmin, async (req, res) => {
	try {
		await Uniform.findByIdAndDelete(req.params.id);
		res.json({ message: "Uniform deleted successfully" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
