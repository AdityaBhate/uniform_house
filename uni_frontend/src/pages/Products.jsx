import { useState, useEffect } from "react";
import b1 from "../assets/banners/b1.jpg";
import sideimage from "../assets/side_image1.jpg";
import Card from "../components/Card";

const Products = () => {
	const backgroundStyle = {
		backgroundImage: `url(${b1})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundrepeat: "no-repeat",
	};

	const [products, setProducts] = useState([]);

	const getProduct = async () => {
		try {
			const response = await fetch("http://localhost:3001/api/product/");
			const productList = await response.json();
			// console.log(productList)
			setProducts(productList);
			console.log(products);
		} catch (error) {
			console.log("Error in fetching products" + error);
		}
	};

	useEffect(() => {
		getProduct();
	}, []);

	return (
		<div>
			<div style={backgroundStyle}>
				<h1 className='text-3xl p-32 text-white text-center'>Our Products</h1>
			</div>

			<div className='text-section p-10'>
				<h1 className='text-xl text-center pb-3'>
					{products.length > 0 ? products[0].categoryName : ""}
				</h1>
				<hr className='opacity-50 border-t-stone-900' />
			</div>
			<div className='flex'>
				<div className='left p-10 w-1/4'>
					{/* <div className="text">

            </div> */}
					<div className='img'>
						<img src={sideimage} alt='' />
					</div>
				</div>
				<div className='right'>
					<div className='card-section flex gap-6 justify-center pb-20 flex-wrap'>
						{products?.map((elem, index) => (
							<Card key={index} name={elem.name} price={elem.price} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Products;
