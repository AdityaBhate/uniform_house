import { useState } from "react";
import { Link } from "react-router-dom";
import productImage1 from "../assets/school_uniform-imagelist1.jpg";
import productImage2 from "../assets/school_uniform-imagelist1.jpg";
import productImage3 from "../assets/school_uniform-imagelist1.jpg";
import { useCart } from "../context/CartContext";

const sizes = ["XXL", "XL", "L", "M", "S"];
const colors = ["Red", "Blue", "Green", "Yellow", "Black"];
const images = [productImage1, productImage2, productImage3];

const SingleProduct = () => {
	const [selectedSize, setSelectedSize] = useState("");
	const [selectedColor, setSelectedColor] = useState("");
	const [selectedImage, setSelectedImage] = useState(0);
	const { addToCart, cartItems } = useCart();

	const handleAddToCart = () => {
		const product = {
			id: "123", // You should use a real product ID here
			name: "AV HALF SHIRT",
			price: 500,
			size: selectedSize,
			color: selectedColor,
			image: images[selectedImage],
		};
		addToCart(product);
		console.log("Product added to cart:", product);
		console.log("Updated cart items:", cartItems);
	};

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
			<nav className='mb-4'>
				<Link to='/' className='text-blue-600 hover:underline'>
					Home
				</Link>
			</nav>
			<div className='flex flex-col lg:flex-row lg:gap-10'>
				<ProductImages
					images={images}
					selectedImage={selectedImage}
					setSelectedImage={setSelectedImage}
				/>
				<ProductDetails
					selectedSize={selectedSize}
					setSelectedSize={setSelectedSize}
					selectedColor={selectedColor}
					setSelectedColor={setSelectedColor}
					handleAddToCart={handleAddToCart}
				/>
			</div>
		</div>
	);
};

const ProductImages = ({ images, selectedImage, setSelectedImage }) => (
	<div className='lg:w-1/2 mb-6 lg:mb-0'>
		<img
			className='w-full max-w-md mx-auto mb-4 rounded-lg'
			src={images[selectedImage]}
			alt={`AV Half Shirt - View ${selectedImage + 1}`}
		/>
		<div className='flex justify-center gap-4'>
			{images.map((img, index) => (
				<button
					key={index}
					className={`border-2 ${
						selectedImage === index ? "border-blue-500" : "border-gray-300"
					} p-1 rounded-md`}
					onClick={() => setSelectedImage(index)}>
					<img
						src={img}
						alt={`Thumbnail ${index + 1}`}
						className='w-16 h-16 object-cover'
					/>
				</button>
			))}
		</div>
	</div>
);

const ProductDetails = ({
	selectedSize,
	setSelectedSize,
	selectedColor,
	setSelectedColor,
	handleAddToCart,
}) => (
	<div className='lg:w-1/2'>
		<h2 className='text-2xl mb-2 font-semibold'>AV HALF SHIRT</h2>
		<p className='text-green-700 font-medium mb-3'>In Stock</p>
		<h1 className='text-3xl text-red-600 font-bold mb-4'>₹500</h1>
		<p className='text-sm mb-6'>GST : 0% (Inclusive)</p>
		<p className='text-sm mb-3'>
			-GREY STRIPES HALF SHIRT WITH DESIGNER PLACKET
		</p>
		<SizeSelector
			selectedSize={selectedSize}
			setSelectedSize={setSelectedSize}
		/>
		<ColorSelector
			selectedColor={selectedColor}
			setSelectedColor={setSelectedColor}
		/>
		<button
			className='w-full bg-black py-2 px-4 text-white rounded-lg hover:bg-gray-800 transition-colors'
			onClick={handleAddToCart}>
			Add to Cart
		</button>
	</div>
);

const SizeSelector = ({ selectedSize, setSelectedSize }) => (
	<>
		<h2 className='mb-4 text-lg font-medium'>Size:</h2>
		<div className='flex flex-wrap gap-4 mb-6'>
			{sizes.map((size) => (
				<button
					key={size}
					className={`p-2 border rounded-lg ${
						selectedSize === size
							? "bg-black text-white"
							: "bg-slate-100 border-zinc-300"
					}`}
					onClick={() => setSelectedSize(size)}>
					{size}
				</button>
			))}
		</div>
	</>
);

const ColorSelector = ({ selectedColor, setSelectedColor }) => (
	<>
		<h2 className='mb-4 text-lg font-medium'>Color:</h2>
		<div className='flex flex-wrap gap-4 mb-6'>
			{colors.map((color) => (
				<button
					key={color}
					className={`p-2 border rounded-lg w-20 h-10 flex items-center justify-center ${
						selectedColor === color ? "ring-2 ring-offset-2 ring-black" : ""
					}`}
					style={{ backgroundColor: color.toLowerCase() }}
					onClick={() => setSelectedColor(color)}>
					<span
						className={
							color === "Yellow" || color === "Green"
								? "text-black"
								: "text-white"
						}>
						{color}
					</span>
				</button>
			))}
		</div>
	</>
);

export default SingleProduct;
