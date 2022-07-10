import React from 'react';
import { StyleSheet } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";

export default class loadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  /*componentDidMount() {
      this.setState({
        visible: !this.state.visible
      });
  }*/

  render() {
    const { visible } = this.state;
    return (
      <AnimatedLoader
        visible={true}
        source={require("./loading.json")}
        animationStyle={styles.lottie}
        speed={2}
      />
    );
  }
}

const styles = StyleSheet.create({
  lottie: {
    width: 550,
    height: 550,
  }
});