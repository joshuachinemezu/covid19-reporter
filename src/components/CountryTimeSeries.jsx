import React, { useState, useEffect } from 'react'

import {
	LineChart,
	BarChart,
	Bar,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts'
import { Row, Col } from 'reactstrap'

import * as d3f from 'd3-format'
import { useDispatch, useSelector } from 'react-redux'
import { getCountryTimeSeries } from '../store/actions'
import { Loader } from '.'

export const CountryTimeSeries = (props) => {
	// Set Default Country to Uninted States
	const [country, setCountry] = useState(156)
	// Set to load confirmed data by default
	const [type, setType] = useState('confirmed')

	const dispatch = useDispatch()

	// Load countryTime series and daily data of countries and their loaders
	const {
		countryTimeSeries,
		countryTimeSeriesLoader,
		countryDailyLoader,
		countryDaily,
	} = useSelector((state) => state.stats)

	useEffect(() => {
		// Load global count on mount
		dispatch(getCountryTimeSeries())
	}, [dispatch])

	// Color Scheme for chart stroke and fill
	const colorMap = {
		confirmed: '#8884d8',
		active: '#8884d8',
		recovered: '#82ca9d',
		deaths: '#ff7300',
	}

	// Different status of the statistics
	const types = [
		{
			text: 'Confirmed',
			tabKey: 'confirmed',
		},
		{
			text: 'Active',
			tabKey: 'active',
		},
		{
			text: 'Deaths',
			tabKey: 'deaths',
		},
		{
			text: 'Recovered',
			tabKey: 'recovered',
		},
	]

	// Handle country change
	const handleCountryChange = (e) => {
		setCountry(e.target.value)
	}

	// Render options of different countries
	const renderCountryOptions = () => {
		return countryTimeSeries.map((value, index) => {
			return (
				<option value={index} selected={index === country}>
					{value.country}
				</option>
			)
		})
	}

	// Render options of the different statuses
	const renderTypesOptions = () => {
		return types.map((value) => {
			return (
				<option value={value.tabKey} selected={value.tabKey === type}>
					{value.text}
				</option>
			)
		})
	}

	return (
		<>
			<Row className='m-2 mt-4 mb-5'>
				<Col>
					<select className='form-control' onChange={handleCountryChange}>
						{countryTimeSeriesLoader ? (
							<option>Loading...</option>
						) : (
							renderCountryOptions()
						)}
					</select>
				</Col>
				<Col>
					<select
						className='form-control'
						onChange={(e) => setType(e.target.value)}
					>
						{renderTypesOptions()}
					</select>
				</Col>
			</Row>
			{countryTimeSeriesLoader ? (
				<Row className='text-center mt-5 pt-5 pb-5 mb-5'>
					<Col>
						<Loader size={30} />
					</Col>
				</Row>
			) : (
				<Row className='mt-3'>
					<ResponsiveContainer width='100%' height={200}>
						<LineChart
							data={countryTimeSeries[country].data}
							margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
						>
							<XAxis dataKey='date' tickFormatter={(v) => v.substring(5)} />
							<YAxis tickFormatter={(v) => d3f.format('.2s')(v)} />
							<CartesianGrid strokeDasharray='3 3' />
							<Tooltip />
							<Line
								type='monotone'
								dataKey={type}
								stroke={colorMap[type]}
								strokeWidth={2}
								dot={false}
								fillOpacity={0}
								activeDot={{ r: 5 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</Row>
			)}

			{countryDailyLoader ? (
				<Row className='text-center mt-5 pt-5'>
					<Col>
						<Loader size={30} />
					</Col>
				</Row>
			) : (
				<Row className='mt-4'>
					<ResponsiveContainer width='100%' height={200}>
						<BarChart
							data={countryDaily[country].data}
							margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
						>
							<XAxis dataKey='date' tickFormatter={(v) => v.substring(5)} />
							<YAxis tickFormatter={(v) => d3f.format('.2s')(v)} />
							<CartesianGrid strokeDasharray='3 3' />
							<Tooltip />
							<Bar dataKey={type} fill={colorMap[type]} />
						</BarChart>
					</ResponsiveContainer>
				</Row>
			)}
		</>
	)
}
