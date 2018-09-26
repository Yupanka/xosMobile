import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, Portal } from 'react-native-paper';

class FormDialog extends React.Component {
  state = {
    visible: true
  };

  _hideDialog = () => this.setState({ visible: false });

  render () {
    return (
      <Portal>
        <Dialog
          visible={this.state.visible}
          onDismiss={this._hideDialog}>
          <Dialog.Title>{this.props.title}</Dialog.Title>
          <Dialog.Content>{this.props.body}</Dialog.Content>
        </Dialog>
      </Portal>
    );
  }
}

FormDialog.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string
};

FormDialog.defaultProps = {
  title: '',
  body: ''
};

export default FormDialog;
