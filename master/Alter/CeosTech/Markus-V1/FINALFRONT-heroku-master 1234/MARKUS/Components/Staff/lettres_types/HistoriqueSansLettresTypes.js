import React from 'react'
import { Image,View,StyleSheet, Text} from 'react-native'

export default class HistoriqueSansLettresTypes extends React.Component {
    render() {
        return  (
        <View style={styles.background}>
            <View style={styles.logo}>
                <Image source={require('../../../Assets/ico/warning.png')}/>
            </View>
            <View style={styles.lettreTextContainer}>
                <Text style={styles.lettreText}>Aucune lettre n'a été{"\n"}  rédigée à ce jour</Text>
            </View>
        </View>
    )}
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#3C3C3C',
        flex : 1
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
    },
    lettreTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    lettreText: {
        fontFamily: 'Roboto',
        fontStyle: 'italic',
        fontSize: 18,
        color: '#FFFFFF',
    }
})