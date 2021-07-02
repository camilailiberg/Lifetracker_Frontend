import "./Home.css";

import React from "react";

function Home() {
	return (
		<div className="Home">
			<div className="hero">
				<img
					src="https://2rdnmg1qbg403gumla1v9i2h-wpengine.netdna-ssl.com/wp-content/uploads/sites/3/2013/09/inexpensiveExercise-1277759983-770x533-1-650x428.jpg"
					alt="hero img"
				/>
				<h1>Life Tracker</h1>
				<p>Helping you get back control of your world</p>
			</div>
			<div className="titles">
				<div className="title">
					<img src="" alt="Fitness" />
					<p>Fitness</p>
				</div>
				<div className="title">
					<img src="" alt="Food" />
					<p>Food</p>
				</div>
				<div className="title">
					<img src="" alt="Rest" />
					<p>Rest</p>
				</div>
				<div className="title">
					<img src="" alt="Planner" />
					<p>Planner</p>
				</div>
			</div>
		</div>
	);
}

export default Home;
