import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../utils/useAuth"; // Import useAuth to get the authenticated user

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);
	const { user } = useAuth(); // Get the authenticated user

	useEffect(() => {
		if (user) {
			fetchCartItems();
		}
	}, [user]);

	const fetchCartItems = async () => {
		try {
			const response = await fetch("http://localhost:3000/api/cart", {
				method: "GET",
				credentials: "include",
			});
			if (response.ok) {
				const data = await response.json();
				setCartItems(data);
			} else {
				console.error("Failed to fetch cart items");
			}
		} catch (error) {
			console.error("Error fetching cart items:", error);
		}
	};

	const addToCart = async (product) => {
		try {
			const response = await fetch("http://localhost:3000/api/cart/add", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ uniformId: product.id, quantity: 1 }),
				credentials: "include", // Ensure credentials are included
			});
			if (response.ok) {
				const updatedCart = await response.json();
				setCartItems(updatedCart);
			} else {
				console.error("Failed to add item to cart");
			}
		} catch (error) {
			console.error("Error adding item to cart:", error);
		}
	};

	const removeFromCart = async (id) => {
		try {
			const response = await fetch(
				`http://localhost:3000/api/cart/remove/${id}`,
				{
					method: "DELETE",
					credentials: "include", // Include credentials
				}
			);
			if (response.ok) {
				const updatedCart = await response.json();
				setCartItems(updatedCart);
			} else {
				console.error("Failed to remove item from cart");
			}
		} catch (error) {
			console.error("Error removing item from cart:", error);
		}
	};

	const updateQuantity = async (id, quantity) => {
		try {
			const response = await fetch(
				`http://localhost:3000/api/cart/update/${id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ quantity: parseInt(quantity) }),
					credentials: "include",
				}
			);
			if (response.ok) {
				const updatedCart = await response.json();
				setCartItems(updatedCart);
			} else {
				console.error("Failed to update item quantity");
			}
		} catch (error) {
			console.error("Error updating item quantity:", error);
		}
	};

	return (
		<CartContext.Provider
			value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
			{children}
		</CartContext.Provider>
	);
};

CartProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
