import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [user, setUser] = useState("");
	const [schools, setSchools] = useState([]);
	const authorizationToken = `Bearer ${token}`;

	const storeTokenInLS = (serverToken) => {
		setToken(serverToken);
		return localStorage.setItem("token", serverToken);
	};

	const isLoggedIn = !!token;

	// logout functionality
	const LogoutUser = () => {
		setToken("");
		localStorage.removeItem("token");
	};

	//JWT Authentication - to get current user data
	const userAuthentication = async () => {
		try {
			const response = await fetch("http://localhost:3001/api/auth/user", {
				method: "GET",
				headers: {
					Authorization: authorizationToken,
				},
			});

			if (response.ok) {
				const data = await response.json();
				// console.log(data)
				setUser(data);
			} else {
				console.error("Error getting user data. Status:", response.status);
				const errorData = await response.json(); // If there is more error information in the response body
				console.error("Error data:", errorData);
			}
		} catch (error) {
			console.error("Error getting user data:", error);
		}
	};

	// to fetch schools from the server
	const getSchools = async (req, res) => {
		try {
			const response = await fetch("http://localhost:3001/api/data/school", {
				method: "GET",
			});

			if (response.ok) {
				const data = await response.json();
				setSchools(data);
			}
		} catch (error) {
			console.log("Schools frontend error: " + error);
		}
	};

	useEffect(() => {
		getSchools();
		userAuthentication();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				storeTokenInLS,
				LogoutUser,
				user,
				schools,
				authorizationToken,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const authContext = useContext(AuthContext);

	if (!authContext) {
		throw new Error("useAuth used outside of the provider");
	}

	return authContext;
};
