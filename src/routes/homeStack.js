import { createStackNavigator} from '@react-navigation/stack'
import { createAppContainer} from 'react-navigation'
import Home from '../screens/Home/Home'
const screens = {
    Home: {screen: Home}
};

const HomeStack = createStackNavigator();

export default createAppContainer(HomeStack)
