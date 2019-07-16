import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import LoginNavigator from './LoginNavigator'
import Loading from '../screens/AuthenticationScreen/Loading'

const AuthNavigator = createSwitchNavigator(
  {
    // Splash: SplashScreen,
    LoginNavigator: LoginNavigator,
    Loading: Loading
  },
  {
    initialRouteName: 'Loading',
    headerMode: 'none'
  }
)

export default createAppContainer(AuthNavigator)
