import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, StyleSheet , FlatList,Dimensions,TextInput, CheckBox ,Alert} from 'react-native';
import moment from 'moment';
import * as Theme from '../../Styles/Theme'
import data_personnel from './Helper/data_personnel'
import DropDownPicker from 'react-native-dropdown-picker';
import LinearGradient from 'react-native-linear-gradient';
import agenda from './Helper/agenda'
import agendaAbs from './Helper/agendaAbs'
import {isEmpty} from "lodash"
import { setPlanning } from '../../../API/StaffData';

// constante qui correspond a la valeur de l'ecran / constant that corresponds to the screen value 
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const weekDay = 'Samedi_Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vrendredi'.split('_')
const frenchMonth = ["Janvier" , "Fevrier" , "Mars" , "Avril" , "Mai" , "Juin" , "Juillet" , "Août" , "Septembre" , "Octobre" , "Novembre" , "Décrembre"]


export default class CreatePlanning extends React.Component {

    constructor(props){
        super(props);
        this.state={
            contratType: [
                {label: 'CDD' , value: "CDD"},
                {label: 'CDI' , value: "CDI"},
            ],

            avantageType: [
                {label:"L'avantage en nature" , value:"L'avantage en nature"},
            ],

            qualifications: [

                {label: 'Barman' ,value: "Barman"},
                {label: 'Commis de cuisine' ,value: "Commis de cuisine"},
               
            ],

            checkBoxDay: {
                Lu: false,
                Ma: false,
                Me: false,
                Je: false,
                Vr: false,
                Sa: false,
                Di: false,
            },

            isSelectShift: {
                color: 'white' ,
                opacity: 1
            },

            isSelectAbsence: {
                color: 'white',
                opacity: 0.5
            },

            menue : 'shift',
            tabDupli: [] , 
            qualification: '' , 
            listeNom: [] ,
            employe: {} ,
            startHour:'' , 
            endHour : '',
            avantage:'',
            comment :'',
            motif:'' , 
            testPause:false,
            isRepos: false,
            isAutre:false,
            isDuplicate:false,
            pause:15

        }
    }


    
    //traitement des donné du Personnel / processing of Personnel data
    componentDidMount(){
        this._fillTabName(data_personnel)
    }


    //methode pour retrouver les personne dans data_personnel avec l'id / method to find people in data_personnel with the id
    _findPerson(id) {
        let indice = data_personnel.findIndex(item => item.id === id)
        this.setState({employe: data_personnel[indice]})
        
    }

    //mise en forme du state list des perosnnes / formatting of the people’s state list
    _fillTabName(data_personnel) {

        let listeNom = this.state.listeNom.slice()
        data_personnel.forEach((item) => { 
            listeNom = listeNom.concat({label: item.name, value: item.id})
        })

        this.setState({listeNom: listeNom})
        
    }

    _checkBreak(){

        let startHour = moment().hour( parseInt(this.state.startHour.split('h')[0]) )
        let endHour = moment().hour( parseInt(this.state.endHour.split('h')[0]) )
        let diff = endHour.subtract(startHour) - 1 

        if(diff > 8  && this.state.pause < 45 ){
            return true
        }
        
    }


    //Vérifie les champs  / Checks the fields
    _verifField(){

        let testHours = /^(?:[01][0-9]|2[0-3])[-:h][0-5][0-9]$/
        this._checkBreak()
        if( isEmpty(this.state.employe) ){
            Alert.alert('Veuillez renseigner un employé ')
            return true
        }

        else if( this.state.qualification == '' ){
            Alert.alert('Veuillez renseigner une qualification')
            return true 
        }

        else if( this.state.isAutre && this.state.motif == '' ){
            Alert.alert('Veuillez renseigner un motif')
            return true 
        }

        else if( this.state.avantage == '' ){
            Alert.alert('Veuillez renseigner un avantage')
            return true 
        }

        else if( this.state.comment == '' ){
            Alert.alert('Veuillez renseigner un commentaire')
            return true 
        }

        else if( !( testHours.test(this.state.startHour) ) || !( testHours.test(this.state.endHour) )  ){
            Alert.alert("Le format de la date est incorrect 00h00 ")
            return true 
        }

        else if( this._checkBreak() || this.state.pause == '' ){
            Alert.alert("Le temps de travail require une pause plus grande")
            return true 
        }

        else {
            setPlanning ({

            date_heure_debut: '14:30',
            date_heure_fin: '14:35',
            pause:'45',
            absence : false,
            absence_motif : 'verhiuev',
            Commentaires : 'veuhvieuhti',
            personnel : 0,
        })

        }


    }

