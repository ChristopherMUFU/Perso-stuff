import React from 'react';
import { Dimensions, Image, Text, View, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import * as Theme from '../Styles/Theme';
import Chart from './Chart';
import Svg, {Circle } from 'react-native-svg';
import { _dataPerDay, _repartition } from '../../API/RestaurantData'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrophy} from '@fortawesome/free-solid-svg-icons';
import { faCloudSun } from '@fortawesome/free-solid-svg-icons'
import { faCloudMoon } from '@fortawesome/free-solid-svg-icons'
import { faEuroSign } from '@fortawesome/free-solid-svg-icons'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'

import CalendarStrip from 'react-native-calendar-strip';
import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';


const plat = [{ title : "Entrecôte 350g", img: require('../../Assets/img/entrecote.jpg'), price: "23.90€", nb: "500", totalPrixVente: '11 950€'},
    { title : "Rumsteak mariné", img: require('../../Assets/img/rumsteack.jpg'), price: "14.90€", nb: "456", totalPrixVente: '6 794,40€'},
    { title: "Côte de boeuf 1kg", img: require('../../Assets/img/coteboeuf.jpg'), price: "50€", nb: "214", totalPrixVente: '10 700€'}
]

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Main extends React.Component{

    constructor(props) {
        super(props);
        this.data = null
        this.state = { 
            scroll1: 0,
            scroll2: 0,
            scroll3: 0,
            scroll4:0,
            data : {
                repartition: null,
                bestsell: null
            },
            selection: 0,
            selectedDate: "2020-06-22",
        };
    }

    componentDidMount(){
        _repartition().then( (take) => { this.setState({data: {repartition: take}})})
        
    }

    /* Calendar link */
    selectedDate(){
        var day = this.state.selectedDate.split('')[0]+this.state.selectedDate.split('')[1]
        if(day > 22 && day < 29){
            this.setState({selection: day - 22})
        }
        if(day == 22){
            this.setState({selection: 0})
        }
        console.log(day)
    }

    render(){
        
        return(
            <View style={Theme.styles.container}>
                <View style={{width: "100%", height:"29%", backgroundColor: "#3C3C3C", alignItems: 'center', marginBottom: '5%'}}>
                    <Text style={[Theme.styles.title, {fontWeight: 'bold', marginTop: '5%'}]}>
                        MAIN<Text style={{ color: "#6ed6ff", fontSize: 40}}>.</Text>
                    </Text>
                    <View style={{top: 100, width: "100%", zIndex: 2, position: "absolute"}}>
                        <CalendarStrip
                            scrollable
                            style={{height:'100%', paddingBottom: 10}}
                            calendarHeaderStyle={{color: 'white'}}
                            calendarColor={ "#3C3C3C"}
                            dateNumberStyle={{color: 'white'}}
                            dateNameStyle={{color: 'white'}}
                            highlightDateNameStyle={{color: "white"}}
                            highlightDateNumberStyle={{color: "white"}}
                            daySelectionAnimation={{type: 'background', duration: 20, highlightColor: "#3BB9E0"}}
                            onDateSelected={(date)=>{this.setState({selectedDate: date.format('DD-MM-YYYY')});; this.selectedDate()}}
                            iconContainer={{flex: 0.05, color: "red"}}
                            iconLeft={require('../../Assets/img/white-arrow-transparent-png-1.png')}
                            iconRight={require('../../Assets/img/white-arrow-transparent-png-1-right.png')}
                            selectedDate={this.state.selectedDate}
                            maxDate="2050-01-01T00:00:00.000Z"
                        />
                    </View>
                </View>

                <ScrollView >

                    <View style={Theme.styles.container}>
                        
                        <ScrollView snapToInterval={windowWidth} decelerationRate={0.5} onScroll={(e) => {this.setState( {scroll1: e.nativeEvent.contentOffset.x}); }} showsHorizontalScrollIndicator={false} horizontal >
                            
                            <View style={{width: windowWidth}}>
                                <View style={Theme.styles.box1}>
                                    <LinearGradient elevation={5} colors={['#696969' , '#595959' , '#494949', '#393939', '#292929']} style={{borderRadius: 7, padding: '3%'}}>
                                        <Text style={{color:"white", fontSize:20}}>Total CA (€)</Text>
                                        <View style={{flexDirection: "row", justifyContent: 'center', marginTop: '2%' }}>
                                            <Text style= {{fontSize: 50, color: '#3BB9E0', fontWeight: 'bold', textAlign: 'center'}}>1567</Text>
                                            <FontAwesomeIcon icon={ faEuroSign } style ={{color: "white", top: "1.5%", marginHorizontal:'2%', color: '#3BB9E0'}}/>
                                        </View>
                                        
                                        <View style={{flexDirection: "row", justifyContent: 'space-around' }}>
                                            <View style={{flexDirection: "row", alignItems:'center' }}>
                                                <View style={{marginTop: '20%'}}>
                                                    <FontAwesomeIcon icon={ faCloudSun } style ={{ top: "1.5%", marginHorizontal:'5%', color: '#90D9F1'}}/>
                                                    <Text style={{color: '#90D9F1'}}>Midi</Text>
                                                </View>
                                                <View style={{height: 30, marginLeft:'1%'}}>
                                                    <View style={{flexDirection: "row", justifyContent: 'center' }}>
                                                        <Text style= {{fontSize: 20, color: '#90D9F1', fontWeight: 'bold', textAlign: 'center'}}>1253,6</Text>
                                                        <FontAwesomeIcon icon={ faEuroSign } style ={{color: "white", top: "1.5%", marginHorizontal:'2%', color: '#90D9F1'}} size={10}/>
                                                    </View>
                                                    
                                                    <Progress.Bar progress={0.8} width={80} height={15} borderRadius={7} color={'#90D9F1'} />
                                                </View>                                                
                                                
                                            </View>

                                            <View style={{flexDirection: "row", alignItems:'center' }}>
                                                <View style={{marginTop: '20%'}}>
                                                    <FontAwesomeIcon icon={ faCloudMoon } style ={{top: "1.5%", marginHorizontal:'5%', color: '#0490BE'}}/>
                                                    <Text style={{color: '#0490BE'}}>Soir</Text>
                                                </View>                                                
                                                <View style={{height: 30, marginLeft:'1%'}}>
                                                    <View style={{flexDirection: "row", justifyContent: 'center' }}>
                                                        <Text style= {{fontSize: 20, color: '#0490BE', fontWeight: 'bold', textAlign: 'center'}}>313,4</Text>
                                                        <FontAwesomeIcon icon={ faEuroSign } style ={{color: "white", top: "1.5%", marginHorizontal:'2%', color: '#0490BE'}} size={10}/>
                                                    </View>
                                                    
                                                    <Progress.Bar progress={0.3} width={80} height={15} borderRadius={7} color={'#0490BE'}/>
                                                </View>
                                            </View>
                                                                                            
                                        </View>
                                        
                                    </LinearGradient>
                                </View>
                            </View>
                            
                            
                            <View style={{width: windowWidth}}>
                                
                                <View style={Theme.styles.box1}>
                                <LinearGradient elevation={5} colors={['#696969' , '#595959' , '#494949', '#393939', '#292929']} style={{borderRadius: 7, padding: '3%'}}>
                                        <Text style={{color:"white", fontSize:20}}>Total CA (couverts)</Text>
                                        <View style={{flexDirection: "row", justifyContent: 'center', marginTop: '2%' }}>
                                            <Text style= {{fontSize: 50, color: '#3BB9E0', fontWeight: 'bold', textAlign: 'center'}}>1567</Text>
                                            <FontAwesomeIcon icon={ faEuroSign } style ={{color: "white", top: "1.5%", marginHorizontal:'2%', color: '#3BB9E0'}}/>
                                        </View>
                                        
                                        <View style={{flexDirection: "row", justifyContent: 'space-around' }}>
                                            <View style={{flexDirection: "row", alignItems:'center' }}>
                                                <View style={{marginTop: '20%'}}>
                                                    <FontAwesomeIcon icon={ faCloudSun } style ={{ top: "1.5%", marginHorizontal:'5%', color: '#90D9F1'}}/>
                                                    <Text style={{color: '#90D9F1'}}>Midi</Text>
                                                </View>
                                                <View style={{height: 30, marginLeft:'1%'}}>
                                                    <View style={{flexDirection: "row", justifyContent: 'center' }}>
                                                        <Text style= {{fontSize: 20, color: '#90D9F1', fontWeight: 'bold', textAlign: 'center'}}>50</Text>
                                                        
                                                    </View>
                                                    
                                                    <Progress.Bar progress={0.8} width={80} height={15} borderRadius={7} color={'#90D9F1'} />
                                                </View>                                                
                                                
                                            </View>

                                            <View style={{flexDirection: "row", alignItems:'center' }}>
                                                <View style={{marginTop: '20%'}}>
                                                    <FontAwesomeIcon icon={ faCloudMoon } style ={{top: "1.5%", marginHorizontal:'5%', color: '#0490BE'}}/>
                                                    <Text style={{color: '#0490BE'}}>Soir</Text>
                                                </View>                                                
                                                <View style={{height: 30, marginLeft:'1%'}}>
                                                    <View style={{flexDirection: "row", justifyContent: 'center' }}>
                                                        <Text style= {{fontSize: 20, color: '#0490BE', fontWeight: 'bold', textAlign: 'center'}}>15</Text>
                                                        
                                                    </View>
                                                    
                                                    <Progress.Bar progress={0.3} width={80} height={15} borderRadius={7} color={'#0490BE'}/>
                                                </View>
                                            </View>
                                                                                            
                                        </View>
                                        
                                    </LinearGradient>
                                </View>
                                
                            </View>
                        </ScrollView> 
                        <View style={Theme.styles.container}>                         
                            <Svg style={{ flexDirection: 'row', borderWidth: 10, borderColor: 'transparent'}}>
                                <Circle
                                    cx="48.5%"
                                    cy="82%"
                                    r="3"
                                    fill={this.state.scroll1 < Dimensions.get('window').width / 2 ? "white" : "grey"}
                                />

                                <Circle
                                    cx="51.5%"
                                    cy="82%"
                                    r="3"
                                    fill={this.state.scroll1 >= Dimensions.get('window').width / 2 ? "white" : "grey"}
                                />
                            </Svg>
                        </View>
                    </View>
                    

                    <View style={Theme.styles.container}>
                        
                        <ScrollView snapToInterval={Dimensions.get('window').width} decelerationRate={0.5} onScroll={(e) => {this.setState( {scroll2: e.nativeEvent.contentOffset.x}); }} showsHorizontalScrollIndicator={false} horizontal>
                            
                            <View style={{width: windowWidth}}>
                                <View style={Theme.styles.box1}>
                                    <LinearGradient elevation={5} colors={['#696969' , '#595959' , '#494949', '#393939', '#292929']} style={{borderRadius: 7, padding: '3%'}}>
                                        <Text style={{color:"white", fontSize:20}}>Répartition CA (€)</Text>
                                        <Chart data={this.state.data.repartition} selection={this.state.selection}/>
                                    </LinearGradient>
                                </View>
                            </View>                               
                        
                            <View style={{width: windowWidth}}>
                                <View style={Theme.styles.box1}>
                                    <LinearGradient elevation={5} colors={['#696969' , '#595959' , '#494949', '#393939', '#292929']} style={{borderRadius: 7, padding: '3%'}}>
                                        <Text style={{color:"white", fontSize:20}}>Répartition CA (%)</Text>
                                        <Chart data={this.state.data.repartition} type="%" selection={this.state.selection}/>
                                    </LinearGradient>
                                </View>
                            </View>
                                                
                        </ScrollView>    
                        <View style={Theme.styles.container}>                         
                            <Svg style={{ flexDirection: 'row', borderWidth: 10, borderColor: 'transparent'}}>
                                <Circle
                                    cx="48.5%"
                                    cy="82%"
                                    r="3"
                                    fill={this.state.scroll2 < Dimensions.get('window').width / 2 ? "white" : "grey"}
                                />

                                <Circle
                                    cx="51.5%"
                                    cy="82%"
                                    r="3"
                                    fill={this.state.scroll2 >= Dimensions.get('window').width / 2 ? "white" : "grey"}
                                />
                            </Svg>
                        </View>                
                    
                    </View>

                    <View style={Theme.styles.container}>
                        <ScrollView snapToInterval={Dimensions.get('window').width} decelerationRate={0.5} onScroll={(e) => {this.setState( {scroll3: e.nativeEvent.contentOffset.x}); }} showsHorizontalScrollIndicator={false} horizontal>
                            <View style={{width: windowWidth, flexDirection: 'row', paddingHorizontal: '0.5%'}}>
                                <View style={Theme.styles.box2}>
                                    <LinearGradient elevation={5} colors={['#696969' , '#595959' , '#494949', '#393939', '#292929']} style={{borderRadius: 7, padding: '3%'}}>
                                        <Text style={{color:"white", fontSize:20}}>Ticket Moyen</Text>
                                        <View style={{flexDirection: "row", justifyContent: 'center', marginTop: '2%' }}>
                                            <View style={{flexDirection: "row", flex: 4, justifyContent: 'center'}}>
                                                <Text style= {{fontSize: 50, color: '#0490BE', fontWeight: 'bold', textAlign: 'center'}}>45</Text>
                                                <FontAwesomeIcon icon={ faEuroSign } style ={{ top: "1.5%", marginHorizontal:'2%', color: '#0490BE'}}/>
                                            </View>
                                            <View style={{justifyContent:'flex-end', flex: 1}}>
                                                <FontAwesomeIcon icon={ faCoins } style ={{top: "1.5%", marginHorizontal:'5%', color: '#0490BE', opacity: 0.6}} size={30}/>
                                            </View>
                                        </View>
                                    </LinearGradient>
                                </View>
                                <View style={Theme.styles.box2}>
                                    <LinearGradient elevation={5} colors={['#696969' , '#595959' , '#494949', '#393939', '#292929']} style={{borderRadius: 7, padding: '3%'}}>
                                        <Text style={{color:"white", fontSize:20}}>Panier Moyen</Text>
                                        <View style={{flexDirection: "row", marginTop: '2%' }}>
                                            <View style={{flexDirection: "row", flex: 4, justifyContent: 'center'}}>
                                                <Text style= {{fontSize: 50, color: '#90D9F1', fontWeight: 'bold', textAlign: 'center'}}>22</Text>
                                                <FontAwesomeIcon icon={ faEuroSign } style ={{ top: "1.5%", marginHorizontal:'2%', color: '#90D9F1'}}/>
                                            </View>
                                            <View style={{justifyContent:'flex-end', flex: 1}}>
                                                <FontAwesomeIcon icon={ faShoppingBasket } style ={{top: "1.5%", marginHorizontal:'5%', color: '#0490BE', opacity: 0.6}} size={30}/>
                                            </View>
                                        </View>
                                        
                                    </LinearGradient>
                                </View>
                            </View>

                            <View style={{width: windowWidth, flexDirection: 'row', paddingHorizontal: '0.5%'}}>
                                <View style={Theme.styles.box2}>
                                    <LinearGradient elevation={5} colors={['#696969' , '#595959' , '#494949', '#393939', '#292929']} style={{borderRadius: 7, padding: '3%'}}>
                                        <Text style={{color:"white", fontSize:20}}>Midi</Text>
                                        <View style={{flexDirection: "row", justifyContent: 'center', marginTop: '2%' }}>
                                            <View style={{flexDirection: "row", flex: 4, justifyContent: 'center'}}>
                                                <Text style= {{fontSize: 50, color: '#0490BE', fontWeight: 'bold', textAlign: 'center'}}>45</Text>
                                                <FontAwesomeIcon icon={ faEuroSign } style ={{ top: "1.5%", marginHorizontal:'2%', color: '#0490BE'}}/>
                                            </View>
                                            <View style={{justifyContent:'flex-end', flex: 1}}>
                                                <FontAwesomeIcon icon={ faCoins } style ={{top: "1.5%", marginHorizontal:'5%', color: '#0490BE', opacity: 0.6}} size={30}/>
                                            </View>
                                        </View>
                                    </LinearGradient>
                                </View>
                                <View style={Theme.styles.box2}>
                                    <LinearGradient elevation={5} colors={['#696969' , '#595959' , '#494949', '#393939', '#292929']} style={{borderRadius: 7, padding: '3%'}}>
                                        <Text style={{color:"white", fontSize:20}}>Midi</Text>
                                        <View style={{flexDirection: "row", marginTop: '2%' }}>
                                            <View style={{flexDirection: "row", flex: 4, justifyContent: 'center'}}>
                                                <Text style= {{fontSize: 50, color: '#90D9F1', fontWeight: 'bold', textAlign: 'center'}}>22</Text>
                                                <FontAwesomeIcon icon={ faEuroSign } style ={{ top: "1.5%", marginHorizontal:'2%', color: '#90D9F1'}}/>
                                            </View>
                                            <View style={{justifyContent:'flex-end', flex: 1}}>
                                                <FontAwesomeIcon icon={ faShoppingBasket } style ={{top: "1.5%", marginHorizontal:'5%', color: '#0490BE', opacity: 0.6}} size={30}/>
                                            </View>
                                        </View>
                                        
                                    </LinearGradient>
                                </View>
                            </View>

                            <View style={{width: windowWidth, flexDirection: 'row', paddingHorizontal: '0.5%'}}>
                                <View style={Theme.styles.box2}>
                                    <LinearGradient elevation={5} colors={['#696969' , '#595959' , '#494949', '#393939', '#292929']} style={{borderRadius: 7, padding: '3%'}}>
                                        <Text style={{color:"white", fontSize:20}}>Soir</Text>
                                        <View style={{flexDirection: "row", justifyContent: 'center', marginTop: '2%' }}>
                                            <View style={{flexDirection: "row", flex: 4, justifyContent: 'center'}}>
                                                <Text style= {{fontSize: 50, color: '#0490BE', fontWeight: 'bold', textAlign: 'center'}}>45</Text>
                                                <FontAwesomeIcon icon={ faEuroSign } style ={{ top: "1.5%", marginHorizontal:'2%', color: '#0490BE'}}/>
                                            </View>
                                            <View style={{justifyContent:'flex-end', flex: 1}}>
                                                <FontAwesomeIcon icon={ faCoins } style ={{top: "1.5%", marginHorizontal:'5%', color: '#0490BE', opacity: 0.6}} size={30}/>
                                            </View>
                                        </View>
                                    </LinearGradient>
                                </View>
                                <View style={Theme.styles.box2}>
                                    <LinearGradient elevation={5} colors={['#696969' , '#595959' , '#494949', '#393939', '#292929']} style={{borderRadius: 7, padding: '3%'}}>
                                        <Text style={{color:"white", fontSize:20}}>Soir</Text>
                                        <View style={{flexDirection: "row", marginTop: '2%' }}>
                                            <View style={{flexDirection: "row", flex: 4, justifyContent: 'center'}}>
                                                <Text style= {{fontSize: 50, color: '#90D9F1', fontWeight: 'bold', textAlign: 'center'}}>22</Text>
                                                <FontAwesomeIcon icon={ faEuroSign } style ={{ top: "1.5%", marginHorizontal:'2%', color: '#90D9F1'}}/>
                                            </View>
                                            <View style={{justifyContent:'flex-end', flex: 1}}>
                                                <FontAwesomeIcon icon={ faShoppingBasket } style ={{top: "1.5%", marginHorizontal:'5%', color: '#0490BE', opacity: 0.6}} size={30}/>
                                            </View>
                                        </View>
                                        
                                    </LinearGradient>
                                </View>
                            </View>

                        </ScrollView>
                        <View style={Theme.styles.container}>                         
                            <Svg style={{ flexDirection: 'row', borderWidth: 10, borderColor: 'transparent'}}>
                                <Circle
                                    cx="47%"
                                    cy="82%"
                                    r="3"
                                    fill={this.state.scroll3 < Dimensions.get('window').width  ? "white" : "grey"}
                                />

                                <Circle
                                    cx="50%"
                                    cy="82%"
                                    r="3"
                                    fill={this.state.scroll3 === Dimensions.get('window').width  ? "white" : "grey"}
                                />

                                <Circle
                                    cx="53%"
                                    cy="82%"
                                    r="3"
                                    fill={this.state.scroll3 > Dimensions.get('window').width  ? "white" : "grey"}
                                />
                            </Svg>
                        </View>
                    </View>

                    <View style={Theme.styles.container}>
                        <View style={{flexDirection: "row", marginBottom: "8%"}}> 
                            <FontAwesomeIcon icon={ faTrophy } style ={{color: "white", top: "1.5%"}}/>
                            <Text style={[Theme.styles.text, {fontWeight:'bold'}]}> Meilleures ventes </Text>
                            <FontAwesomeIcon icon={ faTrophy } style ={{color: "white", top: "1.5%"}}/>
                        </View>
                    </View>

                    <View style={Theme.styles.container}>
                        <View style={{width : windowWidth, height: '100%', marginBottom: "10%"}}>
                            <FlatList
                                data = {plat}   
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) =>
                                    <LinearGradient elevation={5} colors={['#696969' , '#595959' , '#494949', '#393939', '#292929']} style={Theme.styles.minibox}>
                                        
                                            <Image source={item.img} style={{flex: 6, width: "100%", borderTopWidth: 1, borderTopLeftRadius: 7, borderTopRightRadius: 7}}/>
                                            <View style={{flex: 1, flexDirection: "row", justifyContent: 'space-between', paddingHorizontal: '2%'}}>                                           
                                                <Text style={{color: "white", fontSize: 12}}>{item.title}</Text>                                      
                                                <Text style={{color: "white", fontSize: 12}}>{item.price}</Text>
                                            </View>
                                            <View style={{flex: 2, flexDirection: "row", justifyContent: 'space-between', paddingHorizontal: '2%'}}>
                                                <View style={{flex: 1, flexDirection: "row"}}>
                                                    <FontAwesomeIcon icon={ faUtensils } style ={{top: "1.5%", color: '#0490BE'}} size={15}/>
                                                    <Text style={{color: "white", fontSize: 15, paddingLeft: '1%'}}>{item.nb}</Text>
                                                </View>
                                                <View style={{alignItems: 'center'}}>
                                                    <Text style={{color: "white", fontSize: 20, top: "15%"}}>{item.totalPrixVente}</Text>
                                                </View>
                                                
                                            </View>
                                    
                                    </LinearGradient>
                                }
                                keyExtractor={item => item.title}
                            />
                            
                        </View>
                        
                    </View>
                    
                </ScrollView>
            </View>
        );
    }

}