import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./utils/useAuth"; // Update this path
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import School from "./pages/School";
import College from "./pages/College";
import Corporate from "./pages/Corporate";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Cart from "./pages/Cart";
import Error from "./pages/Error";

const App = () => {
	return (
		<AuthProvider>
			<CartProvider>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/school' element={<School />} />
					<Route path='/college' element={<College />} />
					<Route path='/corporate' element={<Corporate />} />
					<Route path='/products' element={<Products />} />
					<Route path='/product/:id' element={<SingleProduct />} />
					<Route path='/school/products/:schoolname' element={<Products />} />
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
					<Route path='/logout' element={<Logout />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='*' element={<Error />} />
				</Routes>
				<Footer />
			</CartProvider>
		</AuthProvider>
	);
};

export default App;
