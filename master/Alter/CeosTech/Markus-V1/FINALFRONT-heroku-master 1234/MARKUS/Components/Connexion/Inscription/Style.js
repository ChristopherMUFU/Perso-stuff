/**
 * define global style for Registration components
 * Profile, Company, Restaurant, Registration
 */

import { StyleSheet, Dimensions, Platform } from 'react-native'

const phoneWidth = Dimensions.get('window').width

//define zip and city textinput width 
const zip_width = (phoneWidth-50)/3
const city_width = (phoneWidth-50)-zip_width

const inscriptionStyle = StyleSheet.create({
    //containers
    container:{
        flexDirection: 'column',
        alignItems: 'center',
        //borderTopWidth: 1.5,
        //borderColor: 'white',
        marginVertical: 15,
        flex:1,
        width:'100%',
        justifyContent:"center"
    },
    fields_container:{
        marginTop: 15,
        paddingVertical: 20,
        width: phoneWidth-5,
        borderTopWidth: 0.5,
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
    checkbox_container:{
        flexDirection: 'row',
        marginBottom: 10,
        width: '90%',
    },
    //DropDownPicker Etablissement / Institution
    dropdown_view:{
        ...(Platform.OS !== 'android' && {zIndex: 10}),
        flex:1,
        width:'100%',
        alignItems: 'center',
        marginBottom:'60%'
    },
    
    dropdown_container:{
        flexDirection: 'row',
        backgroundColor: 'green',
        justifyContent: 'center',
      
    },



    //titles
    title:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 10,
    },
    field_names:{
        color: 'white',
        fontWeight: 'bold',
        fontSize:15,
    },
    textinput_boxes:{
        backgroundColor: 'white',
        marginLeft:'2%',
        height: 50,
        width: phoneWidth-33,
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
    checkbox_box:{
        alignSelf: 'center'
    },
    checkbox_label:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        margin: 10,
    },

    //DropDownPicker Etablissement
    dropdownStyle:{
        marginTop: 8,
        width: '100%',
        borderColor: 'white', 
        borderWidth: 0.7,
        borderTopStartRadius: 7,
        borderTopEndRadius: 7, 
        borderBottomStartRadius: 7,
        borderBottomEndRadius: 7,
        backgroundColor: 'black', 
    },
    label_style:{
        color: 'white',
    },
})

const registration_style = StyleSheet.create({
    container:{
        backgroundColor: '#3C3C3C',
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        paddingTop:'1%',
        width: "100%",
    },
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
    button_container:{
        width: phoneWidth-5,
        //marginTop: '1%',
        alignItems: 'center', 
        //borderTopWidth:0.5,
        borderColor: 'white',
        paddingTop: 20,
    },
    linearGradientb: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 8,
        borderColor: "#3BB9E0",
        borderWidth: 0.7,
        marginBottom: 25,
      
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
    touchable_text:{
        width: phoneWidth-30,
    },
}) 

export{
    registration_style,
    inscriptionStyle
}