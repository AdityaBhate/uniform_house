const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth");
const schoolRoutes = require("./routes/school");
const uniformRoutes = require("./routes/uniform");
const orderRoutes = require("./routes/order");
const cartRoutes = require("./routes/cart");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/uniforms", uniformRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
