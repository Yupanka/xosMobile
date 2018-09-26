import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { changeFieldValue, validateField, upload, submitAction } from '../actions/actions';
class Action extends React.Component {
  render () {
    return (
      <View>
        <TextInput mode="outlined"
          label='Subject'
          value={this.props.subject.value}
          onChangeText={text => this.props.changeValue('subject', text)}
          onEndEditing={(e) => this.props.validateField('subject', e)}
          error={!this.props.subject.valid}
        />
        <HelperText
          type="error"
          visible={!this.props.subject.valid}
        >
          Please enter subject!
        </HelperText>

        <TextInput mode="outlined"
          label='Assignee'
          value={this.props.assignee.value}
          onChangeText={text => this.props.changeValue('assignee', text)}
          onEndEditing={(e) => this.props.validateField('assignee', e)}
          error={!this.props.assignee.valid}
        />
        <HelperText
          type="error"
          visible={!this.props.assignee.valid}
        >
          Please provide Assignee!
        </HelperText>

        <TextInput multiline
          style={{ height: 150 }}
          numberOfLines={5}
          mode="outlined"
          label='Body'
          value={this.props.body.value}
          onChangeText={text => this.props.changeValue('body', text)}
          onEndEditing={(e) => this.props.validateField('body', e)}
          error={!this.props.body.valid}
        />
        <HelperText
          type="error"
          visible={!this.props.body.valid}
        >
          Please describe the action!
        </HelperText>

        <Button icon="add-a-photo" mode="contained" onPress={(e) => this.props.uploadFile(e)}>
          Attach file
        </Button>

        <Button icon="launch" color="green" mode="contained" onPress={(e) => this.props.submitAction(e)}>
          Submit
        </Button>
      </View>
    );
  }
}

Action.propTypes = {
  subject: PropTypes.object,
  assignee: PropTypes.object,
  body: PropTypes.object,
  validateField: PropTypes.func,
  submitAction: PropTypes.func,
  uploadFile: PropTypes.func,
  changeValue: PropTypes.func
};

Action.defaultProps = {
  subject: { value: '', valid: true },
  assignee: { value: '', valid: true },
  body: { value: '', valid: true },
  validateField: () => {},
  submitAction: () => {},
  uploadFile: () => {},
  changeValue: () => {}
};

const mapStateToProps = state => ({
  subject: state.assignAction.subject,
  assignee: state.assignAction.assignee,
  body: state.assignAction.body
});

const mapDispatchToProps = dispatch => ({
  changeValue: (field, value) => {
    const data = { field: field, value: value };
    dispatch(changeFieldValue(data));
  },

  validateField: (field, e) => {
    e.preventDefault();
    dispatch(validateField(field));
  },

  uploadFile: (e) => {
    e.preventDefault();
    dispatch(upload());
  },

  submitAction: (e) => {
    e.preventDefault();
    dispatch(submitAction());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Action);
