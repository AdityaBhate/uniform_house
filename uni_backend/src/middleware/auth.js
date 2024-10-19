const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
	const token = req.cookies.token;
	if (!token) return res.status(401).json({ error: "Authentication required" });

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) return res.status(403).json({ error: "Invalid or expired token" });
		req.user = user;
		next();
	});
};

const isAdmin = (req, res, next) => {
	if (!req.user.isAdmin)
		return res.status(403).json({ error: "Admin access required" });
	next();
};

module.exports = { authenticateToken, isAdmin };
