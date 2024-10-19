const express = require("express");
const User = require("../models/User");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.userId).populate(
			"cart.uniformId"
		);
		res.json(user.cart);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.post("/add", authenticateToken, async (req, res) => {
	try {
		const { uniformId, quantity } = req.body;
		const user = await User.findById(req.user.userId);
		const existingItem = user.cart.find(
			(item) => item.uniformId.toString() === uniformId
		);

		if (existingItem) {
			existingItem.quantity += quantity;
		} else {
			user.cart.push({ uniformId, quantity });
		}

		await user.save();
		res.json(user.cart);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.put("/update/:uniformId", authenticateToken, async (req, res) => {
	try {
		const { quantity } = req.body;
		const user = await User.findById(req.user.userId);
		const cartItem = user.cart.find(
			(item) => item.uniformId.toString() === req.params.uniformId
		);

		if (cartItem) {
			cartItem.quantity = quantity;
			await user.save();
			res.json(user.cart);
		} else {
			res.status(404).json({ error: "Item not found in cart" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.delete("/remove/:uniformId", authenticateToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.userId);
		user.cart = user.cart.filter(
			(item) => item.uniformId.toString() !== req.params.uniformId
		);
		await user.save();
		res.json(user.cart);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
