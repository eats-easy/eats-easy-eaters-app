import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class DishStatusStepper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: props.status,
			statuses: [ 'Order placed', 'Preparing', 'Cooking', 'Serving', 'Completed' ]
		};
	}

	componentWillReceiveProps(newProps) {
		this.setState({ status: newProps.status });
	}

	render() {
		return (
			<View>
				<Grid>
					<Row>
						{this.state.statuses.map((title, index) => {
							return (
								<Col style={styles.centered} key={'status_' + index}>
									<View
										style={[
											styles.circle,
											this.state.status > index
												? styles.doneDot
												: this.state.status === index ? styles.activeDot : styles.inactiveDot
										]}
									>
										{this.state.status > index ? (
											<Icon name="done" color="#fff" />
										) : (
											<Text style={this.state.status === index ? styles.activeStepNumber : styles.inactiveStepNumber}>
												{index + 1}
											</Text>
										)}
									</View>
									<Text
										style={
											this.state.status > index ? (
												styles.doneStepTitle
											) : this.state.status === index ? (
												styles.activeStepTitle
											) : (
												styles.inactiveStepTitle
											)
										}
									>
										{title}
									</Text>
								</Col>
							);
						})}
					</Row>
				</Grid>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	activeDot: {
		backgroundColor: 'grey'
	},
	inactiveDot: {
		backgroundColor: '#ededed'
	},
	doneDot: {
		backgroundColor: '#54c645'
	},
	activeStep: {
		backgroundColor: 'grey'
	},
	inactiveStep: {
		backgroundColor: '#ededed'
	},
	activeStepTitle: {
		fontWeight: '500',
		textAlign: 'center',
		fontSize: 10
	},
	inactiveStepTitle: {
		fontWeight: '400',
		textAlign: 'center',
		color: 'grey',
		fontSize: 10
	},
	doneStepTitle: {
		fontWeight: '400',
		textAlign: 'center',
		color: 'grey',
		fontSize: 10
	},
	activeStepNumber: {
		fontWeight: '500',
		color: 'white',
		textAlign: 'center'
	},
	inactiveStepNumber: {
		fontWeight: '400',
		color: 'black',
		textAlign: 'center'
	},
	doneStepNumber: {
		fontWeight: '400',
		color: '#fff',
		textAlign: 'center'
	},
	circle: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 30,
		height: 30,
		borderRadius: 15
	},
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
		margin: 1
	}
});
