import React from "react"

import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()
import Home from './screens/Home/Home'
import Study from './screens/Study/Study'
import CardEdit from './screens/CardEdit/CardEdit'
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TouchableOpacity
} from "react-native"

const App = ({navigation}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={ Home } options={ { title: "REMI" } }/>
            <Stack.Screen name="Study" component={ Study } options={ {
                headerRight: () => (
                    <View style={{marginRight: 10}}>
                        <Button
                            onPress={ () => navigation.navigate('Card Edit') }
                            title="Edit"
                        />
                    </View>
                ),
            } }/>
            <Stack.Screen name="Card Edit" component={ CardEdit }/>
        </Stack.Navigator>
    )
}

export default App
