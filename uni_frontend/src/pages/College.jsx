import DisplayCategoryCard from "./DisplayCategoryCard";
import logo1 from "../assets/school-logo/logo1.jpg";

const data = [
	{
		image: logo1,
		title: "VIT",
	},
	{
		image: logo1,
		title: "IIT",
	},
	{
		image: logo1,
		title: "IIIT",
	},
	{
		image: logo1,
		title: "NIT",
	},
	{
		image: logo1,
		title: "DIT",
	},
	{
		image: logo1,
		title: "UIT",
	},
];

const College = () => {
	return (
		<div>
			<div className='text-header'>
				<h1 className='bg-sky-400 py-6 text-white text-center text-xl font-bold'>
					ALL COLLEGE
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

export default College;
