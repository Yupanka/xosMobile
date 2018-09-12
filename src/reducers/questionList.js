const initialState = {
  loading: false,
  id: null,
  name: '',
  questions: {}
};

const questionList = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_QUESTION_LIST':
      return {
        ...state,
        loading: true,
      };
    case 'GET_QUESTIONS_SUCCESS':
      return {
        ...state,
        loading: false,
        ...action.data,
      };
    case 'GET_QUESTIONS_ERROR':
      return {
        state: initialState
      };

    case 'ANSWER_QUESTION':
      const qs = { ...state.questions};
      const answered = { ...qs[action.question], answer: action.answer };

      return {
        ...state,
        questions: {...state.questions, [action.question]: answered}
      };

    default:
      return state;
  }
};

export default questionList;
