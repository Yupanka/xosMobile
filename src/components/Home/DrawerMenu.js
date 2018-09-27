import * as React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import Menu from '../ui-components/Menu';
import { loadQuestionnaires } from '../../actions/actions';

class DrawerMenu extends React.Component {
  render () {
    return (
      <SafeAreaView>
        <Menu
          nav={this.props.nav}
          username={this.props.username}
          userrole={this.props.userrole}
          requestQuestionnaires={(e) => this.props.requestQuestionnaires(this.props.userrole, e)}
        />
      </SafeAreaView>
    );
  }
}

DrawerMenu.propTypes = {
  userrole: PropTypes.string,
  username: PropTypes.string,
  requestQuestionnaires: PropTypes.func,
  nav: PropTypes.object
};

DrawerMenu.defaultProps = {
  userrole: '',
  username: '',
  requestQuestionnaires: () => {},
  nav: {}
};

const mapStateToProps = state => ({
  username: state.user.username,
  userrole: state.user.role
});

const mapDispatchToProps = dispatch => ({
  requestQuestionnaires: (role, e) => {
    e.preventDefault();
    dispatch(loadQuestionnaires(role));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);
