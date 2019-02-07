import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class DishStatusStepper extends React.Component {
	render() {
		return (
			<View>
				<Grid>
					<Row>
						<Col style={styles.centered}>
							<View style={[ styles.circle, styles.doneDot ]}>
								{/* <Text style={styles.doneStepNumber}>1</Text> */}
								<Icon name="done" color="#fff" />
							</View>
							<Text style={styles.doneStepTitle}>Order placed</Text>
						</Col>
						<Col style={styles.centered}>
							<View style={[ styles.circle, styles.activeDot ]}>
								<Text style={styles.activeStepNumber}>2</Text>
							</View>
							<Text style={styles.activeStepTitle}>Preparing</Text>
						</Col>
						<Col style={styles.centered}>
							<View style={[ styles.circle, styles.inactiveDot ]}>
								<Text style={styles.inactiveStepNumber}>3</Text>
							</View>
							<Text style={styles.inactiveStepTitle}>Cooking</Text>
						</Col>
						<Col style={styles.centered}>
							<View style={[ styles.circle, styles.inactiveDot ]}>
								<Text style={styles.inactiveStepNumber}>4</Text>
							</View>
							<Text style={styles.inactiveStepTitle}>Serving</Text>
						</Col>
						<Col style={styles.centered}>
							<View style={[ styles.circle, styles.inactiveDot ]}>
								<Text style={styles.inactiveStepNumber}>5</Text>
							</View>
							<Text style={styles.inactiveStepTitle}>Completed</Text>
						</Col>
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
		textAlign: 'center'
	},
	inactiveStepTitle: {
		fontWeight: '400',
		textAlign: 'center',
		color: 'grey'
	},
	doneStepTitle: {
		fontWeight: '400',
		textAlign: 'center',
		color: 'grey'
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
