import React from "react";
import Form from "../Components/Form/Form";
import { Helmet } from "react-helmet";

const Home = () => {
	return (
		<>
			<Helmet>
				<title>Awesome Chat App - Home</title>
				<meta name="description" content="Awesome Chat App - Home Page" />
			</Helmet>
			<div className="container">
				<div className="home__home">
					<Form />
				</div>
			</div>
		</>
	);
};

export default Home;
