import * as React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Drawer } from 'react-native-paper';

class Menu extends React.Component {
  // state = {
  //   active: ''
  // };

  render () {
    // const { active } = this.state;
    return (
      <View>
        <Drawer.Item
          icon="face"
          label={<Text>{this.props.username}</Text>}
          onPress={() => console.log(this.props.username)}
        />

        {this.props.userrole === 'General Manager'
          ? <Drawer.Section title="Inspections - GM">
            <Drawer.Item
              label="GM Checklist"
              onPress={this.props.requestQuestionnaires}
            />
          </Drawer.Section>
          : <Drawer.Section title="Inspections Exec">
            <Drawer.Item
              label="GEMBA Walk"
              onPress={this.props.requestQuestionnaires}
            />
            <Drawer.Item
              label="Risk Items"
              onPress={() => this.props.nav.navigate('Knock')}
            />
          </Drawer.Section>
        }
        <Drawer.Section title="Inspections">
          <Drawer.Item
            label="Actions"
            onPress={() => this.props.nav.navigate('Action')}
          />
          <Drawer.Item
            label="Give Recognition"
            onPress={() => this.props.nav.navigate('Knock')}
          />
          <Drawer.Item
            label="Best Practices"
            onPress={() => this.props.nav.navigate('Knock')}
          />
        </Drawer.Section>
      </View>
    );
  }
}

Menu.propTypes = {
  username: PropTypes.string,
  userrole: PropTypes.string,
  requestQuestionnaires: PropTypes.func,
  nav: PropTypes.object
};

Menu.defaultProps = {
  username: '',
  userrole: '',
  requestQuestionnaires: () => {},
  nav: { navigate: () => {} }
};

export default Menu;
