import React from 'react';
// import { Text, View, ScrollView } from 'react-native';
import { Dialog, Portal, TextInput } from 'react-native-paper';

class Form extends React.Component {
  state = {
    visible: true,
    subject: '',
    assignee: '',
    body: ''
  };

  _hideDialog = () => this.setState({ visible: false });

  render () {
    return (
      <Portal>
        <Dialog
          visible={this.state.visible}
          onDismiss={this._hideDialog}>
          <Dialog.Title>This is a title</Dialog.Title>
          <Dialog.Content>
            <TextInput mode="outlined"
              label='Subject'
              value={this.state.subject}
              onChangeText={text => this.setState({ subject: text })}
            />
            <TextInput mode="outlined"
              label='Assignee'
              value={this.state.assignee}
              onChangeText={text => this.setState({ assignee: text })}
            />
            <TextInput multiline
              numberOfLines={5}
              mode="outlined"
              label='Body'
              value={this.state.body}
              onChangeText={text => this.setState({ body: text })}
            />

          </Dialog.Content>
        </Dialog>
      </Portal>
    );
  }
}

export default Form;
