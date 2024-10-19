import DisplayCategoryCard from "./DisplayCategoryCard";
import logo1 from "../assets/school-logo/logo1.jpg";

const data = [
	{
		image: logo1,
		title: "White Shirt",
	},
	{
		image: logo1,
		title: "Black Pant",
	},
	{
		image: logo1,
		title: "Black Shirt",
	},
	{
		image: logo1,
		title: "Blue Pant",
	},
];

const Corporate = () => {
	return (
		<div>
			<div className='text-header'>
				<h1 className='bg-sky-400 py-6 text-white text-center text-xl font-bold'>
					ALL CORPORATE UNIFORMS
				</h1>
			</div>
			<div className='grid grid-cols-4 px-20 py-10'>
				{data.map((elem, index) => (
					<DisplayCategoryCard
						key={index}
						image={elem.image}
						title={elem.title}
					/>
				))}
			</div>
		</div>
	);
};

export default Corporate;
