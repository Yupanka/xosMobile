const initialState = {
  username: '',
  role: '',
  location: '',
  area: '',
  loading: false,
  authenticated: false,
  token: ''
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_DATA_SUCCESS':
      return {
        ...state,
        ...action.data
      };

    case 'LOAD_USER_DATA':

      return {
        ...state,
        ...action.data
      };

    default:
      return state;
  }
};

export default user;
