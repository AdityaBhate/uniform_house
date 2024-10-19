import { Link } from "react-router-dom";
import image1 from "../assets/footer/1.png";
import image2 from "../assets/footer/2.png";
import image3 from "../assets/footer/3.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
	const footerImages = [
		{ src: image1, alt: "Footer Image 1" },
		{ src: image2, alt: "Footer Image 2" },
		{ src: image3, alt: "Footer Image 3" },
	];

	const socialLinks = [
		{ icon: <FacebookIcon />, text: "Facebook", url: "#" },
		{ icon: <InstagramIcon />, text: "Instagram", url: "#" },
	];

	const quickLinks = [
		{ text: "Home", url: "/" },
		{ text: "About Us", url: "/about" },
		{ text: "Refund Policy", url: "/refund-policy" },
		{ text: "Shipping and Delivery", url: "/shipping" },
		{ text: "Contact Us", url: "/contact" },
		{ text: "Create Account", url: "/register" },
		{ text: "Login", url: "/login" },
	];

	return (
		<footer className='bg-zinc-800 text-white'>
			<div className='container mx-auto px-4 py-8'>
				<div className='flex flex-wrap justify-around items-center mb-8'>
					{footerImages.map((img, index) => (
						<img
							key={index}
							className='w-24 md:w-32 mb-4 md:mb-0'
							src={img.src}
							alt={img.alt}
						/>
					))}
				</div>

				<hr className='opacity-30 my-8' />

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
					<div>
						<h5 className='font-bold mb-4'>WHO WE ARE ?</h5>
						<p className='text-sm'>
							<span className='font-bold'>THE UNIFORM HOUSE</span> is the
							exclusive uniform retails online & offline store powered by
							Bhansali retails (Based In Raipur(C.G.)) which has astounding
							experience of over 35 years in the field of apparel retails and
							distribution. BHANSALI RETAILS owns chain of retails stores
							distribution of top apparel brands and active as distribution
							house for &quot;ADON&quot; a product of Indian oil corporation
							limited. We have state of art machinery and best in class facility
							to work towards our Motto to portray the right image of your
							brand, with our Uniforms.
						</p>
					</div>

					<div>
						<h5 className='font-bold mb-4'>Follow Us</h5>
						{socialLinks.map((link, index) => (
							<a
								key={index}
								href={link.url}
								className='mb-3 text-sm bg-zinc-500 px-4 py-2 flex items-center gap-2 hover:bg-zinc-600 transition-colors'>
								{link.icon}
								{link.text}
							</a>
						))}
					</div>

					<div>
						<h5 className='font-bold mb-4'>Quick Links</h5>
						<ul className='space-y-2'>
							{quickLinks.map((link, index) => (
								<li key={index}>
									<Link to={link.url} className='hover:underline'>
										{link.text}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h5 className='font-bold mb-4'>Address</h5>
						<p className='mb-2'>
							23, Surana Market, Beside City Center Mall Pandri, RAIPUR -
							492001(C.G.)
						</p>
						<p className='mb-2'>+91 771 4268760, 4268761</p>
						<p>info@theuniformhouse.in</p>
					</div>
				</div>
			</div>

			<div className='bg-black py-4 text-center text-sm'>
				<p>
					Privacy Policy. © {new Date().getFullYear()}. All Rights Reserved By
					Coders 💻
				</p>
			</div>
		</footer>
	);
};

export default Footer;
