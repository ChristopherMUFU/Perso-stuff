import React from 'react';
import { Platform, Text, View, TextInput, TouchableOpacity, Image, Dimensions,StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//import Swipeout from 'react-native-swipeout';
//import recettesData from '../../Helpers/recettes.json';
import ficheData  from '../../../Helpers/ficheSalarie.json';
// import { LinearGradient } from 'expo-linear-gradient';
import ListeFicheSalarie from './ListeFicheSalarie';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class FicheSalarieItem extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            navigation: this.props.navigation
        };
    };

    render(){
        const {ficheSalarie, displayDetailForFicheSalarie} = this.props

        return(
            <LinearGradient 
                style = {{
                    //width: windowWidth ,
                    width:'95%',
                    alignItems: 'center',
                    //justifyContent:'center',
                    //height: windowHeight*0.2,
                    height:100,
                    borderWidth : 1.0,
                    borderRadius: 5,
                    borderColor: '#B0B0B0',
                    marginBottom: '2%',
                    fontSize: 18,
                    textAlign: "center",
                    margin: 10,
                    //color: string;
                    //backgroundColor: string;
                    paddingLeft: 15,
                    paddingRight: 15,  
                }} 
                elevation={5} 
                colors={['#696969' , '#595959' , '#494949']}>
                <TouchableOpacity 
                    onPress = {() => displayDetailForFicheSalarie(this.props.ficheSalarie.id)} 
                    style={{
                        flex: 1,
                        paddingLeft: 15,
                        paddingRight:15,
                        color: 'white',
                        alignItems: 'center',
                        fontSize: 20,
                        width: windowWidth*0.7,
                        flexDirection: 'column',
                        maxHeight: 120        
                    }}>
                        
                    { 
                    /*  <Image style={
                            {
                                borderWidth : 1.0,
                                borderRadius: 10,
                                borderColor: '#B0B0B0',
                                flex: 1,
                                height: "80%",
                                width: "90%"
                            }
                        } 
                        source={this.image}/>
                        */
                    }

                    <View>   
                        <Text style={styles.flatListName}>
                            {ficheSalarie.nom + " "+ficheSalarie.prenom} 
                        </Text>
                    </View>

                    <View>   
                        <Text style={styles.flatListWork}>                               
                            {ficheSalarie.poste} 
                        </Text> 
                    </View>

                    <View>   
                        <Text style={styles.flatListNumber}>   
                            {ficheSalarie.numero_telephone }
                        </Text> 
                    </View>

                    {/* <Image source = {this.image.eye} style={styles.new_form_eye} /> */}

                    {/*<View style={{
                        flex: 1,
                        flexDirection: 'column',
                        height: 10,
                    }}>
                        <Text >
                            {ficheSalarie.nom+" "+ficheSalarie.prenom}
                        </Text>
                        <Text >{ficheSalarie.poste}</Text>
                        <Text >{ficheSalarie.numero_telephone}</Text>

                    </View>*/
                    }

                </TouchableOpacity>
            </LinearGradient>
            

        )
    }


}

const styles = StyleSheet.create({
flatListName: {
    color: 'white',
    fontSize: 24,
    alignContent: 'center',
    fontWeight: "900",
    lineHeight: 28,
    top: 5,
    textAlign:'center'
},
flatListWork: {
    color: '#91E5F6',
    fontSize: 18,
    fontWeight: "900",
    lineHeight: 21,
    top: 10,
    textAlign:'center'
},
flatListNumber: {
    color: '#F4F4F6',
    fontSize: 14,
    fontWeight: "900",
    textDecorationLine: "underline",
    lineHeight: 16,
    top: 20,
    textAlign:'center'

},
});

export default FicheSalarieItem