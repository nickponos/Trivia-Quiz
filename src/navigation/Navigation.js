

import {createStackNavigator, createAppContainer} from 'react-navigation'
import First from '../screens/First';
import Quiz from '../screens/Quiz';

const AppNavigator = createStackNavigator({
    First,
    Quiz,
  },
  {
    initialRouteName: 'First',
    mode: 'modal',
    headerMode: 'none'
  });

export default createAppContainer(AppNavigator);

