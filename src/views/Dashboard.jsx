import React from 'react'
import {
	GlobalCount,
	AffectedCard,
	Loader,
	CountryTimeSeries,
	DarkModeToggle,
} from '../components'
// reactstrap components
import { Container, Row, Col } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setMapLoader } from '../store/actions'
import useDarkMode from 'use-dark-mode'

function Dashboard(props) {
	const dispatch = useDispatch()

	const { mapLoader, darkMode } = useSelector((state) => state.stats)

	let mapURL

	const nightMode = useDarkMode(darkMode)

	if (nightMode.value) mapURL = process.env.REACT_APP_MAP_VISUAL_DARK
	else mapURL = process.env.REACT_APP_MAP_VISUAL_LIGHT

	return (
		<Container className='mt-5'>
			<DarkModeToggle />
			<div className='flex-center position-ref full-height'>
				<GlobalCount />
				<Row>
					<Col md='5'>
						<AffectedCard />
					</Col>
					<Col md='7' className='country-chart'>
						<CountryTimeSeries />
					</Col>
				</Row>
				<Row className='map-row'>
					<Col md='12' className='mt-4'>
						{mapLoader && (
							<Row className='text-center mt-5 pt-5'>
								<Col>
									<Loader size={30} />
								</Col>
							</Row>
						)}
						<iframe
							title='Map'
							onLoad={(e) => {
								dispatch(setMapLoader(false))
							}}
							hidden={mapLoader}
							id='mapFrame'
							name='mapFrame'
							className='card'
							src={`${mapURL}`}
							style={{
								border: '0',
								width: '100%',
								height: '512px',
							}}
						></iframe>
					</Col>
				</Row>
			</div>
		</Container>
	)
}

export default Dashboard
