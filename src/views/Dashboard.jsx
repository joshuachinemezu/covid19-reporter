import React from 'react'
import {
	GlobalCount,
	AffectedCard,
	Loader,
	CountryTimeSeries,
} from '../components'
// reactstrap components
import { Container, Row, Col } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setMapLoader } from '../store/actions'

function Dashboard(props) {
	const dispatch = useDispatch()

	const { mapLoader } = useSelector((state) => state.stats)

	return (
		<div>
			<Container className='mt-5'>
				<GlobalCount />
				<Row>
					<Col md='5'>
						<AffectedCard />
					</Col>
					<Col md='7' className='bg-white'>
						<CountryTimeSeries />
					</Col>
				</Row>
				<Row>
					<Col md='12' className='bg-white mt-4'>
						{mapLoader && (
							<Row className='text-center mt-5 pt-5'>
								<Col>
									<Loader size={30} />
								</Col>
							</Row>
						)}
						<iframe
							title='Map'
							onLoad={() => dispatch(setMapLoader(false))}
							src={`${process.env.REACT_APP_MAP_VISUAL}`}
							style={{ border: '0', width: '100%', height: '512px' }}
						></iframe>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

export default Dashboard
