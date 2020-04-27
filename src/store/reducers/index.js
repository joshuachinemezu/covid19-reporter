//Redux
import { combineReducers } from 'redux'
import stats from './stats'

const allReducers = combineReducers({
	stats,
})

export default allReducers
