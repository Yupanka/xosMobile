import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
// import { styles } from './styles';

class HeaderSearch extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      hideSearch: true
    };
    this.toggleHidden = this.toggleHidden.bind(this);
  }
  toggleHidden () {
    this.setState({
      hideSearch: !this.state.hideSearch
    });
  }
  render () {
    return (
      <View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5 }}>
          <Text style={{ color: '#fff' }} onPress={this.toggleHidden}>{this.props.location}</Text>
          <Text style={{ color: '#fff' }} onPress={this.toggleHidden}>{this.props.area}</Text>
        </View>
        {!this.state.hideSearch && <Searchbar placeholder='Search locations' />}
      </View>
    );
  }
}

HeaderSearch.propTypes = {
  location: PropTypes.string,
  area: PropTypes.string
};

HeaderSearch.defaultProps = {
  location: '',
  area: ''
};

export default HeaderSearch;
