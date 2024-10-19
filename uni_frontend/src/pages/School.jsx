import DisplayCategoryCard from "./DisplayCategoryCard";
import logo1 from "../assets/school-logo/logo1.jpg";

const schools = [
	{
		image: logo1,
		name: "IPS",
	},
	{
		image: logo1,
		name: "APS",
	},
	{
		image: logo1,
		name: "DPS",
	},
	{
		image: logo1,
		name: "DAILY COLLEGE",
	},
	{
		image: logo1,
		name: "CPS",
	},
	{
		image: logo1,
		title: "PPS",
	},
];

const School = () => {
	return (
		<div>
			<div className='text-header'>
				<h1 className='bg-sky-400 py-6 text-white text-center text-xl font-bold'>
					ALL SCHOOL
				</h1>
			</div>
			<div className='grid grid-cols-4 px-20 py-10'>
				{schools.map((elem, index) => (
					<DisplayCategoryCard
						key={index}
						image={elem.image}
						title={elem.name}
					/>
				))}
			</div>
		</div>
	);
};

export default School;
