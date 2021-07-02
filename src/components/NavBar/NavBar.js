import "./NavBar.css";
import React from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";

function NavBar({ user, handleLogout }) {
	return (
		<IconContext.Provider value={{ color: "#fff" }}>
			<div className="navbar">
				<div className="loginSignupLogout">
					<div className="menu-bars">
						<a href="/">
							<FaIcons.FaLemon />
						</a>
					</div>
					{Object.keys(user).length !== 0 ? (
						<>
							<span className="menu-bars">Welcome {user.user_name} !</span>
							<span className="logout" onClick={handleLogout}>
								Logout
							</span>
						</>
					) : (
						<>
							<Link to="/login" className="menu-bars">
								Login
							</Link>

							<Link to="/create-new-account" className="menu-bars">
								Sign Up
							</Link>
						</>
					)}
				</div>
				<div className="activities">
					<Link to="/activity" className="menu-bars">
						Activity
					</Link>
					<Link to="/" className="menu-bars">
						Excersise
					</Link>
					<Link to="/" className="menu-bars">
						Nutrition
					</Link>
					<Link to="/sleep/my-sleep-data" className="menu-bars">
						Sleep
					</Link>
				</div>
			</div>
		</IconContext.Provider>
	);
}

export default NavBar;
