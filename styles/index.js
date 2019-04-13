import Colors from '../constants/Colors';

export const commonStyles = {
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
  stretch: {
    alignItems: 'stretch'
  },
  centered: {
    alignItems: 'center'
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
  textHuge: { fontSize: 26 },
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
  miniIcons: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tileLast: {
    marginBottom: 60
  },
  // Effects
  shadowSmall: {
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.18,
    shadowRadius: 10.0,
    elevation: 2,
    backgroundColor: Colors.white
  },
  shadowMedium: {
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.18,
    shadowRadius: 10.0,
    elevation: 3,
    backgroundColor: Colors.white
  }
};

export const searchRestaurantStyles = {
  searchBar: {
    flex: 1,
    paddingLeft: 0,
    paddingRight: 10,
    marginBottom: 7
  }
};

export const dishStatusStepperStyles = {
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
};
