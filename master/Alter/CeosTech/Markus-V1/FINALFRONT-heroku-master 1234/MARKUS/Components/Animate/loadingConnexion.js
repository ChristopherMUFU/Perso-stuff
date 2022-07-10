import React from 'react';
import { View, Animated, Easing, Image, StyleSheet} from 'react-native';

export default class loadingConnexion extends React.Component {
    
  constructor(props) {
    super(props)
    this.state = {
      topPosition: new Animated.Value(110),
      visible: new Animated.Value(0)
    }
  }

  componentDidMount() {
    Animated.sequence([
      Animated.timing(
        this.state.visible,
        {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(
          this.state.topPosition,
          {
            toValue: 0,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true
          }
      )
    ]).start()
  }
  
  render() {
    const transformStyle ={
      transform : [{ 
        translateY : this.state.topPosition,
      }]
    }
    const logo = require('../../Assets/img/MARKUS-logo.png');
    return (
      <View style={{top:'5%'}}>
        <Animated.Image 
          source={logo} 
          style={[styles.logo, { opacity: this.state.visible,}, {zIndex: 10000}]}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  logo:{
    width: 200,
    height: 200,
    resizeMode: 'contain',
    top:'10%',
    position: 'relative',
    margin: 15,
    marginLeft: 25,
    opacity: 0.9,
    marginBottom:'-3%'
  }
})