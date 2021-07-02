import "./Activity.css";
import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

function Activity({ user, sleepInfo }) {
	let avergaeSleep = 0;
	let totalHourSleep = 0;

	sleepInfo.forEach((element) => {
		let adding = moment(element.wake_up_time).diff(
			moment(element.bed_time),
			"hours"
		);
		totalHourSleep = totalHourSleep + adding;
	});
	if (sleepInfo.length > 0) {
		avergaeSleep = (totalHourSleep / sleepInfo.length).toFixed(2);
	}

	return (
		<div className="Activity">
			{Object.keys(user).length === 0 ? (
				<h1 className="notLoggedin">
					You need to be logged in to see this information
				</h1>
			) : (
				<div className="content">
					<div className="topPart">
						<h1>Activity Feed</h1>
						<div className="addButtons">
							<Link to="/add-sleep-data">
								<button className="addSleep">Add Sleep</button>
							</Link>
						</div>
					</div>
					<div className="activityFeedInfo">
						<div className="avgSleepHours">
							<h3>Average Sleep Hours</h3>
							<h1 className="avgSleepNumber">{avergaeSleep}</h1>
						</div>
					</div>
					<div className="bottomContent">
						<h2>More Stats</h2>
					</div>
					<div className="statsContent">
						<div className="statsContentInfo">
							<h3>Total Hours Slept</h3>
							<h3 className="statsNumber">{totalHourSleep}</h3>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Activity;
