import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Card = ({ title, image, price, discountedPrice, productId }) => {
	const discount = discountedPrice
		? Math.round((1 - discountedPrice / price) * 100)
		: 0;

	return (
		<Link to={`/product/${productId}`} className='block w-64 flex-shrink-0'>
			<div className='card bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full'>
				<div className='relative pb-2/3'>
					<img
						className='h-full w-full object-cover object-center'
						src={image}
						alt={title}
					/>
					{discount > 0 && (
						<span className='absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded'>
							{discount}% OFF
						</span>
					)}
				</div>
				<div className='p-4'>
					<h3 className='text-lg font-semibold text-gray-800 mb-2 truncate'>
						{title}
					</h3>
					<div className='flex items-center justify-between'>
						<div>
							{discountedPrice ? (
								<>
									<span className='text-lg font-bold text-gray-900'>
										₹{discountedPrice}
									</span>
									<span className='ml-2 text-sm text-gray-500 line-through'>
										₹{price}
									</span>
								</>
							) : (
								<span className='text-lg font-bold text-gray-900'>
									₹{price}
								</span>
							)}
						</div>
						<button className='bg-black text-white font-bold py-2 px-4 transition duration-300'>
							Add to Cart
						</button>
					</div>
				</div>
			</div>
		</Link>
	);
};

Card.propTypes = {
	title: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	discountedPrice: PropTypes.number,
	productId: PropTypes.string.isRequired,
};

export default Card;
