const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	phoneNumber: { type: String, required: true },
	address: { type: String, required: true },
	state: { type: String, required: true },
	pincode: { type: Number, required: true },
	password: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	isAdmin: { type: Boolean, default: false },
	cart: [
		{
			uniformId: { type: mongoose.Schema.Types.ObjectId, ref: "Uniform" },
			quantity: { type: Number, required: true, default: 1 },
		},
	],
});

userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 10);
	}
	next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
	return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
