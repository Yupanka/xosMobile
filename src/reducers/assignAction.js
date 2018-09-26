const initialState = {
  subject: { value: '', validating: false, validated: false, valid: true },
  assignee: { value: '', validating: false, validated: false, valid: true },
  body: { value: '', validating: false, validated: false, valid: true },
  attachments: []
};

const assignAction = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_VALUE': {
      const field = action.data.field;
      const val = action.data.value;
      return {
        ...state,
        [field]: { ...state[field], value: val }
      };
    }
    case 'VALIDATE_FIELD': {
      const field = action.field;
      return {
        ...state,
        [field]: { ...state[field], validating: true }
      };
    }
    case 'ADD_UPLOADED': {
      const files = [...state.attachments];
      files.push(action.file);
      return {
        ...state,
        attachments: files
      };
    }

    default:
      return state;
  }
};

export default assignAction;
