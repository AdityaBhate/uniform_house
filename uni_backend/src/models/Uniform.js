const mongoose = require("mongoose");

const uniformSchema = new mongoose.Schema({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	size: { type: String, required: true },
	color: { type: String, required: true },
	imageUrl: { type: String },
	createdAt: { type: Date, default: Date.now },
	schoolId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "School",
		required: true,
	},
});

module.exports = mongoose.model("Uniform", uniformSchema);
