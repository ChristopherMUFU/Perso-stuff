import React from 'react';
import { Platform, Text, View, TextInput, TouchableOpacity, Image, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


//this.name= this.props.recette.name
//const { recette } = this.props;

class EtapeRecetteItem extends React.Component {

    constructor(props){
        super(props)
    }


      // MÉTHODES / METHODS ----------------------------
    
     

    

    render(){
        console.log("Ingredient Item RENDER")
        const {etapeItem} = this.props
        return(          
            
            <View style={{ 
                        marginVertical: 5, 
                        borderWidth: 2, 
                        borderColor: 'white', 
                        borderRadius: 10, 
                        padding: "2%",
                        height:40,
                        width: windowWidth*0.7}}>
                        <Text style = {
                            {
                                flex: 1,
                                color: 'white',
                                fontSize: 20,
                                fontWeight: 'bold',
                                textAlign: 'left',
                            }
                        }>
                            {etapeItem}
                        </Text>
            </View>
        )
        
    }
}


export default EtapeRecetteItem