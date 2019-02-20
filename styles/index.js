import React, { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export const commonStyles = StyleSheet.create({
	// Margins and Paddings
	marginNone: { margin: 0 },
	marginSmall: { margin: 2 },
	marginMedium: { margin: 4 },
	marginBig: { margin: 8 },
	paddingNone: { padding: 0 },
	paddingSmall: { padding: 2 },
	paddingMedium: { padding: 4 },
	paddingBig: { padding: 8 },
	// Floatings
	textRight: { textAlign: 'right' },
	textLeft: { textAlign: 'left' },
	textCenter: { textAlign: 'center' },
	justifyCenter: {
		justifyContent: 'center'
	},
	elevationNone: {
		elevation: 0
	},
	elevationSmall: {
		elevation: 1
	},
	elevationMedium: {
		elevation: 2
	},
	flexed: { flex: 1 },
	// Containers
	container: {
		backgroundColor: Colors.containerBaredckground,
		flex: 1,
		padding: 5
	},
	row: {
		flex: 1
	},
	column: {
		flex: 1
	},
	// Text
	textMicro: { fontSize: 10 },
	textSmall: { fontSize: 14 },
	textMedium: { fontSize: 18 },
	textBig: { fontSize: 22 },
	textLight: { fontWeight: '300' },
	textRegular: { fontWeight: '400' },
	textBold: { fontWeight: '500' },
	textStrong: {
		fontWeight: '800'
	},
	// Micro components
	buttonClear: {
		backgroundColor: Colors.buttonClearBackground,
		borderRadius: 0,
		color: Colors.textColor
	},
	loadingIcon: {
		width: 50,
		height: 50
	},
	// Effects
	shadowSmall: {
		shadowColor: Colors.shadowColor,
		shadowOpacity: 0.18,
		shadowRadius: 1.0,
		shadowOffset: {
			width: 0,
			height: 1
		}
	},
	shadowMedium: {
		shadowColor: Colors.shadowColor,
		shadowOpacity: 0.18,
		shadowRadius: 4.0,
		shadowOffset: {
			width: 0,
			height: 2
		}
	}
});

export const dishStatusStepperStyles = StyleSheet.create({
	dishStatusContainer: {
		height: 62
	},
	trackerDotActive: {
		backgroundColor: Colors.trackerDotActive
	},
	trackerDotInactive: {
		backgroundColor: Colors.trackerDotInactive
	},
	trackerDotDone: {
		backgroundColor: Colors.trackerDotDone
	},
	trackerStepActive: {
		backgroundColor: Colors.trackerStepActive
	},
	trackerStepInactive: {
		backgroundColor: Colors.trackerStepInactive
	},
	trackerStepDone: {
		backgroundColor: Colors.trackerStepDone
	},
	trackerStepTitleActive: {
		color: Colors.trackerStepTitleActive
	},
	trackerStepTitleInactive: {
		color: Colors.trackerStepTitleInactive
	},
	trackerStepTitleDone: {
		color: Colors.trackerStepTitleDone
	},
	trackerStepNumberActive: {
		color: Colors.trackerStepNumberActive
	},
	trackerStepNumberInactive: {
		color: Colors.trackerStepNumberInactive
	},
	trackerStepNumberDone: {
		color: Colors.trackerStepNumberDone
	},
	circle: {
		width: 30,
		height: 30,
		borderRadius: 15
	}
});
