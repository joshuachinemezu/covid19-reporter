import React from 'react'
// reactstrap components
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap'

export const StatsCard = (props) => {
	return (
		<>
			<Card className='card-stats mb-4 mb-lg-0'>
				<CardBody>
					<Row>
						<div className='col'>
							<CardTitle className='text-uppercase text-muted mb-0'>
								<small>{props.title}</small>
							</CardTitle>
							<span className='h2 font-weight-bold mb-0'>{props.number}</span>
						</div>
						<Col className='col-auto'>
							<div
								className={`icon icon-shape ${props.iconColor} text-white rounded-circle shadow`}
							>
								<i className={props.icon} />
							</div>
						</Col>
					</Row>
					<p className='mt-3 mb-0 text-muted text-sm'>
						{/* <span className='text-success mr-2'>
							<i className='fa fa-arrow-up' />
							{props.percentage}%
						</span>
						<span className='text-nowrap'>{props.infoTest}</span> */}
					</p>
				</CardBody>
			</Card>
		</>
	)
}
