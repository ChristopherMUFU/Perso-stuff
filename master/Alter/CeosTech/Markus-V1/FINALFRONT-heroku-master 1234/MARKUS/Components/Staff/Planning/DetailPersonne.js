import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, StyleSheet , FlatList,Dimensions} from 'react-native';
import moment from 'moment';
import agenda from './Helper/agenda'
import agendaAbs from './Helper/agendaAbs'


// constante qui correspond à la valeur de l'écran / constant that corresponds to the screen value
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;




const weekDay = 'Sa_Di_Lu_Ma_Me_Je_Vr'.split('_')
const frenchMonth = ["Janvier" , "Fevrier" , "Mars" , "Avril" , "Mai" , "Juin" , "Juillet" , "Août" , "Septembre" , "Octobre" , "Novembre" , "Décrembre"]



export default class DetailPersonne extends React.Component {


    constructor(props){
        super(props)
    }

    _findDayWork(personne,month){

        let name = personne.nom
        let tmpTab = []
        agenda[month].planning.forEach( (item1) =>{

            item1.listEmploye.forEach( (item) => {
                console.log(item.nom)
                if(item.nom == name ){
                    tmpTab.push({
                        date : item1.name , 
                        break: item.pause , 
                        timeWork: item.horraire
                    })
                    return
                }
            })


        })

        

        return tmpTab
        
        

    }

    _findDayBreak(personne,month){

        if(agendaAbs[month] == undefined){
            return -1
        }
        
        let name = personne.nom
        let tmpTab = []
        agendaAbs[month].planning.forEach( (item1) =>{

            item1.listEmploye.forEach( (item) => {
                console.log(item.nom)
                if(item.nom == name ){
                    tmpTab.push({
                        date : item1.name , 
                        reason: item.reason
                    })
                    return
                }
            })


        })

        

        return tmpTab
        
        

    }

    render(){
        const personne = this.props.route.params.item
        const month = this.props.route.params.month
        const dayWork = this._findDayWork(personne , month)
        const dayBreak = this._findDayBreak(personne , month)

        return(
            <ScrollView style={{flex:1, width: windowWidth ,height : windowHeight, backgroundColor:"#3C3C3C"}}>


                <View style={{flexDirection: "row", marginTop: 15 , marginLeft:'5%'}}>

                    <Text style={{color: "white", fontSize: 20 , color:'#3BB9E0'}}>{personne.nom}</Text>
                    <Text style={{color: "white", fontSize: 12 , padding:'2%'}}>{personne.qualification}</Text>

                </View>

                <Text style={{borderBottomWidth: 0.5 , borderColor: 'white' }}/>

                <View style={{flexDirection: "row", marginTop: 15 , marginLeft:'5%'}}>
                    <Text style={{color: "white", fontSize: 20 , color:'#3BB9E0'}}>Jour de Travail Sur le Mois : </Text>
                </View>

                <FlatList
                        style={{marginTop:'5%'}}
                        data={dayWork}
                        renderItem={({item}) => {

                            
                                const date = moment(item.date).set({hour:0,minute:0,second:0,millisecond:0})
                                const day = weekDay[date.day()]
                                const numDay = date.get('date')-1
                                const month = frenchMonth[date.month()]


                                 return(

                                    <View style={styles.infoBox} >
                                        <Text style={styles.infoUsr}>{day} {numDay} {month}</Text>
                                        <Text style={styles.fonctUser}>Pause de : {item.break} min</Text>
                                        <Text style={styles.fonctUser1}>{item.timeWork}</Text>
                                    </View>
                                )
                                    
                                    
                            }
                            }

                                
                        

                        
                        
                    />

                    <View style={{flexDirection: "row", marginTop: 15 , marginLeft:'5%'}}>
                        <Text style={{color: "white", fontSize: 20 , color:'#3BB9E0'}}>Jour de Repos Sur le Mois :</Text>
                    </View>


                    <FlatList
                        style={{marginTop:'5%'}}
                        data={dayBreak}
                        renderItem={({item}) => {

                            
                                const date = moment(item.date).set({hour:0,minute:0,second:0,millisecond:0})
                                const day = weekDay[date.day()]
                                const numDay = date.get('date')-1
                                const month = frenchMonth[date.month()]

                                console.log(dayBreak)
                                 return(

                                    <View style={styles.infoBox} >
                                        <Text style={styles.infoUsr}>{day} {numDay} {month}</Text>
                                        <Text style={styles.fonctUser}>{item.reason}</Text>
                                    </View>
                                )
                                    
                                    
                            }
                            }

                                
                        

                        
                        
                    />

                    

            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({

    Day:{
        fontSize: 24,
        width:'100%' ,
        color: '#3BB9E0',
        fontWeight: 'bold',
        
    },

    infoUsr:{
        fontSize: 10 , 
        color: '#3BB9E0' ,
        marginRight:'3%',
        marginLeft:'3%'

    },

    fonctUser:{
        fontSize: 10 , 
        color: 'white' ,
        marginLeft:'5%',
        justifyContent:'center'
    },

    fonctUser1:{
        fontSize: 10 , 
        color: 'white' ,
        marginLeft:'5%'
    },


    hourUser:{
        fontSize: 10 , 
        color: 'white' ,
        marginLeft:'5%'
    },

    infoBox:{
        flexDirection: "row", 
        marginLeft:'5%' , 
        marginBottom:'5%' , 
        backgroundColor:'#4C4C4C' , 
        width:'65%' , 
        marginLeft:'3%',
        padding:'1%', 
        borderRadius:35 , 
        borderColor:'white' , 
        borderWidth:1
    }
})