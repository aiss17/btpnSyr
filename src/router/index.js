import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import { DetailUser, ListUser, Home } from '../pages'

const AppNavigator = createStackNavigator({
    Home: { screen: Home, navigationOptions: {title: 'Home'}},
    ListUser: { screen: ListUser, navigationOptions: {title: 'List User'}},
    DetailUser: { screen: DetailUser, navigationOptions: {title: 'Detail User'}},
}, {
    initialRouteName: 'ListUser'
})

export default createAppContainer(AppNavigator);