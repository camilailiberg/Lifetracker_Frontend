import "./SleepDetail.css";
import React from "react";
import moment from "moment";

function SleepDetail({ singleSleepInfo }) {
	return (
		<div className="SleepDetail">
			<div className="date">
				<h3>{moment(singleSleepInfo.bed_time).format("MMMM Do YYYY")}</h3>
			</div>
			<div className="divTime">
				<div className="startTime">
					<h3>Start Time</h3>
					<div className="time">
						{moment(singleSleepInfo.bed_time).format("hh:mm:ss a")}
					</div>
				</div>
				<div className="endTime">
					<h3>End Time</h3>
					<div className="time">
						{moment(singleSleepInfo.wake_up_time).format("hh:mm:ss a")}
					</div>
				</div>
			</div>
			<div className="totalHours">
				<p>
					total hours:{" "}
					{moment(singleSleepInfo.wake_up_time).diff(
						moment(singleSleepInfo.bed_time),
						"hours"
					)}
				</p>
			</div>
		</div>
	);
}

export default SleepDetail;
