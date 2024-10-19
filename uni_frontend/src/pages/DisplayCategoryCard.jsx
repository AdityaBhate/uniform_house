import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const DisplayCategoryCard = ({ image, title }) => {
	return (
		<Link to='/products'>
			<div className='card flex flex-col items-center gap-2 shadow-lg p-4 w-80'>
				<img src={image} alt='' />
				<div>
					<p className='text-lg'>{title}</p>
				</div>
			</div>
		</Link>
	);
};
DisplayCategoryCard.propTypes = {
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};
export default DisplayCategoryCard;
