import { StyleSheet, Dimensions } from 'react-native';
 /*Styles for ./Connexion*/
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  contain:{
    flex:1,
   
   
    width: windowWidth,
   
    alignItems: "center"

  },

  contain2:{
    flex:1,
    
    backgroundColor: 'rgba(0,0,0,0.3)',
   
    width: windowWidth,
   
    alignItems: "center"

  },
  
    container: {
      flex: 1,
      alignItems: 'center',
      //justifyContent: "center",
      //top:'15%'
    },
    logo:{

        //flex: 1,
        width: 430,
        height: 225,
        resizeMode: 'cover',
        top:'10%',
        position: 'relative',
        margin: 15,
        marginLeft: 25,
        opacity: 0.9,
        marginBottom:'-3%'
    },
    image: {
      flex: 1,
      width: '100%',
      resizeMode: "cover",
      justifyContent: "center",
    },
    formulaire:{
      height: 40,
      width: '70%',
      paddingLeft: 6,
      marginBottom: 4,
      borderWidth : 1.0,
      borderRadius: 10,
      backgroundColor: 'white',
      borderColor: '#3BB9E0',
      justifyContent: 'center',
      color: '#3BB9E0',
      paddingLeft: 35
    },
    button:{
      marginTop: 30,
      backgroundColor: '#3c3c3c',
      borderColor: "#3BB9E0",
      borderWidth: 0.5,
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
      borderRadius: 7,
      width: 200

      
    },
    recover:{
      color: '#F9F9F9',
      right: '-10%',
      paddingRight: 80,
      marginBottom:10,
      fontStyle: 'italic'
    },
    textIconSection:{
        marginTop: '-8%',
      flexDirection: 'row',
      //alignItems: 'center',
    },
    icon:{
      flex:1,
      padding:6,
      margin: 5,
      alignItems: 'flex-start',
      position: 'absolute',
      top:'15%',
      left:'1%',
      color: '#3BB9E0'
    },
    iconMenu:{
      flex:1,
      alignItems: 'flex-start',
      position: 'absolute',
      left:'1%',
      color: '#3BB9E0'
    }
  });

  /* Style for '../Security/ForgotPassword' and '../Security/ForgotPassword'*/
  export const forgot = StyleSheet.create({
    contain:{
      flex:1,
      backgroundColor: 'rgba(0,0,0,0.5)'
    },
      container: {
        alignItems: 'center',
        justifyContent: "center",
        top:'20%',
      },
      logo:{
          width: 360,
          height: 210,
          marginTop: 90,
          margin: 15,
          marginLeft: 11,
          resizeMode: 'cover',
          opacity: 0.9,
          marginBottom: '-31%'
      },
      image: {
        flex: 1,
        width: '100%',
        resizeMode: "cover",
        justifyContent: "center",
      },
      formulaire:{
        height: 45,
        width: '70%',
        paddingLeft: 6,
        borderWidth : 1.0,
        borderRadius: 10,
        backgroundColor: 'white',
        borderColor: '#3BB9E0',
        justifyContent: 'center',
        color: '#3BB9E0',
        paddingLeft: 25,
        marginBottom: 10
      },
      formulaire2:{
        height: 45,
        width: '70%',
        paddingLeft: 6,
        borderWidth : 1.0,
        borderRadius: 10,
        backgroundColor: 'white',
        borderColor: '#3BB9E0',
        justifyContent: 'center',
        color: '#3BB9E0',
        paddingLeft: 40,
        marginBottom: 10
      },
      formulairecode:{
        height: 45,
        width: '45%',
        paddingLeft: 6,
        borderWidth : 1.0,
        borderRadius: 10,
        backgroundColor: 'white',
        borderColor: '#3BB9E0',
        justifyContent: 'center',
        color: '#3BB9E0',
        paddingLeft: 20,
        marginBottom: 10
      },
      button:{
        marginTop: 30,
        backgroundColor: '#201E1F',
        borderColor: '#3BB9E0',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 7
      },
      textIconSection:{
        flexDirection: 'row',
        //alignItems: 'center',
        marginTop:'-8%'
      },
      icon:{
        flex:1,
        padding:6,
        margin: 5,
        alignItems: 'flex-start',
        position: 'absolute',
        top:'15%',
        left:'1%',
        color: '#3BB9E0'
      },
      text:{
        color: 'white',
        marginLeft: '10%',
        marginRight: '10%',
        marginBottom: '12%',
        textAlign: 'center'
      },
      border:{
        borderBottomWidth: 5,
        borderRightWidth: 5,
        borderLeftWidth: 5,
        borderColor: '#3BB9E0',
        width: '80%',
        height: 430,
        marginTop: '40%',
        marginRight: '10%',
        marginLeft: '10%',
        position: 'absolute'
      },
      
      borderTop:{
        borderTopWidth: 5,
        borderColor: '#3BB9E0',
        width: '30%',
        marginTop: '40%',
        position: 'absolute'
      }
    });
