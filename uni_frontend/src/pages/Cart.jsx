import { Link } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import { useCart } from "../context/CartContext";

const optionValues = Array.from({ length: 10 }, (_, i) => i + 1);

const Cart = () => {
	const { cartItems, removeFromCart, updateQuantity } = useCart();

	console.log("Cart items in Cart component:", cartItems);

	const subtotal = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);
	const gst = 0;
	const netAmount = subtotal + gst;

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
			<h1 className='bg-orange-200 py-6 text-black text-center text-xl font-bold mb-8'>
				Your Cart
			</h1>

			{cartItems.length === 0 ? (
				<EmptyCart />
			) : (
				<div className='flex flex-col lg:flex-row lg:justify-between'>
					<CartItems
						items={cartItems}
						updateQuantity={updateQuantity}
						removeItem={removeFromCart}
					/>
					<CartSummary subtotal={subtotal} gst={gst} netAmount={netAmount} />
				</div>
			)}
		</div>
	);
};

const EmptyCart = () => (
	<div className='text-center mt-10 mb-10'>
		<h1 className='text-3xl font-semibold mb-8'>Your Shopping cart is Empty</h1>
		<Link to='/'>
			<button className='bg-black text-white py-2 px-7 uppercase'>
				Continue Shopping
			</button>
		</Link>
	</div>
);

const CartItems = ({ items, updateQuantity, removeItem }) => (
	<div className='lg:w-2/3 mb-8 lg:mb-0'>
		<div className='overflow-x-auto'>
			<table className='w-full'>
				<thead>
					<tr className='bg-zinc-300'>
						<th className='py-2 px-4 text-left'>PRODUCT</th>
						<th className='py-2 px-4 text-right'>PRICE</th>
						<th className='py-2 px-4 text-center'>QUANTITY</th>
						<th className='py-2 px-4 text-right'>TOTAL</th>
						<th className='py-2 px-4'></th>
					</tr>
				</thead>
				<tbody>
					{items.map((item) => (
						<CartItem
							key={item.id}
							item={item}
							updateQuantity={updateQuantity}
							removeItem={removeItem}
						/>
					))}
				</tbody>
			</table>
		</div>
	</div>
);

const CartItem = ({ item, updateQuantity, removeItem }) => (
	<tr className='border-b'>
		<td className='py-4 px-4'>
			<div className='flex items-center'>
				<img className='w-20 h-auto mr-4' src={item.image} alt={item.name} />
				<div className='text-sm'>
					<p className='font-semibold'>{item.name}</p>
					<p>Size: {item.size}</p>
					<p>Color: {item.color}</p>
				</div>
			</div>
		</td>
		<td className='py-4 px-4 text-right'>₹{item.price.toFixed(2)}</td>
		<td className='py-4 px-4 text-center'>
			<select
				className='border border-black outline-none p-1'
				value={item.quantity}
				onChange={(e) => updateQuantity(item.id, e.target.value)}>
				{optionValues.map((value) => (
					<option key={value} value={value}>
						{value}
					</option>
				))}
			</select>
		</td>
		<td className='py-4 px-4 text-right'>
			₹{(item.price * item.quantity).toFixed(2)}
		</td>
		<td className='py-4 px-4 text-center'>
			<button onClick={() => removeItem(item.id)} className='text-red-600'>
				<CancelIcon />
			</button>
		</td>
	</tr>
);

const CartSummary = ({ subtotal, gst, netAmount }) => (
	<div className='lg:w-1/3 border border-zinc-300 p-4'>
		<h2 className='text-xl font-bold mb-4'>Order Summary</h2>
		<div className='flex justify-between font-bold mb-2'>
			<span>Subtotal</span>
			<span>₹{subtotal.toFixed(2)}</span>
		</div>
		<div className='flex justify-between font-bold mb-2'>
			<span>GST</span>
			<span>₹{gst.toFixed(2)}</span>
		</div>
		<div className='flex justify-between font-bold mb-4'>
			<span>Net Amount</span>
			<span>₹{netAmount.toFixed(2)}</span>
		</div>
		<p className='text-sm text-zinc-500 italic mb-4'>
			Shipping & taxes calculated at checkout
		</p>
		<label className='flex items-center mb-4'>
			<input
				type='checkbox'
				className='form-checkbox h-4 w-4 text-indigo-600'
			/>
			<span className='ml-2 text-sm text-gray-700'>
				I agree to the terms and conditions
			</span>
		</label>
		<button className='w-full py-2 bg-black text-white'>CHECKOUT</button>
	</div>
);

export default Cart;
