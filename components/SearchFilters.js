import React from 'react';
import { Text, View } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { CheckBox, Slider } from 'react-native-elements';
import { commonStyles } from '../styles';
import Colors from '../constants/Colors';

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
			<View
				style={[
					commonStyles.container,
					commonStyles.textCenter,
					commonStyles.justifyCenter
				]}
			>
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
					<Row
						style={{
							paddingLeft: 10,
							paddingRight: 10,
							paddingTop: 0,
							margin: 0
						}}
					>
						<Col
							style={[
								commonStyles.justifyCenter,
								commonStyles.stretch,
								commonStyles.container
							]}
						>
							<Slider
								value={this.state.value}
								onValueChange={(value) => this.setState({ value })}
								minimumValue={0.1}
								maximumValue={50}
								thumbTintColor={Colors.tintColor}
							/>
							<Text>Distance: {Number(this.state.value).toFixed(1)} km</Text>
						</Col>
					</Row>
				</Grid>
			</View>
		);
	}
}
