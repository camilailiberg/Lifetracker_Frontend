import "./SleepForm.css";
import React, { useState } from "react";
import apiClient from "../../services/apiClient";
import { useNavigate } from "react-router-dom";

function SleepForm() {
	const navigate = useNavigate();
	const [isProcessing, setIsProcessing] = useState(false);
	const [errors, setErrors] = useState({});
	const [form, setForm] = useState({
		bedTime: "",
		wakeUpTime: "",
	});

	const handleOnInputChange = (event) => {
		if (event.target.name === "wakeUpTime") {
			if (event.target.value < form.bedTime) {
				setErrors((e) => ({
					...e,
					dateError: "End time must be after start time.",
				}));
			} else {
				setErrors((e) => ({ ...e, dateError: null }));
			}
		}

		setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
	};

	const handleOnSubmit = async () => {
		setIsProcessing(true);
		setErrors((e) => ({ ...e, form: null }));

		if (form.wakeUpTime < form.bedTime) {
			setErrors((e) => ({
				...e,
				dateError: "End time must be after start time.",
			}));
			setIsProcessing(false);
			return;
		} else {
			setErrors((e) => ({ ...e, dateError: null }));
		}

		const { data, error } = await apiClient.addSleepData({
			bed_time: form.bedTime,
			wake_up_time: form.wakeUpTime,
		});

		if (error) setErrors((e) => ({ ...e, form: error }));

		setIsProcessing(false);

		navigate("/sleep/my-sleep-data");
	};

	return (
		<div>
			<div className="SleepForm">
				<div className="card">
					<h2>Add Sleep</h2>

					{errors.form && <span className="error">{errors.form}</span>}
					<br />

					<div className="form">
						<div className="input-field">
							<label htmlFor="bedTime">Start Time</label>
							<input
								type="datetime-local"
								name="bedTime"
								value={form.bedTime}
								onChange={handleOnInputChange}
							/>
						</div>

						<div className="input-field">
							<label htmlFor="wakeUpTime">End Time</label>
							<input
								type="datetime-local"
								name="wakeUpTime"
								value={form.wakeUpTime}
								onChange={handleOnInputChange}
							/>
							{errors.dateError && (
								<span className="error">{errors.dateError}</span>
							)}
						</div>

						<button
							className="btn"
							disabled={isProcessing}
							onClick={handleOnSubmit}
						>
							{isProcessing ? "Loading..." : "Save"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SleepForm;
