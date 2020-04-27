import {
	fetchGlobalCount,
	fetchAffectedCountriesDetailed,
} from '../../../request'
import { GLOBAL_DATA, MAP_DATA } from './types'

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
 * @description Action responsible for fetching global stats
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
 * @description Action responsible for filtering date change
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
