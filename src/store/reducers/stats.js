import { GLOBAL_DATA, MAP_DATA } from '../actions/stats/types'
import { resolve_redux_state } from '../../utils'

const initialState = {
	globalCount: {},
	affectedCountries: {},
	mapLoader: true,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case GLOBAL_DATA:
			return resolve_redux_state(state, action)
		case MAP_DATA:
			return resolve_redux_state(state, action)
		default:
			return resolve_redux_state(state)
	}
}
