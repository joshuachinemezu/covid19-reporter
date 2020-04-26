import React from 'react'
import { StatsCard } from '../components'
// reactstrap components
import { Container, Row, Col } from 'reactstrap'

function Dashboard() {
	return (
		<div>
			<Container className='mt-5' fluid>
				<Row>
					<Col>
						<StatsCard
							title={'Total Recovered'}
							number={'23,323'}
							percentage={3.48}
							infoTest={'Since last month'}
							icon={'fas fa-chart-bar'}
						/>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

export default Dashboard
