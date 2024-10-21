import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth.jsx";
import { toast } from "react-toastify";

const Login = () => {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const navigate = useNavigate();
	const { login } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = user;
		const result = await login(email, password);

		if (result.success) {
			toast.success("Login successful");
			setUser({ email: "", password: "" });
			navigate("/");
		} else {
			toast.error(result.error);
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
