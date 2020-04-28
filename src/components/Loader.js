import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

export const Loader = ({ size, color }) => {
	return (
		<span>
			<ClipLoader size={size} color={color} />
		</span>
	)
}
Loader.defaultProps = {
	size: 12,
	color: '',
}
