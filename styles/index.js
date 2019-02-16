import { StyleSheet } from 'react-native';

const common = {
	container: {
		flex: 1,
		padding: 5,
		backgroundColor: '#fff'
	},
	row: {
		flex: 1,
		margin: 0,
		paddingBottom: 8
	},
	column: {
		flex: 1
	}
};

const commonStyles = StyleSheet.create(common);

const orderScreenStyles = StyleSheet.create({
	...common,
	rowList: {
		flex: 1,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.18,
		shadowRadius: 1.0,

		elevation: 1,
		backgroundColor: '#fff'
	},
	columnList: {
		flex: 1,
		justifyContent: 'center',
		padding: 4,
		backgroundColor: '#fff'
	},
	mediumStrong: {
		fontSize: 18,
		fontWeight: '800'
	},
	small: { fontSize: 14 },
	smallRight: { fontSize: 14, textAlign: 'right' },
	micro: { fontSize: 10 },
	buttonClear: {
		elevation: 0,
		backgroundColor: '#ccc',
		borderRadius: 0,
		color: '#000'
	},
	text: {
		textAlign: 'center',
		padding: 8,
		color: '#000',
		fontWeight: '400'
	},
	trackerCol: {
		backgroundColor: '#ccc',
		color: '#888',
		margin: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	trackerColReady: {
		backgroundColor: '#71F570',
		color: '#888',
		margin: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	dishStatus: {
		height: 62,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.18,
		shadowRadius: 4.0,

		elevation: 2,
		backgroundColor: '#fff'
	}
});

export default { commonStyles, orderScreenStyles };
