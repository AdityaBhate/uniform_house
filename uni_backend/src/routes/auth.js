const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.post("/signup", async (req, res) => {
	try {
		const { name, email, phoneNumber, address, state, pincode, password } =
			req.body;
		const user = new User({
			name,
			email,
			phoneNumber,
			address,
			state,
			pincode,
			password,
		});
		await user.save();
		res.status(201).json({ message: "User created successfully" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user || !(await user.comparePassword(password))) {
			return res.status(401).json({ error: "Invalid credentials" });
		}
		const token = jwt.sign(
			{ userId: user._id, isAdmin: user.isAdmin },
			process.env.JWT_SECRET,
			{ expiresIn: "1d" }
		);
		res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
		res.json({ message: "Logged in successfully" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.post("/logout", (req, res) => {
	res.clearCookie("token");
	res.json({ message: "Logged out successfully" });
});

router.get("/profile", authenticateToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.userId).select("-password");
		res.json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
