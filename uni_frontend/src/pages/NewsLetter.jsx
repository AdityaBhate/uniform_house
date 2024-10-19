import { useState } from "react";
import lookbook from "../assets/lookbook.jpg";
import { useAuth } from "../store/auth";

const NewsLetter = () => {
	const [data, setData] = useState({
		company: "",
		email: "",
		mobile: "",
		description: "",
	});

	const [userContactData, setUserContactData] = useState(true);

	const { user } = useAuth();
	// console.log(user)
	if (userContactData && user) {
		setData({
			company: user.firstName,
			email: user.email,
			mobile: user.whatsappNumber,
			description: "",
		});
		setUserContactData(false);
	}

	const handleInput = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		// console.log(e);

		setData({
			...data,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				"http://localhost:3001/api/newsLetter/formdata",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				}
			);

			if (response.ok) {
				setData({
					company: user.firstName,
					email: user.email,
					mobile: user.whatsappNumber,
					description: "",
				});
				// const dataweget = response.json();
				// console.log(dataweget);
				alert("Message sent successfully");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='py-6 px-4 md:py-10 md:px-20 flex flex-col md:flex-row justify-around items-center gap-8 md:gap-44'>
			<div className='left w-full md:w-auto'>
				<h1 className='text-xl font-semibold pb-5 text-center md:text-left'>
					WANT YOUR SCHOOL SHOWCASED WITH US?
				</h1>
				<img
					className='w-full md:w-[520px] mx-auto md:mx-0'
					src={lookbook}
					alt='Lookbook'
				/>
			</div>
			<div className='right w-full md:w-auto'>
				<p className='bg-zinc-400 p-2 text-white font-bold text-sm mb-4'>
					Need to order uniform? We are eager to meet up and discuss your
					requirements in details.
				</p>
				<form
					onSubmit={handleSubmit}
					className='border border-zinc-300 px-3 py-3 outline-slate-400'>
					<input
						type='text'
						name='company'
						className='border border-zinc-300 outline-slate-700 px-2 w-full h-8 mb-4 md:mb-10'
						placeholder='Company/School Name*'
						value={data.company}
						onChange={handleInput}
						autoComplete='off'
					/>
					<div className='flex flex-col md:flex-row gap-4 md:gap-20'>
						<input
							type='email'
							name='email'
							className='border border-zinc-300 outline-slate-700 px-2 w-full h-8 mb-4 md:mb-10'
							placeholder='Email*'
							value={data.email}
							onChange={handleInput}
							autoComplete='off'
						/>
						<input
							type='number'
							name='mobile'
							className='border border-zinc-300 outline-slate-700 px-2 w-full h-8 mb-4 md:mb-10'
							placeholder='Mobile No.*'
							value={data.mobile}
							onChange={handleInput}
							autoComplete='off'
						/>
					</div>

					<input
						type='text'
						name='description'
						className='border border-zinc-300 outline-slate-700 px-2 w-full h-8 mb-4 md:mb-10'
						placeholder='Description'
						value={data.description}
						onChange={handleInput}
						autoComplete='off'
					/>
					<button
						type='submit'
						className='bg-black text-white px-4 py-2 mb-4 w-full md:w-auto'>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default NewsLetter;
