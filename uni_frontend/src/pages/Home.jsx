import hero from "../assets/hero_image.jpg";
import sideImage1 from "../assets/school_uniform1.jpg";
import sideImage2 from "../assets/school_uniform2.jpg";
import Card from "../components/Card";
import Parallax from "./Parallax";
import NewsLetter from "./NewsLetter";
import schoolUniform from "../assets/school_uniform-imagelist1.jpg";

const Home = () => {
	return (
		<>
			<div className='flex flex-col md:flex-row items-start justify-between py-2 px-6'>
				<div className='left w-full md:w-auto'>
					<img
						className='w-full md:max-w-full md:h-[700px] object-cover'
						src={hero}
						alt='Hero'
					/>
				</div>
				<div className='right flex md:flex-col mt-4 md:mt-0'>
					<img
						className='w-1/2 md:w-96 p-2'
						src={sideImage1}
						alt='Side Image 1'
					/>
					<img
						className='w-1/2 md:w-96 p-2'
						src={sideImage2}
						alt='Side Image 2'
					/>
				</div>
			</div>
			<div className='text-center font-semibold text-3xl py-8 px-6'>
				<h1>School Uniform</h1>
			</div>
			<div className='overflow-x-auto'>
				<div className='flex flex-wrap items-center justify-center gap-4 px-6 pb-4 min-w-max'>
					<Card
						title='School Uniform Set'
						image={schoolUniform}
						price={1000}
						discountedPrice={850}
						productId='123456'
					/>
					<Card
						title='School Uniform Set'
						image={schoolUniform}
						price={1000}
						discountedPrice={850}
						productId='123457'
					/>
					<Card
						title='School Uniform Set'
						image={schoolUniform}
						price={1000}
						discountedPrice={850}
						productId='123458'
					/>
					<Card
						title='School Uniform Set'
						image={schoolUniform}
						price={1000}
						discountedPrice={850}
						productId='123459'
					/>
					<Card
						title='School Uniform Set'
						image={schoolUniform}
						price={1000}
						discountedPrice={850}
						productId='123460'
					/>
				</div>
			</div>
			<div className='text-center font-semibold text-3xl py-8 px-6'>
				<h1>College Uniform</h1>
			</div>
			<div className='overflow-x-auto'>
				<div className='flex flex-wrap items-center justify-center gap-4 px-6 pb-4 min-w-max'>
					<Card
						title='College Uniform Set'
						image={schoolUniform}
						price={1000}
						discountedPrice={850}
						productId='223456'
					/>
					<Card
						title='College Uniform Set'
						image={schoolUniform}
						price={1000}
						discountedPrice={850}
						productId='223457'
					/>
					<Card
						title='College Uniform Set'
						image={schoolUniform}
						price={1000}
						discountedPrice={850}
						productId='223458'
					/>
					<Card
						title='College Uniform Set'
						image={schoolUniform}
						price={1000}
						discountedPrice={850}
						productId='223459'
					/>
					<Card
						title='College Uniform Set'
						image={schoolUniform}
						price={1000}
						discountedPrice={850}
						productId='223460'
					/>
				</div>
			</div>

			<div className='py-5'>
				<Parallax />
				<NewsLetter />
			</div>
		</>
	);
};

export default Home;
