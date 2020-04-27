import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './assets/vendor/nucleo/css/nucleo.css'
import './assets/scss/argon.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'
import store from './store'

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
		,
	</React.StrictMode>,
	document.getElementById('root')
)

serviceWorker.unregister()
