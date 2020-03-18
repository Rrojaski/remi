import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TouchableOpacity,
    Dimensions
} from "react-native";
import Panda from '../../assets/images/panda.png'

const Home = ( { navigation } ) => {
    return (
        <View style={ styles.container }>
            <Image style={styles.logoImage} source={Panda}/>
            <Text style={styles.logoText}>Welcome To Remi</Text>
            <Button
                title="Study"
                onPress={ () => navigation.navigate('Study') }
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingTop: "5%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
    },
    logoImage: {
        resizeMode: 'contain',
        maxHeight: '50%',

    },
    logoText: {
        marginTop: 20,
        marginBottom: 50,
        fontSize: 30
    }
});

export default Home
