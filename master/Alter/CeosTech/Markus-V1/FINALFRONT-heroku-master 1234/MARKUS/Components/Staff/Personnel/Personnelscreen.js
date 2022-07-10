import React, { Component } from 'react';
import {
    FlatList, StyleSheet, Text, View, Image, Alert, Platform, Dimensions, TouchableOpacity
} from 'react-native';
import flatListData from './data/flatListData';
import Swipeout from 'react-native-swipeout';
import AddModal from './Modal/AddModal';
import EditModal from './Modal/EditModal';
import { showEditModal } from './Modal/EditModal';
import DetailModal from './Modal/DetailModal';
import { Dropdown } from 'react-native-material-dropdown';
import { item } from './data/itemFilter';
import GoToButton from './GoToButton';
import LinearGradient from "react-native-linear-gradient";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { verifStaff, componentDidMount } from './Personnelscreen';
import {loadStaff, getPersonnel, deletePersonnel} from '../../../API/StaffData';
import {Swipeable} from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPhone, faFax, faEnvelopeOpen, faMapPin, faAddressBook, faTruck } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp} from '@fortawesome/free-solid-svg-icons';
import FlatListItem from './PersonnelItem';
//import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import { connect } from 'react-redux';
const mapStateToProps = (state) => ({
    restaurantOwnerDetails: state.accountsData.restaurantOwnerDetails
})


const phoneWidth = Dimensions.get('window').width;
let validEditModal = false;

 
class Personnelscreen extends React.Component {
    constructor(props) {
        super(props);
        this.ico = {
           warning: require('../../../Assets/ico/Vector.png')
       };
        this.state = ({
            deletedRowKey: null,
            staff: [],
            //staff: flatListData,
            isNoPersonnels: false,
        });
        /* this._onPressAdd = this._onPressAdd.bind(this); */
    }
    refreshFlatList = (activeKey, val) => {
        this._dataRefresh();
        this.setState((prevState) => {
            return {
                deletedRowKey: activeKey
            };
        });
        //this.refs.flatList.scrollToEnd();
    }
    // update de la fonc fonctionnel
    verifStaff(val){
        this.setState({staff: val})
        console.log("------------------------------------------" + JSON.parse(val));
        console.log(val.length)
        console.log(this.props.item)
        if(val.length == 0){
            this.setState({ isNoPersonnels: true })
        }
        else{
            this.setState({ isNoPersonnels: false })
        }
    }

    _dataRefresh(){
        getPersonnel().then(data =>{this.verifStaff(data)})
    }

    componentDidMount() {
      this._dataRefresh();
          this._unsubscribe = this.props.navigation.addListener('focus', () => 
          {  
            this._dataRefresh();
          });
      }
 
    componentWillUnmount() 
    {
        this._unsubscribe();
    }
    
    _validEditModal(){
        validEditModal = true;
    }
    
    _returnValidEditModal(){
        return validEditModal;
    }
    
    _removePersonnel(id){
        deletePersonnel(id).then(this._dataRefresh());   
    }

   /*  delete(){
        parentFlatList.removePersonnel(this.personnel.id)
     }
    removePersonnel(staff_id){
        deletePersonnel(staff_id)
        .then(()=>{
            let new_list = this.state.staff.filter(staff => staff.id !== staff_id)
                this.setState({
                    staff: new_list
                })
        })
            .catch(error=>{
            console.log("error when deleting personnel with id :: ", staff_id)
            })
        } */

    /* _onPressAdd() {
        this.refs.addModal.showAddModal();
    } */
    
    
    
    _goTo = (action) => {
      switch (action) {
        case "EditPersonnel":
          this.props.navigation.navigate("EditPersonnel");
          break;

      }
    };

    render() {
    //console.log(this.props);
        return (

            <View style={styles.mainContainer}>

                <TouchableOpacity style={styles.button} onPress={() => this._goTo("EditPersonnel")}>
                    <AntDesign name="adduser" size={20}  color={'#04295D'} style={styles.buttonIcon}/>
                    <Text  style={styles.buttonText}>Créer fiche salarié</Text>
                </TouchableOpacity>

                <View style={styles.line} ></View>

                {this.state.isNoPersonnels ?
                    <View
                        style={{
                            alignItems: 'center',
                            //backgroundColor: "red",
                            flex: 1
                        }}>
                        <Image
                            resizeMode="contain"
                            source = {this.ico.warning}
                            style={{
                                marginTop: '5%',
                                maxWidth: 100, // à modif
                                minHeight: 61,
                                width: "50%",
                                height: "8%",
                                //backgroundColor: "red"
                            }}/>
                        <Text
                            style={{
                                marginTop: '2%',
                                textAlign: 'center',
                                fontSize: 15,
                                color: '#04295D',
                            }}>
                            Vous n'avez pas encore ajouté de personnel.
                        </Text>
                    </View>
                : 
                    <FlatList
                        ref={"flatList"}
                        data={this.state.staff}
                        style={styles.flatList}
                        renderItem={({ item }) => {
                            return (
                                <FlatListItem staff={item} parentFlatList={this} navigation={this.props.navigation}/>
                            )
                        }}
                    />
                }

               

                <AddModal ref={'addModal'} parentFlatList={this} >
                </AddModal>

                {/* <EditModal 
                    ref={'editModal'} 
                    parentFlatList={this} 
                    //restaurantId= {this.props.restaurantOwnerDetails[0]["restaurant"]["id"]}
                >
                </EditModal> */}

                <DetailModal ref={'detailModal'} parentFlatList={this}>
                </DetailModal>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1, 
        backgroundColor: 'white', //#04295D 
        marginTop: Platform.OS === 'ios' ? 34 : 0
    },
    button: {
        width: "50%",
        maxWidth: 200,
        //backgroundColor: "yellow",
        flexDirection: "row",
        flexWrap:"wrap",
        justifyContent: "space-evenly",
        alignSelf: "flex-end",
        marginHorizontal: "1%",
        marginTop: "4%",
        marginBottom: "3%"
    },
    line:{
        borderColor: "#04295D",
        borderWidth: 0.25,
        width: "95%",
        alignSelf: "center"
    },
    buttonIcon: {
        //backgroundColor: "red"
    },
    buttonText: {
        color: '#04295D',
        fontWeight: '700',
        fontSize: 16,
        //backgroundColor: "lightblue"
    },
    flatList: {
        flex:1,
        //backgroundColor: "red",
        padding: "2%"
    }
});


export default connect(mapStateToProps)(Personnelscreen);
