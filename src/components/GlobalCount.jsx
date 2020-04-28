import React, { useEffect } from 'react'
// reactstrap components
import { StatsCard, Loader } from '../components'
import { Row, Col } from 'reactstrap'
import { getGlobalCount } from '../store/actions'

import { useDispatch, useSelector } from 'react-redux'

export const GlobalCount = () => {
	const dispatch = useDispatch()

	const { globalCount } = useSelector((state) => state.stats)

	useEffect(() => {
		// Load global count on mount
		dispatch(getGlobalCount())
	}, [dispatch])

	return (
		<>
			<Row className='mb-4'>
				<Col md='3'>
					<StatsCard
						title={'Total Infected'}
						number={
							globalCount.confirmed ? (
								globalCount.confirmed.toLocaleString()
							) : (
								<Loader />
							)
						}
						infoTest={'Since last month'}
						icon={'fas fa-chart-bar'}
						iconColor={'bg-warning'}
					/>
				</Col>
				<Col md='3'>
					<StatsCard
						title={'Total Deaths'}
						number={
							globalCount.deaths ? (
								globalCount.deaths.toLocaleString()
							) : (
								<Loader />
							)
						}
						infoTest={'Since last month'}
						icon={'fas fa-chart-bar'}
						iconColor={'bg-danger'}
					/>
				</Col>
				<Col md='3'>
					<StatsCard
						title={'Total Recovered'}
						number={
							globalCount.recovered ? (
								globalCount.recovered.toLocaleString()
							) : (
								<Loader />
							)
						}
						infoTest={'Since last month'}
						icon={'fas fa-chart-bar'}
						iconColor={'bg-success'}
					/>
				</Col>
				<Col md='3'>
					<StatsCard
						title={'Total Active'}
						number={
							globalCount.active ? (
								globalCount.active.toLocaleString()
							) : (
								<Loader />
							)
						}
						infoTest={'Since last month'}
						icon={'fas fa-chart-bar'}
						iconColor={'bg-info'}
					/>
				</Col>
			</Row>
		</>
	)
}
