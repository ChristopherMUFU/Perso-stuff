import * as React from 'react';
import { Button } from 'react-native';

export function GoToButton({ navigation, screenName }) {
    
  return (
    <Button
      title={`Go to ${screenName}`}
      onPress={() => this.props.navigation.navigate(screenName)}
    />
  );
}