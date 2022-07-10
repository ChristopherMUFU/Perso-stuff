import React from 'react';
import { Platform, Text, View, TextInput, TouchableOpacity, Image, Dimensions,StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getCategorieMenuDetail } from '../../API/StocksData';
//import Swipeout from 'react-native-swipeout';
//import recettesData from '../../Helpers/recettes.json';
// import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let recupDataFicheTechnique = [];
let recupDataCategorieMenu = [];
let recupDataProduitEnStock = [];

//this.name= this.props.recette.name
//const { recette } = this.props;

class FicheTechniqueItem extends React.Component {

    constructor(props){
        super(props)
        //this.image= require('../../Assets/img/entrecote.jpg')
        this.image= {
            eye: require('../../Assets/img/entrecote.jpg')
        }
        this.state = {
            activeRowKey: null,
            fichetechnique : [],
            //navigation: this.props.navigation,
        };
    }


    // MÉTHODES / METHODS ----------------------------


    _recupDetailFicheTechnique(data)
    {
        recupDataFicheTechnique = data;
        return recupDataFicheTechnique;
    }
    _returnDataFicheTechnique()
    {
        console.log('DATA FICHE => ' + recupDataFicheTechnique);
        return recupDataFicheTechnique;
    }


    _recupDetailCategorieMenu(data)
    {
        recupDataCategorieMenu = data;
        return recupDataCategorieMenu;
    }
    _returnDataCategorieMenu()
    {
        console.log('DATA CATE => ' + recupDataCategorieMenu);
        return recupDataCategorieMenu;
    }


    _recupDetailProduitEnStock(data)
    {
        recupDataProduitEnStock = data;
        return recupDataProduitEnStock;
    }
    _returnDataProduitEnStock()
    {
        console.log('DATA PROD => ' + recupDataProduitEnStock);
        return recupDataProduitEnStock;
    }

    _goTo(destination){
        this.props.navigation.navigate(destination);
     }


    render(){
        const {fichetechnique} = this.props
        const {navigation} = this.props


        return(
            <View style = {{alignItems: 'center'}}>
                <LinearGradient
                    style = {
                        {
                            //width: windowWidth ,
                            width:'95%',
                            margin: 'auto',
                            alignItems: 'center',
                            justifyContent:'center',
                            //height: windowHeight*0.2,
                            height:50,
                            borderWidth : 1.0,
                            borderRadius: 5,
                            //borderColor: '#B0B0B0',
                            borderColor:"#6ed6ff",
                            marginBottom: '2%',
                            fontSize: 18,
                            textAlign: "center",
                            margin: 10,
                            //color: string;
                            //backgroundColor: string;
                            paddingLeft: 15,
                            paddingRight: 15,

                        }
                    }
                    elevation={5}
                    colors={['#696969' , '#595959' , '#494949']}>
                        <TouchableOpacity onPress = {() => {
                            this._recupDetailFicheTechnique(fichetechnique),
                            //this._recupDetailCategorieMenu(this.props.categoriemenu),
                            //this._recupDetailProduitEnStock(this.props.produitenstock),
                            this._goTo('technicalDetail')
                    }}
                                        style={{
                                                flex: 1,
                                                paddingLeft: 15,
                                                paddingRight:15,
                                                color: 'white',
                                                alignItems: 'center',
                                                fontSize: 20,
                                                width: windowWidth*0.7,
                                                flexDirection: 'row'

                                            }} >
                                { /*  <Image style={
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
                                        */}

                                    <Text style = {
                                            {
                                                flex: 2,
                                                color: 'white',
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                textAlign: 'center'
                                            }
                                        }>
                                        {fichetechnique.denomination}
                                    </Text>

                                {/* <Image source = {this.image.eye} style={styles.new_form_eye} /> */}

                                </TouchableOpacity>
                </LinearGradient>
            </View>

        )

    }
}
const styles = StyleSheet.create({
new_form_eye : {
    resizeMode: 'contain',
    backgroundColor:'transparent',
    height: 20,
    marginTop: 3,
    marginRight: 5,
 }
})

//export default connect(mapStateToProps)(FicheTechniqueItem);
export default FicheTechniqueItem
