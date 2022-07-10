import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, StyleSheet,FlatList, _SectionList} from 'react-native';
import moment from 'moment-timezone'

//Icone
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHatChef } from '@fortawesome/free-solid-svg-icons';

//data planning
import agenda from './Helper/agenda'


const weekDay = 'Sa_Di_Lu_Ma_Me_Je_Vr'.split('_')
const frenchMonth = ["Janvier" , "Fevrier" , "Mars" , "Avril" , "Mai" , "Juin" , "Juillet" , "Août" , "Septembre" , "Octobre" , "Novembre" , "Décembre"]



export default class ListPlanning extends React.Component{

    constructor(props){
        
        super(props)
    }

    _goTo = (item,month) => {
        this.props.navigation.navigate('DetailPersonne' , {item: item , month: month})
    }

    _init(month , date){
        
        if( agenda[month] == undefined || agenda[month].planning.length == 0 ){
            
            return [-1]
        }
        else{
            for(let i=0 ; i<agenda[month].planning.length; i++){

                if(date.diff(moment(agenda[month].planning[i].name) , 'day') == 0){
                    return agenda[month].planning[i].listEmploye
                }
                
               
            }
            return [-1]

            
            
        }
    }
    
    render(){

        const date = this.props.date.set({hour:0,minute:0,second:0,millisecond:0})
        const day = weekDay[date.day()]
        const numDay = date.get('date')
        const month = frenchMonth[date.month()]
        const year = frenchMonth[date.year()]
        
        
        return(
            
            <View style={{flex:1}}>

                <Text style={{borderBottomWidth: 0.5 , borderColor: '#04295D'}}/>

                <View style={{marginLeft:'5%'}}>

                    <Text style={{marginBottom:'1%' , color: '#04295D' , fontSize:13}}>
                        <Text style={styles.Day}>{day} </Text>
                        {numDay-1} {month} {year}
                    </Text>
                    
                </View>

                <Text style={{borderTopWidth: 0.5 , borderColor: '#04295D'}}/>
                        

               
                   
                
                    <FlatList
                       
                        data={this._init(month ,date)}
                        renderItem={({item}) => {
                            
                            if(item == -1 ){
                                return(
                                    <Text style={[styles.fonctUser , {marginLeft: '5%'} ]}>{/*Remplis le Planning*/}</Text>
                                )
                            }
                            else{
                                return(

                                    <TouchableOpacity onPress={() => {this._goTo(item,month)}}>
                                        <View style={styles.infoBox} >
                                            <Text style={styles.infoUsr}>{item.nom}</Text>
                                            <Text style={styles.fonctUser}>{item.qualification}</Text>
                                            <Text style={styles.fonctUser}>{item.horraire}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    
                                )
                            }

                                
                        

                        }}
                        
                    />
               
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Day:{
        fontSize: 25,
        width:'100%' ,
        color: '#3BB9E0',
        fontWeight: 'bold',
        
    },

    infoUsr:{
        fontSize: 10 , 
        color: '#3BB9E0' ,
        marginRight:'3%'

    },

    fonctUser:{
        fontSize: 10 , 
        color: 'white' ,
        marginRight:'5%'
    },

    hourUser:{
        fontSize: 10 , 
        color: '#04295D' ,
        marginLeft:'5%'
    },

    infoBox:{
        flexDirection: "row", 
        marginLeft:'5%' , 
        marginBottom:'5%' , 
        backgroundColor:'#4C4C4C' , 
        width:'65%' , 
        justifyContent:'center', 
        padding:'1%', 
        borderRadius:35 , 
        borderColor:'white' , 
        borderWidth:1
    }
})