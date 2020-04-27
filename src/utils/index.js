import React from 'react'
import { toast } from 'react-toastify'

export function showToastr(
	title,
	message = '',
	options = { color: 'success' }
) {
	toast(
		<p>
			{title}
			<br />
			<span className='text-bold'>{message}</span>
		</p>,
		{ type: options.color }
	)
}

/**
 * Default redux abstract generic resolver.
 *
 * @param state
 * @param action
 * @returns {{}}
 */
export function resolve_redux_state(state = null, action = null) {
	if (action && state) {
		return {
			...state,
			...action,
		}
	}

	return { ...state }
}
