import { combineReducers } from 'redux';
import questionnaires from './questionnaires';
import user from './user';
import questionList from './questionList';

const rootReducer = combineReducers({
  questionnaires: questionnaires,
  user: user,
  questionList: questionList,
});

export default rootReducer;