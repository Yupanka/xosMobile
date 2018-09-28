import React from 'react';
import PropTypes from 'prop-types';
import { Appbar } from 'react-native-paper';
import { connect } from 'react-redux';
// import { styles } from './styles';
// import NavigationService from '../../NavigationService.js';

class HeaderComponent extends React.Component {
  // constructor (props) {
  //   super(props);
  //   this.handleGoBack = this.handleGoBack.bind(this);
  // }
  // handleGoBack (e) {
  //   e.preventDefault();
  //   NavigationService.goBack();
  // }
  render () {
    return (
      <Appbar.Header>
        {this.props.back &&
          <Appbar.BackAction
            onPress={() => this.props.back()}
          />
        }
        <Appbar.Content
          title={this.props.title}
        />
        <Appbar.Action icon="menu" onPress={() => this.props.nav()} />
      </Appbar.Header>
    );
  }
}

HeaderComponent.propTypes = {
  username: PropTypes.string,
  // location: PropTypes.string,
  // area: PropTypes.string,
  title: PropTypes.string,
  nav: PropTypes.func,
  back: PropTypes.func
};

HeaderComponent.defaultProps = {
  username: '',
  // location: '',
  // area: '',
  title: '',
  nav: () => {},
  back: () => {}
};

const mapStateToProps = (state, ownProps) => ({
  username: state.user.username,
  location: state.user.location,
  area: state.user.area,
  title: ownProps.title
});

export default connect(mapStateToProps)(HeaderComponent);
