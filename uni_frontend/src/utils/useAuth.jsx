import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		checkAuthStatus();
	}, []);

	const checkAuthStatus = async () => {
		try {
			const response = await fetch("http://localhost:3000/api/auth/profile", {
				method: "GET",
				credentials: "include",
			});
			if (response.ok) {
				const userData = await response.json();
				setUser(userData);
			} else {
				setUser(null);
			}
		} catch (error) {
			console.error("Error checking auth status:", error);
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	const login = async (email, password) => {
		try {
			const response = await fetch("http://localhost:3000/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
				credentials: "include",
			});
			if (response.ok) {
				await checkAuthStatus();
				navigate("/");
				return { success: true };
			} else {
				const errorData = await response.json();
				return { success: false, error: errorData.error || "Login failed" };
			}
		} catch (error) {
			console.error("Login error:", error);
			return { success: false, error: "An unexpected error occurred" };
		}
	};

	const logout = async () => {
		try {
			const response = await fetch("http://localhost:3000/api/auth/logout", {
				method: "POST",
				credentials: "include",
			});
			if (response.ok) {
				setUser(null);
				navigate("/login");
			} else {
				console.error("Logout failed");
			}
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	const value = {
		user,
		login,
		logout,
		isAuthenticated: !!user,
		isAdmin: user?.isAdmin || false,
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
