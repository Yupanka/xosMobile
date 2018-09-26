import * as React from 'react';
import { View } from 'react-native';
import { Drawer } from 'react-native-paper';

class Menu extends React.Component {
  state = {
    active: 'first'
  };

  render () {
    const { active } = this.state;

    return (
      <View>
        <Drawer.Section title="Some title">
          <Drawer.Item
            label="First Item"
            active={active === 'first'}
            onPress={() => { this.setState({ active: 'first' }); }}
          />
          <Drawer.Item
            label="Second Item"
            active={active === 'second'}
            onPress={() => { this.setState({ active: 'second' }); }}
          />
        </Drawer.Section>
      </View>
    );
  }
}

export default Menu;
