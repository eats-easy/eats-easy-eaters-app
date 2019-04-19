import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import RootNavigator from './RootNavigator';

export default createAppContainer(
  createSwitchNavigator(
    {
      // TODO: add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      Root: RootNavigator
      // TODO: add draw navigation
    },
    {
      initialRouteName: 'Root'
    }
  )
);
