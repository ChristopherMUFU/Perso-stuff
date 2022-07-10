import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet , FlatList} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import 'moment';
import 'moment/locale/fr';  
import moment from 'moment-timezone';
import ListPlanning from './Planning/ListPlanning'

//data qui contient les jours en FR / data which contains the days in FR
import locale from './Planning/local'

//Icon
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarPlus , faShareSquare} from '@fortawesome/free-solid-svg-icons';

//constante des mois en FR / constant of the months in FR
const frenchMonth = ["Janvier" , "Fevrier" , "Mars" , "Avril" , "Mai" , "Juin" , "Juillet" , "Août" , "Septembre" , "Octobre" , "Novembre" , "Décrembre"]

//fonction qui trouve le mois courant + les deux autres mois qui suivent ex : JUILLET AOÛT SEPTEMPBRE / function that finds the current month + the other two months that follow ex: JULY AUGUST SEPTEMBER
const three_month = () => {
    let three_month = []
    let date  = new Date()
    three_month = [...three_month,frenchMonth[date.getMonth()],frenchMonth[date.getMonth()+1],frenchMonth[date.getMonth()+2],frenchMonth[date.getMonth()+3]]
    return(three_month)
}

export default class Planning extends React.Component {

    

    constructor(props){
        super(props)
        this.state = {
            correction_bug: true,
            three_month : three_month(),
            nowDate : moment(),
            weekData: [
                moment(),
                moment().add(1,'day'),
                moment().add(2,'day'),
                moment().add(3,'day'),
                moment().add(4,'day'),
                moment().add(5,'day'),
                moment().add(7,'day'),
            ] , 
            monthSelect : ''
            
        }
    }



    

    //Sélectionne le mois / Selects the month
    _monthSelect(month){
        let numMonth = frenchMonth.findIndex((item) => item == month)+1
        let date = moment().year()+'-0'+numMonth+'-01T00:00:00.000Z'
        
        this.setState({monthSelect: date})
    }


    _share() {  
        //Share.open(shareOptions);
        console.log("FAIRE LE SHARE APRES AVOIR CONCUS LE JSON")
        return null
    }

    _weekData(day){
        
        let tmp = moment(day)
        let weekData = [tmp]
        for(let i = 1 ; i<6 ; i++ ){
            tmp = moment(tmp.add(1,"day"))
            weekData.push(tmp)
       }
       weekData.unshift(day)
       weekData[weekData.length-1].add(1,'day')
      
       this.setState({weekData: weekData })
       
    }

    _goTo = (action) => {
        this.props.navigation.navigate('createPlanning' , {date: this.state.weekData[0]})
    }

   

    render() {
        console.log(this.state.weekData[0])
        return (
            
            <View style={{backgroundColor:"white" , flex:1}}>
              
              <View style={{flexDirection: "row" , justifyContent:'center' , marginTop:'3%'}}>

                <TouchableOpacity onPress = {() => {this._monthSelect(this.state.three_month[0])}} style={style.touchAble}>
                        <Text style={style.buttonText}>
                            {this.state.three_month[0]}
                        </Text>
                </TouchableOpacity>


                <TouchableOpacity onPress = {() => {this._monthSelect(this.state.three_month[1])}} style={style.touchAble} >
                        <Text style={style.buttonText}>
                            {this.state.three_month[1]}
                        </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress = {() => {this._monthSelect(this.state.three_month[2])}} style={style.touchAble} >
                        <Text style={style.buttonText}>
                            {this.state.three_month[2]}
                        </Text>
                </TouchableOpacity>

                
            

              </View>

                <View style={{flex:1}}>

                    <CalendarStrip
                        scrollable
                        startingDate = {this.state.monthSelect}
                        locale = {locale}
                        daySelectionAnimation={{type: 'background', duration: 20, highlightColor: "#3BB9E0"}}
                        style={{height:100 , borderBottomColor:'#04295D' , borderBottomWidth:1}}
                        calendarColor={'transparent'}
                        showMonth={false}
                        dateNumberStyle={{color: '#04295D'}}
                        dateNameStyle={{color: '#04295D'}}
                        iconContainer={{flex: 0.1}}
                        onDateSelected={(date)=>{this._weekData(moment(date).add(1,'day'))}}
                        selectedDate={this.state.nowDate}
                    />

                        <View style={{flexDirection: "row", marginTop:'4%', width:'100%', justifyContent:'center'}}>

                        <TouchableOpacity style={style.iconStyle} onPress={()=>{this._goTo()}}>
                            <View style = {{width:"100%" , alignItems:'center'}}>
                                <FontAwesomeIcon icon={ faCalendarPlus } style ={{color: "#04295D"}}/>
                                <Text style={{ color:'#04295D', textAlign:'center', fontSize:15 }}>Créer</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.iconStyle} onPress={()=>{console.log("coucou")}}>
                            <View style = {{width:"100%" , alignItems:'center'}}>
                                
                                <FontAwesomeIcon icon={ faShareSquare } style ={{color: "#04295D"}}/>
                                <Text style={{ color:'#04295D' , textAlign:'center', fontSize:15}}>Partager</Text>
                            </View>
                        </TouchableOpacity>

                        </View>
                </View>


                <View style={{flex:2}}>
                    <FlatList
                        data={this.state.weekData}
                        renderItem={({item}) => (
                            <ListPlanning date={item} navigation={this.props.navigation}/>

                                
                        )}
                    />
                </View>
                
              
                    
                
            </View>
            )
        }
}

const style = StyleSheet.create({
    touchAble: {
        width: "25%",
        textAlign: 'center',
        marginLeft:'4%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        borderColor: "#B0B0B0",
        borderWidth: 1,
        backgroundColor:'#04295D'
        
    },
    buttonText: {
        fontSize: 11,
        textAlign: "center",
        margin: '1%',
        marginBottom:'5%',
        color: "#ffffff",
        backgroundColor: "transparent",
    },

    iconStyle:{
        width:'15%', 
        height:'150%', 
        marginLeft:'5%', 
        alignItems:'center',
        zIndex: 1,
        
    }
}

)

