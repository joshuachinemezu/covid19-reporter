import {
	fetchGlobalCount,
	fetchAffectedCountriesDetailed,
	getRawData,
} from '../../../request'
import {
	GLOBAL_DATA,
	MAP_DATA,
	COUNTRY_TIME_SERIES,
	COUNTRY_DAILY,
	NIGHT_MODE,
	LAST_UPDATED,
} from './types'

/**
 * @description Action responsible for fetching global stats
 * @returns {Function}
 *
 */
export const getGlobalCount = () => async (dispatch) => {
	// dispatch(setGlobalStatsRequestLoader(true))

	return fetchGlobalCount().then(
		(response) => {
			if (response.data.data !== undefined)
				dispatch({
					type: GLOBAL_DATA,
					globalCount: response.data.data,
				})
			// dispatch(setRequestOverlayLoader(false))
		},
		(err) => {
			// dispatch(setRequestOverlayLoader(false))
			console.log(err)
		}
	)
}

/**
 * @description Action responsible for fetching affected countries
 * @returns {Function}
 *
 */
export const getAffectedCountriesDetailed = () => async (
	dispatch,
	getState
) => {
	// dispatch(setGlobalStatsRequestLoader(true))

	return fetchAffectedCountriesDetailed().then(
		(response) => {
			if (response.data.data !== undefined)
				dispatch({
					type: GLOBAL_DATA,
					affectedCountries: response.data.data,
				})
			// dispatch(setRequestOverlayLoader(false))
		},
		(err) => {
			// dispatch(setRequestOverlayLoader(false))
			console.log(err)
		}
	)
}

/**
 * @description Action responsible for changing state of map loader
 * @param payload
 * @returns {Function}
 *
 */
export const setMapLoader = (payload) => async (dispatch) => {
	dispatch({
		type: MAP_DATA,
		mapLoader: payload,
	})
}

/**
 * @description Action responsible for fetching country time series
 * @returns {Function}
 *
 */
export const getCountryTimeSeries = () => async (dispatch) => {
	const countryTimeSeries = []

	return getRawData().then(
		(response) => {
			if (response.data.data !== undefined) {
				let data = response.data.data

				let keys = Object.keys(data)
				for (let country of keys) {
					countryTimeSeries.push({ country, data: data[country] })
				}
				for (let i = 0; i < countryTimeSeries.length; i++) {
					for (let j = 0; j < countryTimeSeries[i].data.length; j++) {
						const point = countryTimeSeries[i].data[j]
						const active = point.confirmed - point.deaths - point.recovered
						point.active = active
					}
				}

				dispatch(getCountryDaily(countryTimeSeries))
				dispatch(setLastUpdated(countryTimeSeries))

				dispatch({
					type: COUNTRY_TIME_SERIES,
					countryTimeSeriesLoader: false,
					countryTimeSeries: countryTimeSeries,
				})
			}
		},
		(err) => {
			// dispatch(setRequestOverlayLoader(false))
			console.log(err)
		}
	)
}

export const getCountryDaily = (countryTimeSeries) => (dispatch) => {
	const countryDaily = []
	for (let i = 0; i < countryTimeSeries.length; i++) {
		const dailyDelta = []
		const data = countryTimeSeries[i].data
		for (let j = 1; j < data.length; j++) {
			const date = data[j].date
			const confirmed = Math.max(data[j].confirmed - data[j - 1].confirmed, 0)
			const deaths = Math.max(data[j].deaths - data[j - 1].deaths, 0)
			const recovered = Math.max(data[j].recovered - data[j - 1].recovered, 0)
			const active = Math.max(data[j].active - data[j - 1].active, 0)
			dailyDelta.push({ date, confirmed, deaths, recovered, active })
		}
		countryDaily.push({
			country: countryTimeSeries[i].country,
			data: dailyDelta,
		})
	}
	dispatch({
		type: COUNTRY_DAILY,
		countryDailyLoader: false,
		countryDaily: countryDaily,
	})
}

/**
 * @description Action responsible for setting night mode
 * @param countryTimeSeries
 * @returns {Function}
 *
 */
export const setLastUpdated = (countryTimeSeries) => async (dispatch) => {
	let lastData = countryTimeSeries[countryTimeSeries.length - 1].data
	const lastUpdated = lastData[lastData.length - 1].date

	dispatch({
		type: LAST_UPDATED,
		lastUpdated: lastUpdated,
		lastUpdatedLoader: false,
	})
}

/**
 * @description Action responsible for setting night mode
 * @param payload
 * @returns {Function}
 *
 */
export const setDarkMode = (payload) => async (dispatch) => {
	dispatch(setMapLoader(true))
	dispatch({
		type: NIGHT_MODE,
		darkMode: payload,
	})
}
