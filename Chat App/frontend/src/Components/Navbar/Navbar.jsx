import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Logo from "../../Assets/logo.svg";

const Appbar = () => {
	return (
		<>
			<Navbar className="navbar__nav" expand="xl">
				<Container>
					<NavLink exact to="/">
						<Navbar.Brand>
							<img alt="" src={Logo} width="75" height="50" className="d-inline-block align-top" />
						</Navbar.Brand>
					</NavLink>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<NavLink exact to="/" className="navbar__link" activeClassName="navbar__active">
								Join
							</NavLink>
							<NavLink exact to="/chat" className="navbar__link" activeClassName="navbar__active">
								Chat
							</NavLink>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default Appbar;
