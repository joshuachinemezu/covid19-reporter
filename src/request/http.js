import axios from 'axios'
import { showToastr } from '../utils'

// This is the base URL where requests comes from
const http = axios.create({
	baseURL: process.env.REACT_APP_APP_URL,
	withCredentials: false,
	timeout: 90000,
	headers: {
		'Content-Type': 'application/json',
	},
})

/*
 * The interceptor here ensures that we check for the token in the cookie every time an http request is made
 */
http.interceptors.request.use(
	(config) => {
		// let token = getToken()
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

// Add a response interceptor
http.interceptors.response.use(
	function (response) {
		// Do something with response data
		return response
	},
	function (error) {
		if (!error.response) {
			// Server downtime or server not available
			stopLoaders()
			showToastr('Network Error', '', {
				color: 'warning',
			})
			return Promise.reject(error)
		}
		switch (error.response.status) {
			case 401:
				// Initiate Logout
				// return refreshToken()
				httpLogout()
				return Promise.reject(error)
			case 404:
				stopLoaders()
				return showToastr('Resource not Found', '', {
					color: 'warning',
				})
			case 422:
				return Promise.reject(error)
			case 429:
				// Throttle error
				stopLoaders()
				showToastr('Please wait for a moment before you try again', '', {
					color: 'warning',
				})
				httpLogout()
				return Promise.reject(error)

			default:
				break
		}
		return Promise.reject(error)
	}
)

const stopLoaders = () => {
	console.log('Stopping Loaders')
}

export const httpLogout = () => {
	showToastr('Authentication Failed', '', {
		color: 'warning',
	})
	localStorage.clear()
	stopLoaders()
	// Send to login screen
	window.location.href = '/'
}

export default http
