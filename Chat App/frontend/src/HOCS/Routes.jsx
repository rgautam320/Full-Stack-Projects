import React from "react";
import { Switch, Route } from "react-router";
import Home from "../Containers/Home";
import Error from "../Containers/Error";
import About from "../Containers/Chat";

const Routes = () => {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/chat" component={About} />
			<Route component={Error} />
		</Switch>
	);
};

export default Routes;
