import {
	GLOBAL_DATA,
	MAP_DATA,
	COUNTRY_TIME_SERIES,
	COUNTRY_DAILY,
	NIGHT_MODE,
	LAST_UPDATED,
} from '../actions/stats/types'
import { resolve_redux_state } from '../../utils'

const initialState = {
	globalCount: {},
	affectedCountries: {},
	mapLoader: true,
	countryTimeSeries: [],
	countryTimeSeriesLoader: true,
	countryDaily: [],
	countryDailyLoader: true,
	darkMode: false,
	lastUpdatedLoader: true,
	lastUpdated: '',
}

export default (state = initialState, action) => {
	switch (action.type) {
		case GLOBAL_DATA:
			return resolve_redux_state(state, action)
		case MAP_DATA:
			return resolve_redux_state(state, action)
		case COUNTRY_TIME_SERIES:
			return resolve_redux_state(state, action)
		case COUNTRY_DAILY:
			return resolve_redux_state(state, action)
		case NIGHT_MODE:
			return resolve_redux_state(state, action)
		case LAST_UPDATED:
			return resolve_redux_state(state, action)
		default:
			return resolve_redux_state(state)
	}
}
