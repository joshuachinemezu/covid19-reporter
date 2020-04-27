import React from 'react'
import { StatsCard, AffectedCard } from '../components'
// reactstrap components
import { Container, Row, Col } from 'reactstrap'

function Dashboard() {
	return (
		<div>
			<Container className='mt-5 align-content-center'>
				<Row className='mb-4'>
					<Col md='4'>
						<StatsCard
							title={'Total Recovered'}
							number={'23,323'}
							percentage={3.48}
							infoTest={'Since last month'}
							icon={'fas fa-chart-bar'}
						/>
					</Col>
					<Col md='4'>
						<StatsCard
							title={'Total Recovered'}
							number={'1,023'}
							percentage={3.48}
							infoTest={'Since last month'}
							icon={'fas fa-chart-bar'}
						/>
					</Col>
					<Col md='4'>
						<StatsCard
							title={'Total Recovered'}
							number={'3,323'}
							percentage={3.48}
							infoTest={'Since last month'}
							icon={'fas fa-chart-bar'}
						/>
					</Col>
				</Row>
				<Row>
					<Col md='5'>
						<AffectedCard />
					</Col>
					<Col md='7'></Col>
				</Row>
			</Container>
		</div>
	)
}

export default Dashboard
