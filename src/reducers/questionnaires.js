
const initialState = {
  loading: false,
  questionnaires: []
};

const questionnaires = (state = initialState, action) => {
  switch(action.type) {
    case 'LOAD_QUESTIONNAIRES':
      return {
        ...state,
        loading: true
      };
      case 'GET_QUESTIONNAIRES_SUCCESS':
        return {
          ...state,
          loading: false,
          questionnaires: action.data
        };
      case 'GET_QUESTIONNAIRES_ERROR':
        return {
          state: initialState
        };
    default:
      return state;
  }
};

export default questionnaires;