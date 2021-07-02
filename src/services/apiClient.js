import axios from "axios";

class ApiClient {
	constructor(remoteHostUrl) {
		this.remoteHostUrl = remoteHostUrl;
		this.token = null;
		this.tokenName = "lifetracker_token";
	}

	setToken(token) {
		this.token = token;
		localStorage.setItem(this.tokenName, token);
	}

	async request({ endpoint, method = `GET`, data = {} }) {
		const url = `${this.remoteHostUrl}/${endpoint}`;

		const headers = {
			"Content-Type": "application/json",
		};

		// if the token exists on this instance, attach this authorization header that will mkae  sure that we're authenticated with each request.
		// this way we only need to attach the token in one plce onstead of all over the place in our application
		// if this contains a token attahced to it
		if (this.token) {
			//we will set the authorization header on the header object
			headers["Authorization"] = `Bearer ${this.token}`;
		}

		// finally, we actually do the request
		// we include a try catch block so we don't have to include a try catch block in any other plce when we do an axios request
		try {
			//first we just call axios and then pass a config object with the url, the mehod, the data, nad the headers so that we can use this same request method for all of our requests, regardell of the http method that's being used
			const res = await axios({ url, method, data, headers });

			//if all goes well, we'll return an object with a data key that contains res.data and an error key with null. We are just doing this to standarized the way that the response returned from this request method works
			return { data: res.data, error: null };
		} catch (error) {
			//if anythig goes wrong, we'll first console.log the error
			console.error({ errorResponse: error.response });
			const message = error?.response?.data?.error?.message;
			return { data: null, error: message || String(error) };
		}
	}

	async addSleepData(credentials) {
		return await this.request({
			endpoint: `sleep/create`,
			method: `POST`,
			data: credentials,
		});
	}

	async getSleepData() {
		return await this.request({
			endpoint: `sleep/my-sleep-data`,
			method: `GET`,
		});
	}

	async fetchUserFromToken() {
		return await this.request({ endpoint: `auth/me`, method: `GET` });
	}

	async signupUser(credentials) {
		return await this.request({
			endpoint: `auth/register`,
			method: `POST`,
			data: credentials,
		});
	}

	async loginUser(credentials) {
		return await this.request({
			endpoint: `auth/login`,
			method: `POST`,
			data: credentials,
		});
	}

	async logoutUser() {
		this.setToken(null);
		localStorage.setItem(this.tokenName, "");
	}
}

export default new ApiClient(
	process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:5000"
);
