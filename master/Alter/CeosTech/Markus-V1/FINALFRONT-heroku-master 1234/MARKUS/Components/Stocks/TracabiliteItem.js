// Components/Stock/TracabiliteItem.js

import React from 'react';
import { Platform, Text, View, TextInput, TouchableOpacity, Dimensions, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class TracabiliteItem extends React.Component {

    constructor(props){
        super(props)
    }


    _displayItem(){
        const { ingredient } = this.props;

        console.log(ingredient.url)
            return(
            <LinearGradient 
                style = {
                    {
                        width: windowWidth ,
                        alignItems: 'center',
                        height: windowHeight*0.2,
                        borderWidth : 1.0,
                        borderRadius: 10,
                        borderColor: '#B0B0B0',
                        marginBottom: '2%',
                    }
                } 
                elevation={5} 
                colors={['#696969' , '#595959' , '#494949']}>
                <View style = {{flexDirection: 'row', 
                                    width: windowWidth, 
                                    height: windowHeight*0.3,
                                    alignItems: 'center',
                                    flex: 1,
                                    // Pour éviter un zIndex mal géré par Android (sinon le dropdown se met en arrière plan) / To avoid a mismanaged zIndex by Android (otherwise the dropdown goes in the background)
                                    ...(Platform.OS !== 'android' && {
                                    zIndex: 10
                                    })
                                    }}>
                    <View style = {{
                                    flex:1,
                                    width: windowWidth*0.95, 
                                    height: windowHeight*0.2,
                                    alignItems: 'center',
                                    padding: '2%'
                                    }}>
                               <Image
                                    style = {
                                        {
                                            flex:1,
                                            resizeMode:'contain',
                                        }
                                    }
                                    source={
                                       require("../../Assets/img/bar_1.png")
                                    }
                                />
                            </View>
                    <View style = {{
                                    flex:1,
                                    width: windowWidth*0.95, 
                                    height: windowHeight*0.1,
                                    alignItems: 'center'
                                    }}>
                        
                            <Text style = {
                                    {               
                                        color: 'white',
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        marginTop:'-12%'
                                    }
                                }>
                                {ingredient.name}
                            </Text>
                            <Text
                                style={{      
                                    color: 'white',
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    fontSize: 14,
                                    marginTop:'10%',
                                    marginRight:'5%'
                                }}>
                                Date d'entrée : {ingredient.date}
                            </Text>

                            <Text
                            style={{
                                marginTop:'6%',
                                textAlign: 'center',
                                color: '#90d9f1',
                                textAlignVertical: 'center',
                                fontSize: 14,
                                marginTop:'10%'
                            }}>
                                DLUO : {ingredient.dluo}
                        </Text>
                    </View>
                </View>
            </LinearGradient>
        )}

    render(){
        return(
            <>
            {this._displayItem()}
            </>
        )
        
    }
}


export default TracabiliteItem