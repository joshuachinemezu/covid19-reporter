import React from 'react'
// reactstrap components
import {
	Button,
	Card,
	CardBody,
	CardImg,
	CardTitle,
	CardText,
} from 'reactstrap'

export const AffectedCard = (props) => {
	return (
		<>
			<Card style={{ width: '18rem' }}>
				<CardImg alt='...' top />
				<CardBody>
					<CardTitle>Card title</CardTitle>
					<CardText>
						Some quick example text to build on the card title and make up the
						bulk of the card's content.
					</CardText>
					<Button
						color='primary'
						href='#pablo'
						onClick={(e) => e.preventDefault()}
					>
						Go somewhere
					</Button>
				</CardBody>
			</Card>
		</>
	)
}

export default AffectedCard
