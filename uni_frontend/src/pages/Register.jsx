import { useState } from "react";
import sideImage from "../assets/side_image1.jpg";
import sideImage2 from "../assets/school_uniform1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { indianStates } from "../utils/constants";

const URL = "http://localhost:3000/api/auth/signup";

const Register = () => {
	const [user, setUser] = useState({
		name: "",
		email: "",
		phoneNumber: "",
		address: "",
		state: "",
		pincode: "",
		password: "",
		confirmPassword: "",
	});

	const navigate = useNavigate();

	const handleInput = (e) => {
		const { name, value } = e.target;
		setUser((prevUser) => ({ ...prevUser, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (user.password !== user.confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}
		try {
			const response = await fetch(URL, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: user.name,
					email: user.email,
					phoneNumber: user.phoneNumber,
					address: user.address,
					state: user.state,
					pincode: user.pincode,
					password: user.password,
				}),
			});

			const res_data = await response.json();

			if (response.ok) {
				setUser({
					name: "",
					email: "",
					phoneNumber: "",
					address: "",
					state: "",
					pincode: "",
					password: "",
					confirmPassword: "",
				});
				toast.success("Registration successful");
				navigate("/login");
			} else {
				toast.error(res_data.error || "Registration failed");
			}
		} catch (error) {
			console.error("Error in register:", error);
			toast.error("An error occurred during registration");
		}
	};

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
			<h1 className='bg-sky-400 py-6 text-white text-center text-xl font-semibold'>
				REGISTRATION
			</h1>
			<div className='mt-10 flex flex-col lg:flex-row'>
				<div className='w-full lg:w-2/3 lg:pr-8'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<section>
							<h2 className='text-sky-600 font-semibold text-lg mb-4'>
								Personal Details
							</h2>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<InputField
									label='Full Name'
									name='name'
									value={user.name}
									onChange={handleInput}
								/>
								<InputField
									label='Email'
									name='email'
									type='email'
									value={user.email}
									onChange={handleInput}
								/>
								<InputField
									label='Phone Number'
									name='phoneNumber'
									value={user.phoneNumber}
									onChange={handleInput}
								/>
								<InputField
									label='Password'
									name='password'
									type='password'
									value={user.password}
									onChange={handleInput}
								/>
								<InputField
									label='Confirm Password'
									name='confirmPassword'
									type='password'
									value={user.confirmPassword}
									onChange={handleInput}
								/>
							</div>
						</section>

						<section>
							<h2 className='text-sky-600 font-semibold text-lg mb-4'>
								Address
							</h2>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<SelectField
									label='State'
									name='state'
									value={user.state}
									onChange={handleInput}
									options={indianStates}
								/>
								<InputField
									label='Pin Code'
									name='pincode'
									value={user.pincode}
									onChange={handleInput}
								/>
							</div>
							<div className='mt-6'>
								<label className='block font-semibold mb-2'>Address</label>
								<textarea
									name='address'
									rows='4'
									className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
									value={user.address}
									onChange={handleInput}
									required
								/>
							</div>
						</section>

						<div className='flex flex-col sm:flex-row items-center gap-4'>
							<button
								type='submit'
								className='w-full sm:w-auto bg-black px-8 py-2 font-bold text-white rounded-md'>
								Register
							</button>
							<p className='text-lg'>Or</p>
							<Link to='/login' className='w-full sm:w-auto'>
								<button className='w-full bg-black px-8 py-2 font-bold text-white rounded-md'>
									Login
								</button>
							</Link>
						</div>
					</form>
				</div>

				<div className='w-full lg:w-1/3 mt-8 lg:mt-0'>
					<img
						className='w-full mb-8 rounded-md'
						src={sideImage}
						alt='Side Image 1'
					/>
					<img
						className='w-full rounded-md'
						src={sideImage2}
						alt='Side Image 2'
					/>
				</div>
			</div>
		</div>
	);
};

const InputField = ({ label, name, type = "text", value, onChange }) => (
	<label className='block'>
		<span className='font-semibold'>{label}</span>
		<input
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			className='mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
			required
		/>
	</label>
);

const SelectField = ({ label, name, value, onChange, options }) => (
	<label className='block'>
		<span className='font-semibold'>{label}</span>
		<select
			name={name}
			value={value}
			onChange={onChange}
			className='mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
			required>
			<option value=''>Select a State</option>
			{options.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
	</label>
);

export default Register;
