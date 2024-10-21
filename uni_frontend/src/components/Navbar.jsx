import { useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../assets/logo.png";
import { useAuth } from "../utils/useAuth";

const Navbar = () => {
	const { isAuthenticated, user } = useAuth();
	const [showLoginMenu, setShowLoginMenu] = useState(false);
	const [showMobileMenu, setShowMobileMenu] = useState(false);

	const toggleLoginMenu = () => setShowLoginMenu(!showLoginMenu);
	const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

	const navLinks = [
		{ to: "/", text: "Home" },
		{ to: "/school", text: "School" },
		{ to: "/college", text: "College" },
		{ to: "/corporate", text: "Corporate" },
	];

	return (
		<nav className='bg-slate-200 shadow-2xl sticky top-0 z-50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					<div className='flex items-center'>
						<Link to='/'>
							<img className='w-36' src={logo} alt='Uniform House Logo' />
						</Link>
					</div>
					<div className='hidden md:block'>
						<div className='ml-10 flex items-baseline space-x-4'>
							{navLinks.map((link) => (
								<Link
									key={link.to}
									to={link.to}
									className='text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
									{link.text}
								</Link>
							))}
						</div>
					</div>
					<div className='hidden md:block'>
						<div className='ml-4 flex items-center md:ml-6'>
							{isAuthenticated ? (
								<>
									<p className='text-black px-3 py-2 rounded-md text-sm font-medium'>
										Hi, {user?.name}
									</p>
									<Link
										to='/cart'
										className='text-black hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium'>
										<ShoppingCartIcon />
										<span className='absolute top-2 right-16 bg-red-600 rounded-full text-white font-bold px-1 text-xs'>
											4
										</span>
									</Link>
									<Link
										to='/logout'
										className='text-black hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium'>
										<LogoutIcon />
									</Link>
								</>
							) : (
								<div className='relative'>
									<button
										onClick={toggleLoginMenu}
										className='text-black hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium'>
										<PersonIcon />
									</button>
									{showLoginMenu && (
										<div className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
											<Link
												to='/register'
												className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
												Create Account
											</Link>
											<Link
												to='/login'
												className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
												Login
											</Link>
										</div>
									)}
								</div>
							)}
						</div>
					</div>
					<div className='-mr-2 flex md:hidden'>
						<button
							onClick={toggleMobileMenu}
							className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
							<span className='sr-only'>Open main menu</span>
							{showMobileMenu ? <CloseIcon /> : <MenuIcon />}
						</button>
					</div>
				</div>
			</div>

			{showMobileMenu && (
				<div className='md:hidden'>
					<div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
						{navLinks.map((link) => (
							<Link
								key={link.to}
								to={link.to}
								className='text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
								onClick={toggleMobileMenu}>
								{link.text}
							</Link>
						))}
					</div>
					<div className='pt-4 pb-3 border-t border-gray-700'>
						<div className='flex items-center px-5'>
							{isAuthenticated ? (
								<>
									<p className='text-black px-3 py-2 rounded-md text-sm font-medium'>
										Hi, {user.firstName}
									</p>
									<Link
										to='/cart'
										className='text-black hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium'>
										<ShoppingCartIcon />
										<span className='absolute top-2 right-16 bg-red-600 rounded-full text-white font-bold px-1 text-xs'>
											4
										</span>
									</Link>
									<Link
										to='/logout'
										className='text-black hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium'>
										<LogoutIcon />
									</Link>
								</>
							) : (
								<>
									<Link
										to='/register'
										className='text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
										Create Account
									</Link>
									<Link
										to='/login'
										className='text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>
										Login
									</Link>
								</>
							)}
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
