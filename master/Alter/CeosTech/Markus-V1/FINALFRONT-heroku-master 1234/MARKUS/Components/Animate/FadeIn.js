import React from 'react';
import { Animated, Dimensions } from 'react-native';
import * as Styles from '../Styles/Styles';

export default class FadeIn extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      positionLeft: new Animated.Value(Dimensions.get('window').width)
    }
  }

  componentDidMount() {
    setInterval(() => {
      Animated.spring(
        this.state.positionLeft,
        {
          toValue: 0,
          useNativeDriver: true,
        }
      ).start()
     }, 1750);
  }

  render() {
    const transformStyle ={
      transform : [{ 
        translateX : this.state.positionLeft,
      }]
    }
    return (
      <Animated.View
        style={[{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: '10%', },transformStyle ]}>
            {this.props.children}
      </Animated.View>
    )
  }
}