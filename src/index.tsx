import React from "react"

import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()
import Home from './screens/Home/Home'
import Study from './screens/Study/Study'
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TouchableOpacity
} from "react-native"

const App = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={ Home } options={ { title: "REMI" } }/>
            <Stack.Screen name="Study" component={ Study } options={ {
                headerRight: () => (
                    <View style={{marginRight: 10}}>
                        <Button
                            onPress={ () => alert( 'Edit Modal' ) }
                            title="Edit"
                        />
                    </View>
                ),
            } }/>
        </Stack.Navigator>
    )
}

export default App
