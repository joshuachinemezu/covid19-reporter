import React, { useEffect } from 'react'
// reactstrap components
import {
	Row,
	Col,
	Card,
	CardBody,
	CardTitle,
	FormGroup,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Input,
} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAffectedCountriesDetailed } from '../store/actions'
import { Loader } from '../components'
import ReactCountryFlag from 'react-country-flag'
import mulk from 'mulk'

export const AffectedCard = (props) => {
	const dispatch = useDispatch()

	const { affectedCountries } = useSelector((state) => state.stats)

	useEffect(() => {
		// Load affected countries detailed data on mount
		dispatch(getAffectedCountriesDetailed())
	}, [dispatch])

	return (
		<>
			<Card style={{ height: '100%' }}>
				<CardBody>
					<CardTitle>
						<Row>
							<Col md='7'>
								<h4>Affected Nations</h4>
							</Col>
							<Col md='5'>
								<h5 className='text-muted text-right'>Today's Statistics</h5>
							</Col>
						</Row>
					</CardTitle>
					<Row>
						<Col md='7'>
							<FormGroup>
								<InputGroup className='mb-4'>
									<InputGroupAddon addonType='prepend'>
										<InputGroupText>
											<i className='ni ni-zoom-split-in' />
										</InputGroupText>
									</InputGroupAddon>
									<Input placeholder='Search' type='text' />
								</InputGroup>
							</FormGroup>
						</Col>
						<Col md='5'>
							<FormGroup>
								<InputGroup className='mb-4'>
									{/* <Input placeholder='Birthday' type='text' /> */}
									<select className='form-control'>
										<option>Total Cases</option>
										<option>Today Cases</option>
										<option>Total Deaths</option>
										<option>Today Deaths</option>
										<option>Total Recoveries</option>
									</select>
								</InputGroup>
							</FormGroup>
						</Col>
					</Row>
					<Row style={{ height: '60vh', overflow: 'scroll' }}>
						<Col sm='12'>
							{affectedCountries.length > 0 ? (
								affectedCountries.map((data, key) => {
									let countryCode =
										mulk(data.country) !== null ? mulk(data.country).iso2 : ''
									return (
										<Card key={key} className='pl-4 mb-1 pt-2 pb-2'>
											<Row>
												<Col xs='2' className='text-center pt-4'>
													<ReactCountryFlag
														countryCode={countryCode}
														style={{
															fontSize: '2em',
															lineHeight: '2em',
														}}
														svg
													/>
												</Col>
												<Col xs='6'>
													<h5>{data.country}</h5>
													<span className='text-muted text-xs text-bold'>
														Total
													</span>
													<br />
													<span className='text-xs'>
														<span className='text-muted'>Cases:</span>{' '}
														{data.cases}
													</span>
													<br />
													<span className='text-xs'>
														<span className='text-muted'>Deaths:</span>{' '}
														{data.deaths}
													</span>
												</Col>
												<Col xs='4' className='pt-4 mt-1'>
													<span className='text-muted text-xs text-bold'>
														Today
													</span>
													<br />

													<span className='text-xs'>{data.todayCases}</span>
													<br />
													<span className='text-xs'>{data.todayDeaths}</span>
												</Col>
											</Row>
										</Card>
									)
								})
							) : (
								<Row className='text-center mt-4'>
									<Col>
										<Loader size={30} />
									</Col>
								</Row>
							)}
						</Col>
					</Row>
				</CardBody>
			</Card>
		</>
	)
}

export default AffectedCard
