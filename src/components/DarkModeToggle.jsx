import React from 'react'
import useDarkMode from 'use-dark-mode'

import Toggle from './Toggle'

import { useDispatch, useSelector } from 'react-redux'
import { setDarkMode } from '../store/actions'

const DarkModeToggle = () => {
	const { darkMode } = useSelector((state) => state.stats)

	const nightMode = useDarkMode(darkMode)

	const dispatch = useDispatch()

	return (
		<>
			<h5
				className='mt-1'
				onClick={() => {
					dispatch(setDarkMode(!darkMode))
					nightMode.toggle()
				}}
			>
				Switch to {nightMode.value ? 'Light' : 'Dark'} mode
			</h5>

			<div className='dark-mode-toggle mb-5'>
				<button
					type='button'
					onClick={() => {
						dispatch(setDarkMode(false))
						nightMode.disable()
					}}
				>
					☀
				</button>
				<Toggle
					checked={nightMode.value}
					onChange={() => {
						dispatch(setDarkMode(!darkMode))
						nightMode.toggle()
					}}
				/>
				<button
					type='button'
					onClick={() => {
						nightMode.enable()
						dispatch(setDarkMode(true))
					}}
				>
					☾
				</button>
			</div>
		</>
	)
}

export default DarkModeToggle
