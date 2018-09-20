export const loadUserData = data => ({
  type: 'LOAD_USER_DATA',
  data
});

export const loadQuestionnaires = data => ({
  type: 'LOAD_QUESTIONNAIRES',
  data
});

export const getQuestionnairesSuccess = data => ({
  type: 'GET_QUESTIONNAIRES_SUCCESS',
  data
});

export const getQuestionnairesError = (data) => ({
  type: 'GET_QUESTIONNAIRES_ERROR',
  data
});

export const saveQuestionnaire = data => ({
  type: 'SAVE_QUESTIONNAIRE',
  data
});

export const getUserDataSuccess = data => ({
  type: 'GET_USER_DATA_SUCCESS',
  data
});

export const answerQuestion = (question, answer) => ({
  type: 'ANSWER_QUESTION',
  question,
  answer
});

export const getQuestionList = (questionnaire) => ({
  type: 'GET_QUESTION_LIST',
  questionnaire
});

export const getQuestionListSuccess = (data) => ({
  type: 'GET_QUESTIONS_SUCCESS',
  data
});

export const getQuestionListError = (data) => ({
  type: 'GET_QUESTIONS_ERROR',
  data
});
