import banner from "../assets/parallax_banner.jpg";

const Parallax = () => {
	return (
		<div
			className='relative bg-cover bg-center py-10 px-4 md:px-32'
			style={{ backgroundImage: `url(${banner})` }}>
			<div className='text-black'>
				<h1 className='text-2xl md:text-3xl font-bold pb-6 md:pb-10'>
					THE UNIFORM HOUSE
				</h1>
				<p className='w-full md:w-1/2 pb-6 md:pb-10 text-sm md:text-base'>
					THE UNIFORM HOUSE has a niche in providing bespoke, modern and
					comfortable uniforms for all fields. With over 25 years of experience
					and a team to match all kinds of challenges, our aim is to modernize
					the customer experience and provide satisfaction. We have
					state-of-the-art machinery and best-in-class facilities to work
					towards our motto of portraying the right image of your brand with our
					uniforms.
				</p>
			</div>
		</div>
	);
};

export default Parallax;
