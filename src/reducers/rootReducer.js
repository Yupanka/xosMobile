import { combineReducers } from 'redux';
import questionnaires from './questionnaires';
import user from './user';
import questionList from './questionList';
import assignAction from './assignAction';

const rootReducer = combineReducers({
  questionnaires: questionnaires,
  user: user,
  questionList: questionList,
  assignAction: assignAction
});

export default rootReducer;
