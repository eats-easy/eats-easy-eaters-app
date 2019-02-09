import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { CheckBox, Slider } from 'react-native-elements';

export default class SearchFilters extends React.Component {
	constructor() {
		super();
		this.state = {
			asian: true,
			italian: true,
			israeli: true,
			vegan: true,
			pizza: true,
			meat: true,
			value: 50
		};
	}

	renderCheckBoxes() {}

	render() {
		return (
			<View style={[ styles.container, { justifyContent: 'center', alignContent: 'stretch' } ]}>
				<Grid>
					<Row>
						<Col>
							<CheckBox
								center
								title="Asian"
								checkedIcon="check-circle"
								uncheckedIcon="circle-o"
								checkedColor="#2f95dc"
								checked={this.state.asian}
								onPress={() => this.setState({ asian: !this.state.asian })}
							/>
							<CheckBox
								center
								title="Italian"
								checkedIcon="check-circle"
								uncheckedIcon="circle-o"
								checkedColor="#2f95dc"
								checked={this.state.italian}
								onPress={() => this.setState({ italian: !this.state.italian })}
							/>
							<CheckBox
								center
								title="Israeli"
								checkedIcon="check-circle"
								uncheckedIcon="circle-o"
								checkedColor="#2f95dc"
								checked={this.state.israeli}
								onPress={() => this.setState({ israeli: !this.state.israeli })}
							/>
						</Col>
						<Col>
							<CheckBox
								center
								title="Vegan"
								checkedIcon="check-circle"
								uncheckedIcon="circle-o"
								checkedColor="#2f95dc"
								checked={this.state.vegan}
								onPress={() => this.setState({ vegan: !this.state.vegan })}
							/>
							<CheckBox
								center
								title="Pizza"
								checkedIcon="check-circle"
								uncheckedIcon="circle-o"
								checkedColor="#2f95dc"
								checked={this.state.pizza}
								onPress={() => this.setState({ pizza: !this.state.pizza })}
							/>
							<CheckBox
								center
								title="Meat"
								checkedIcon="check-circle"
								uncheckedIcon="circle-o"
								checkedColor="#2f95dc"
								checked={this.state.meat}
								onPress={() => this.setState({ meat: !this.state.meat })}
							/>
						</Col>
					</Row>
					<Row style={{ paddingLeft: 10, paddingRight: 5, paddingTop: 0, marginTop: 0 }}>
						<Col style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
							<Slider
								value={this.state.value}
								onValueChange={(value) => this.setState({ value })}
								minimumValue={0.1}
								maximumValue={50}
								thumbTintColor="#2f95dc"
							/>
							<Text>Distance: {Number(this.state.value).toFixed(1)} km</Text>
						</Col>
					</Row>
				</Grid>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
