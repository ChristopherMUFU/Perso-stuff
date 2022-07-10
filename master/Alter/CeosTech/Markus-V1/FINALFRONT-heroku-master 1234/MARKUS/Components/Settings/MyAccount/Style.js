/**
 * define global style for Registration components
 * Profile, Company, Restaurant, Registration
 */

import { StyleSheet, Dimensions } from 'react-native'

const phoneWidth = Dimensions.get('window').width

//define zip and city textinput width 
const zip_width = (phoneWidth-50)/3
const city_width = (phoneWidth-50)-zip_width

const inscriptionStyle = StyleSheet.create({
    //containers
    container:{
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 15,
    },
    fields_container:{
        marginTop: 15,
        paddingVertical: 20,
        width: phoneWidth-5,
        //borderTopWidth: 1.5,
        borderColor: 'white',
        alignItems: 'center',
    },
    rowDirection_container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: phoneWidth-30,
    },   
    fieldInput_container:{
        marginVertical: 5,
    },

    //titles
    title:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    field_names:{
        color: 'white',
        fontWeight: 'bold',
        fontSize:15
    },
    textinput_boxes:{
        backgroundColor: 'white',
        height: 50,
        width: phoneWidth-30,
        borderRadius: 7,
        fontSize: 20
    },
    zip_textinput:{
        backgroundColor: 'white',
        height: 50,
        width: zip_width,
        borderRadius: 7,
        fontSize: 20
    },
    city_textinput:{
        backgroundColor: 'white',
        height: 50,
        width: city_width,
        borderRadius: 7,
        fontSize: 20
    },
    position_textinput:{
        backgroundColor: 'white',
        height: 50,
        width: (phoneWidth-50)/2,
        borderRadius: 7,
        fontSize: 20
    },
    phonenumber_textinput:{
        backgroundColor: 'white',
        height: 50,
        width: (phoneWidth-50)/2,
        borderRadius: 7,
        fontSize: 20
    },

})

const registration_style = StyleSheet.create({
    title_container:{
        marginTop: 10,
        flexDirection: 'column',
        alignItems: 'center',
    },
    notice_container:{
        marginVertical: 25,
        flexDirection: 'column',
        alignItems: 'center',
    },

    title:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25
    },
    fields_text:{
        color: 'white',
        fontStyle: 'italic',
        fontSize: 12,
    },
    notice_title:{
        color: 'red',
        fontWeight: 'bold',
        fontSize: 20
    },
    notice_text:{
        color: 'white',
        fontSize: 15,
    },

}) 

export{
    registration_style,
    inscriptionStyle
}
