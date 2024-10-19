import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const URL = "http://localhost:3000/api/auth/login";

const Login = () => {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const navigate = useNavigate();
	const { storeTokenInLS } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});

			const data = await response.json();

			if (response.ok) {
				toast.success("Login successful");
				setUser({ email: "", password: "" });
				storeTokenInLS(data.token);
				navigate("/");
			} else {
				toast.error(data.extraDetails || data.message);
			}
		} catch (error) {
			toast.error("Login failed");
			console.error("Error in login: ", error);
		}
	};

	const handleInput = (e) => {
		const { name, value } = e.target;
		setUser((prevUser) => ({ ...prevUser, [name]: value }));
	};

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
			<h1 className='bg-sky-400 py-6 text-white text-center text-xl font-semibold'>
				LOGIN
			</h1>
			<div className='mt-10 flex justify-center'>
				<div className='w-full max-w-md'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<InputField
							label='Email'
							name='email'
							type='email'
							value={user.email}
							onChange={handleInput}
							placeholder='Enter Email id'
						/>
						<InputField
							label='Password'
							name='password'
							type='password'
							value={user.password}
							onChange={handleInput}
							placeholder='Enter Password'
						/>
						<div className='flex flex-col items-center space-y-4'>
							<button
								type='submit'
								className='w-full bg-black px-8 py-2 rounded-lg font-bold text-white'>
								Login
							</button>
							<p className='text-zinc-600 text-center'>
								Forgot your password? |{" "}
								<Link to='/register' className='text-blue-500 hover:underline'>
									Create account
								</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

const InputField = ({ label, name, type, value, onChange, placeholder }) => (
	<div>
		<label htmlFor={name} className='block font-semibold mb-2'>
			{label}
		</label>
		<input
			type={type}
			id={name}
			name={name}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			required
			className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
		/>
	</div>
);

export default Login;
