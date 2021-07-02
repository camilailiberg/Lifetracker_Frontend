import "./SleepData.css";
import React from "react";
import SleepDetail from "../SleepDetail/SleepDetail";
import apiClient from "../../services/apiClient";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SleepData({ user }) {
	const [sleepInfo, setSleepInfo] = useState([]);
	const [error, setError] = useState(null);
	const [isFetching, setIsFetching] = useState(false);

	useEffect(() => {
		if (Object.keys(user).length !== 0) {
			const fetchSleepInfo = async () => {
				setIsFetching(true);

				const sleepInfo = await apiClient.getSleepData();

				if (sleepInfo) setSleepInfo(sleepInfo.data.sleepDataForUser);
				if (error) setError(error);

				setIsFetching(false);
			};

			fetchSleepInfo();
		}
		// }, [user]);
	}, [user, error]);

	// pass what I get from App to SleepDetail --> use map() to render multiple SleepDetail Components

	return (
		<div className="SleepData">
			{Object.keys(user).length === 0 ? (
				<div className="notLoggedIn">
					<h1>You need to be looged in to see this information</h1>
				</div>
			) : (
				<div>
					<h1>Sleep</h1>
					<div className="Overview">
						<div className="top">
							<h1>Overview</h1>
							<Link to="/add-sleep-data">
								<button className="addSleep">Add Sleep</button>
							</Link>
						</div>
						<div className="sleepDetail">
							{sleepInfo.map((singleSleepInfo) => (
								<SleepDetail
									singleSleepInfo={singleSleepInfo}
									key={singleSleepInfo.id}
								/>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default SleepData;
