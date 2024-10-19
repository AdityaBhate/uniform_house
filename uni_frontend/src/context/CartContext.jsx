import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		console.log("Cart items updated:", cartItems);
	}, [cartItems]);

	const addToCart = (product) => {
		setCartItems((prevItems) => {
			const existingItem = prevItems.find((item) => item.id === product.id);
			if (existingItem) {
				const updatedItems = prevItems.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
				console.log("Updated cart items (existing product):", updatedItems);
				return updatedItems;
			}
			const newItems = [...prevItems, { ...product, quantity: 1 }];
			console.log("Updated cart items (new product):", newItems);
			return newItems;
		});
	};

	const removeFromCart = (id) => {
		setCartItems((prevItems) => {
			const updatedItems = prevItems.filter((item) => item.id !== id);
			console.log("Updated cart items (after removal):", updatedItems);
			return updatedItems;
		});
	};

	const updateQuantity = (id, quantity) => {
		setCartItems((prevItems) => {
			const updatedItems = prevItems.map((item) =>
				item.id === id ? { ...item, quantity: parseInt(quantity) } : item
			);
			console.log("Updated cart items (quantity change):", updatedItems);
			return updatedItems;
		});
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