    //affiche la pause et l'additionne / displays pause and sum
    _pause(){
        if(this.state.testPause){
            return(
                <View style={{flexDirection: "row" }}>
                    <View style={{marginTop:'2%',marginLeft:'7%' , backgroundColor:'#5C5C5C' , width:'30%' , alignItems:'center' , borderRadius:15 , borderWidth:0.5,borderColor:'white' ,padding:'1%'}}>
                        <Text style={{color:'white'}}>{this.state.pause} minutes</Text>
                    </View>
                    <TouchableOpacity style={{marginLeft:'5%' , marginTop:'1%'}} onPress={()=>{this.setState({pause: this.state.pause + 15})}}>
                        <Text style={{color:'white' , fontSize:22}}>+</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        else{
            return(

                <TouchableOpacity onPress={()=>{this.setState({testPause: true})}}>
                    <Text style={{marginLeft:'10%' , marginTop:'2%' , color:'#5C5C5C' , fontSize:15}}>+ Ajouter une pause </Text>
                </TouchableOpacity>
            )
        }
    }

    //cherche l'index dans le planning / look for the index in the schedule
    _indexOf(date,month,agenda){
       
        let tmp = -1
        for(let i = 0 ; agenda[month].planning.length > i ; i++){

            if(agenda[month].planning[i].name.isSame(date)){
                tmp = i
            }
        }

        return tmp
        
    }


    //duplique le pplanning sur plusieurs jours / duplicates the schedule over several days
    _duplicate(month,date,agenda,obj){
        const weekdays = 'Sa_Di_Lu_Ma_Me_Je_Ve'.split('_')

        const tabDay = [

            weekdays[date.clone().add(1,'day').day()],
            weekdays[date.clone().add(2,'day').day()],
            weekdays[date.clone().add(3,'day').day()],
            weekdays[date.clone().add(4,'day').day()],
            weekdays[date.clone().add(5,'day').day()],
            weekdays[date.clone().add(6,'day').day()],
            weekdays[date.clone().add(7,'day').day()],

        ]

        let duplicateDay = []
        for(let i = 0 ; i< weekdays.length ; i++ ){

            if( this.state.checkBoxDay[tabDay[i]] ){
                duplicateDay.push(i+1)
            }
        }

        if(duplicateDay.length != 0 ){

            duplicateDay.forEach( (item) => {

                let indice = this._indexOf( date.clone().add(item,'day') , month , agenda )
    
                if( indice  == -1 ){
    
                    agenda[month].planning.push({
                        name:date.clone().add(item,'day'),
                        listEmploye: [obj]
                           
                    })
    
                }
                else{
                    agenda[month].planning[indice].listEmploye.push(obj)
                }
                
    
            })
           
        }
       


        
    }

    //ajoute l'element dans le Planning / adds the element in the Planning
    _addPlanning(month,date){

        if( this._verifField() ){
            return -1
        }

        else if( this.state.isRepos || this.state.isAutre ){
            if( agendaAbs[month] == undefined){
                console.log("HELLO 1")
                agendaAbs[month] = { planning: [] }
                agendaAbs[month].planning.push({
                    name:date,
                    listEmploye: [
                        {
                            nom: this.state.employe.firstName + " " + this.state.employe.name,
                            qualification: this.state.qualification,
                            reason: this.state.isRepos ? "repos" : this.state.motif
                        }
                    ]
                    
                })

            }

            else if ( this._indexOf(date, month , agendaAbs ) != -1 ){
                
                let indice = this._indexOf(date, month,agendaAbs )
                
                agendaAbs[month].planning[indice].listEmploye.push(

                    {
                        nom: this.state.employe.firstName + " " + this.state.employe.name,
                        qualification: this.state.qualification,
                        reason: this.state.isRepos ? "repos" : this.state.motif
                    }

                )
                

            }

            else{
                console.log("HELLO 3")
                agendaAbs[month].planning.push({
                    name:date,
                    listEmploye: [
                        {
                            nom: this.state.employe.firstName + " " + this.state.employe.name,
                            qualification: this.state.qualification,
                            reason: this.state.isRepos ? "repos" : this.state.motif
                        }
                    ]
                    
                })

            }

            var obj = {
                nom: this.state.employe.firstName + " " + this.state.employe.name,
                qualification: this.state.qualification,
                reason: this.state.isRepos ? "repos" : this.state.motif
            }

        }
        
        else {

                if( agenda[month] == undefined){
    
                    agenda[month] = { planning: [] }
                    agenda[month].planning.push({
                        name:date,
                        listEmploye: [
                        {
                            nom: this.state.employe.firstName + " " + this.state.employe.name,
                            qualification: this.state.qualification,
                            horraire: this.state.startHour + "-" + this.state.endHour,
                            pause : this.state.pause

                        }
                ]
                        
                    })
    
                }
    
                else if ( this._indexOf(date, month,agenda ) != -1 ){
    
                    let indice = this._indexOf(date, month ,agenda)
                    agenda[month].planning[indice].listEmploye.push(
    
                        {
                            nom: this.state.employe.firstName + " " + this.state.employe.name,
                            qualification: this.state.qualification,
                            horraire: this.state.startHour + "-" + this.state.endHour,
                            pause : this.state.pause
                        }
    
                    )
    
                }
    
                else{
    
                    agenda[month].planning.push({
                        name:date,
                        listEmploye: [
                            {
                                nom: this.state.employe.firstName + " " + this.state.employe.name,
                                qualification: this.state.qualification,
                                horraire: this.state.startHour + "-" + this.state.endHour,
                                pause : this.state.pause
                            }
                        ]
                        
                    })
    
                }
                var obj = {

                    nom: this.state.employe.firstName + " " + this.state.employe.name,
                    qualification: this.state.qualification,
                    horraire: this.state.startHour + "-" + this.state.endHour,
                    pause : this.state.pause
                }
                
        }
        this._duplicate(month,date,agenda,obj)
        this.props.navigation.navigate("Planningbis")
        


            
            
           
           
        
    }

    _isRepos(){
        if(this.state.isRepos){
            this.setState({isRepos: false})
        }
        else{
            this.setState({isRepos: true})
        }
    }

    _isAutre(){
       
        if(this.state.isAutre){
            this.setState({isAutre: false})
        }
        else{
            this.setState({isAutre: true})
        }
    }

    _isCheckDay(item){
        this.setState({isDuplicate: true})
        if(item == "Lu"){

            if(this.state.checkBoxDay.Lu){

                let checkBoxDay = {...this.state.checkBoxDay}
                checkBoxDay.Lu = false
                this.setState({checkBoxDay: checkBoxDay})
            }
            else{
                let checkBoxDay = {...this.state.checkBoxDay}
                checkBoxDay.Lu = true
                this.setState({checkBoxDay: checkBoxDay})
            }
        }

        else if(item == "Ma"){

            if(this.state.checkBoxDay.Ma){

                let checkBoxDay = {...this.state.checkBoxDay}
                checkBoxDay.Ma = false
                this.setState({checkBoxDay: checkBoxDay})
            }
            else{
                let checkBoxDay = {...this.state.checkBoxDay}
                checkBoxDay.Ma = true
                this.setState({checkBoxDay: checkBoxDay})
            }
        }

        else if(item == "Me"){

            if(this.state.checkBoxDay.Me){

                let checkBoxDay = {...this.state.checkBoxDay}
                checkBoxDay.Me = false
                this.setState({checkBoxDay: checkBoxDay})
            }
            else{
                let checkBoxDay = {...this.state.checkBoxDay}
                checkBoxDay.Me = true
                this.setState({checkBoxDay: checkBoxDay})
            }
        }

        else if(item == "Je"){

            if(this.state.checkBoxDay.Je){

                let checkBoxDay = {...this.state.checkBoxDay}
                checkBoxDay.Je= false
                this.setState({checkBoxDay: checkBoxDay})
            }
            else{
                let checkBoxDay = {...this.state.checkBoxDay}
                checkBoxDay.Je = true
                this.setState({checkBoxDay: checkBoxDay})
            }
        }

        else if(item == "Vr"){

            if(this.state.checkBoxDay.Vr){

                let checkBoxDay = {...this.state.checkBoxDay}
                checkBoxDay.Vr = false
                this.setState({checkBoxDay: checkBoxDay})
            }
            else{
                let checkBoxDay = {...this.state.checkBoxDay}
                checkBoxDay.Vr = true
                this.setState({checkBoxDay: checkBoxDay})
            }
        }

        else if(item == "Sa"){

            if(this.state.checkBoxDay.Sa){

                let checkBoxDay = {...this.state.checkBoxDay}
                checkBoxDay.Sa = false
                this.setState({checkBoxDay: checkBoxDay})
            }
            else{
                let checkBoxDay = {...this.state.checkBoxDay}
                checkBoxDay.Sa = true
                this.setState({checkBoxDay: checkBoxDay})
            }
        }

        else if(item == "Di"){

            if(this.state.checkBoxDay.Vr){

                let checkBoxDay = {...this.state.checkBoxDay}
                checkBoxDay.Di = false
                this.setState({checkBoxDay: checkBoxDay})
            }
            else{
                let checkBoxDay = {...this.state.checkBoxDay}
                checkBoxDay.Di = true
                this.setState({checkBoxDay: checkBoxDay})
            }
        }
      
    }

    _motifAutre(){
        if(this.state.isAutre){
            return(
                <TextInput 
                    placeholder="Motif" 
                    value={this.state.motif} 
                    style={{
                        marginTop: 20,
                        marginLeft:'6%',
                        width: '88%',
                        height: 65,
                        borderRadius: 5,
                        backgroundColor: 'white',
                        color: 'black',
                        paddingLeft: 28,
                        marginBottom: 2,
                    }} 
                    autoCorrect={false} 
                    onChangeText={(value)=>{this.setState({motif: value})}} 
                />
            )
        }
    }

    //Modifie et set le menue demander / Edit and set the requested menu
    _changeMenu(action){

        let isSelectShift = {...this.state.isSelectShift}
        let isSelectAbsence = {...this.state.isSelectAbsence}

        switch(action){

            case 'shift' : 

               isSelectShift['opacity'] = 1
               isSelectAbsence['opacity'] = 0.5
               this.setState({
                   isSelectShift: isSelectShift,
                   isSelectAbsence: isSelectAbsence,
                   menue: 'shift'
               })
               break
            
            case 'absence' : 
               isSelectAbsence['opacity'] = 1
               isSelectShift['opacity'] = 0.5
               this.setState({
                   isSelectShift: isSelectShift,
                   isSelectAbsence: isSelectAbsence,
                   menue : 'absence'               
                })
               break

        }

        
    }


    //Switch sur les differant menue Planning / Switch on the different Planning menu
    _createMenue(){

        if( this.state.menue == 'shift'){
            console.log('coucou')
            return(
                <>
                    <View style={{flexDirection: "row", marginTop: '5%' , marginLeft:'7%'}}>
                        <Text style={{color: "white", fontSize: 20}}>Horaires</Text>
                    </View>
                    <View style={{flexDirection: "row", marginTop: '1%' , marginLeft:'7%'}}>
                        <Text style={{color: "white", fontSize: 20 , marginTop:'10%'}}>de</Text>
                        <TextInput 
                            style={{
                                marginTop: 20,
                                margin: "3%",
                                width: '22%',
                                height: 55,
                                borderRadius: 10,
                                backgroundColor: 'white',
                                color: 'black',
                                paddingLeft: 28,
                                marginBottom: 2,
                                zIndex: 5
                            }}
                            placeholder=""
                            value={this.state.StartHour}
                            onChangeText={(value) => this.setState({startHour : value})}
                        />

                        <Text style={{color: "white", fontSize: 20 , marginTop:'10%'}}>à</Text>

                        <TextInput 
                            style={{
                                marginTop: 20,
                                margin: "3%",
                                width: '22%',
                                height: 55,

                                borderRadius: 10,
                                backgroundColor: 'white',
                                color: 'black',
                                paddingLeft: 28,
                                marginBottom: 2,
                                zIndex: 5
                            }}
                            placeholder=""
                            value={this.state.EndHour}
                            onChangeText={(value) => this.setState({endHour : value})}
                        />
                    </View>

                    <View style={{flexDirection: "row", marginTop: '5%' , marginLeft:'7%'}}>
                        <Text style={{color: "white", fontSize: 20}}>Pause</Text>
                    </View>

                    {this._pause()}

                </>

            )
        }

        if(this.state.menue == 'absence'){
            return(
                <>
                    <View style={{flexDirection: "row", marginTop: 15 , marginLeft:'7%'}}>
                        <Text style={{color: "white", fontSize: 20}}>Type d'absence</Text>
                    </View>

                    <View style={{flexDirection: "row", marginTop: '1%' , marginLeft:'7%'}}>
                            

                        <View>

                            <View style={{flexDirection: "row", marginTop: 15 , marginLeft:'7%'}}>
                                <CheckBox
                                        value={this.state.isRepos}
                                        onValueChange={()=>{this._isRepos()}}
                                />
                                <Text style={{color: "white", fontSize: 12 , marginTop:'7%'}}>Repos</Text>
                            </View>

                            <View style={{flexDirection: "row", marginTop: '5%', marginLeft:'7%'}}>
                                <CheckBox
                                        value={this.state.isAutre}
                                        onValueChange={()=>{this._isAutre()}}
                                />
                                <Text style={{color: "white", fontSize: 12 , marginTop:'7%'}}>Autre</Text>
                            </View>

                        </View>

                    </View>

                    {this._motifAutre()}
                </>
            )
            
        }
        
    }

    render(){

        const date = this.props.route.params.date.set({hour:0,minute:0,second:0,millisecond:0})
        const day = weekDay[date.day()]
        const numDay = date.get('date')-1
        const month = frenchMonth[date.month()]
        const year = date.year()

        const weekdaysMin = 'Sa_Di_Lu_Ma_Me_Je_Vr'.split('_')

        const tabDay = [

            weekdaysMin[date.clone().add(1,'day').day()],
            weekdaysMin[date.clone().add(2,'day').day()],
            weekdaysMin[date.clone().add(3,'day').day()],
            weekdaysMin[date.clone().add(4,'day').day()],
            weekdaysMin[date.clone().add(5,'day').day()],
            weekdaysMin[date.clone().add(6,'day').day()],
            weekdaysMin[date.clone().add(7,'day').day()],

        ]

        return(
            <ScrollView style={{flex:1, width: windowWidth ,height : '400%'}}>

                <View style={{width:windowWidth , backgroundColor:"#3C3C3C" , height: '300%' }}>

                        <View style={{flexDirection: "row", marginTop: 15 , justifyContent:'center'}}>
                            <Text style={{color: "white", fontSize: 20}}>{day} {numDay} {month} {year}</Text>
                        </View>

                        <View style={{flexDirection: "row", marginTop: 15,justifyContent:'center'}}>

                            <TouchableOpacity style={{marginLeft:'15%' , marginTop:'1%'}} onPress={()=> this._changeMenu("shift") } >
                                <Text style={[{color: "white", fontSize: 15 , marginLeft:'15%' , marginTop:'1%'},this.state.isSelectShift]}>Shift</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{marginLeft:'15%' , marginTop:'1%'}} onPress={()=> {/*this._changeMenu("absence") */}} >
                                <Text style={[{color: "white", fontSize: 15, marginLeft:'45%', marginTop:'1%'},this.state.isSelectAbsence]}>Absence</Text>
                            </TouchableOpacity>

                        </View>

                        <Text style={{borderBottomWidth: 0.5 , borderColor: 'white'}}/>


                        <View style={{flexDirection: "row", marginTop: 15 , marginLeft:'7%'}}>
                            <Text style={{color: "white", fontSize: 20}}>Salarié</Text>
                        </View>

                        <View style = {{
                                alignItems: 'center',
                                ...(Platform.OS !== 'android' && {
                                    zIndex: 10
                                    })
                                }
                                
                                }
                        >


                            <DropDownPicker
                                
                                placeholder="Nom du Salarié"
                                items={[{label: 'personnel', value:'personnel'}]}
                                style = {{backgroundColor: 'white'}}
                                containerStyle= {
                                    {   
                                        marginTop : 23,
                                        height:55,
                                        width:'88%',  
                                    }
                                }
                                dropDownStyle = {{backgroundColor: 'white'}}
                                placeholderStyle={{color: 'black', fontSize: 16}}
                                labelStyle = {{color:'black', fontSize: 16 }}
                                arrowColor = {'black'}
                                onChangeItem={ (item) => {this._findPerson(item.value)}}
                            />

                            <DropDownPicker
                        
                                placeholder= "Poste"
                                items={this.state.qualifications}
                                style = {{backgroundColor: 'white'}}
                                containerStyle= {
                                    {   
                                        marginTop : 23,
                                        height:55,
                                        width:'88%',
                                        
                                    }
                                }
                                dropDownStyle = {{backgroundColor: 'white'}}
                                placeholderStyle={{color: 'black', fontSize: 16}}
                                labelStyle = {{color:'black', fontSize: 16 }}
                                arrowColor = {'black'}
                                onChangeItem={ (item) => this.setState({qualification: item.value})}
                            />

                        </View>
                        
                        {this._createMenue()}
                        
                        <View style={{flexDirection: "row", marginTop: '5%' , marginLeft:'7%'}}>
                            <Text style={{color: "white", fontSize: 20}}>Avantage</Text>
                        </View>

                        <View style = {{
                                alignItems: 'center',
                                ...(Platform.OS !== 'android' && {
                                    zIndex: 10
                                    })
                                }
                                
                                }
                        >


                            <DropDownPicker
                                
                                placeholder="Avantages en nature"
                                items={this.state.avantageType}
                                style = {{backgroundColor: 'white'}}
                                containerStyle= {
                                    {   
                                        marginTop : 23,
                                        height:55,
                                        width:'88%',  
                                    }
                                }
                                dropDownStyle = {{backgroundColor: 'white'}}
                                placeholderStyle={{color: 'black', fontSize: 16}}
                                labelStyle = {{color:'black', fontSize: 16 }}
                                arrowColor = {'black'}
                                onChangeItem={ (item) => {this.setState({avantage: item.value})}}
                            />

                        </View>

                        <TextInput 
                            placeholder="Commentaires" 
                            value={this.state.comment} 
                            style={{
                                marginTop: 20,
                                marginLeft:'6%',
                                width: '88%',
                                height: 55,
                                borderRadius: 5,
                                backgroundColor: 'white',
                                color: 'black',
                                paddingLeft: 28,
                                marginBottom: 2,
                            }} 
                            autoCorrect={false} 
                            onChangeText={(value)=>{this.setState({comment: value})}} 
                        />

                        <View style={{flexDirection: "row", marginTop: 15 , justifyContent:'center'}}>
                            <Text style={{color: "white", fontSize: 20}}>Dupliquer le planning</Text>
                        </View>


                        
                        <View style={{flexDirection: "row", marginTop: 15 , justifyContent:'center', marginLeft: '20%'}}>
                           
                        <FlatList
                            data={tabDay}
                            horizontal={true}
                            renderItem={({item}) => (
                                
                                <View >
                                    <Text style={{marginLeft:'2%' , color:'white',textAlign:'center'}}>{item}</Text>
                                    <CheckBox
                                        value={this.state.checkBoxDay[item]}
                                        onValueChange={()=>{this._isCheckDay(item)}}
                                    />
                                </View>
                                    
                            )}
                    />

                            
                                        
                            
                        </View>

                   <View style={{ alignItems: "center"}}>
                        <TouchableOpacity onPress = {() => { this._addPlanning(month,date) }} style={[Theme.buttonsV2.touchAble,{ marginTop:'5%'}]} >
                            <LinearGradient elevation={5} colors={['#696969' , '#595959' , '#494949']} style = {Theme.buttonsV2.linearGradientb}>
                                <Text style={Theme.buttonsV2.buttonText}>
                                    Valider
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        </View>

                    </View>

                   

            </ScrollView>
        )
    }
}