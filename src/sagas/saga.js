import { takeEvery, call, put, select } from 'redux-saga/effects';
import { normalize, denormalize } from 'normalizr';
import NavigationService from '../../NavigationService.js';
import { questionListSchema } from '../api/schemas';
import { returnState } from '../selectors/selectors';
import ErrorAlert from '../components/ui-components/ErrorAlert';

export function * getUserData () {
  try {
    console.log('trying');
    // TODO: instead of my local mockserver, call the real api
    //  const response = yield call(fetch, 'http://10.105.188.189:3004/users/2', {credentials: 'include'});
    const response = yield call(fetch, 'http://localhost:3004/users/1', { credentials: 'include' });

    if (response && response.status === 200) {
      const data = yield call([response, response.json]);
      yield put({ type: 'GET_USER_DATA_SUCCESS', data });
    } else {
      //  redirect to login
    }
  } catch (err) {
    // redirect to login
  }
}

function * getQuestionnaires (action) {
  try {
    // TODO: instead of my local mockserver, call the real api
    //  const response = yield call(fetch, `http://10.105.188.189:3004/questionnaires?role=${action.data}`, {credentials: 'include'});
    const response = yield call(fetch, `http://localhost:3004/questionnaires?role=${action.data}`, { credentials: 'include' });

    if (response && response.status === 200) {
      const data = yield call([response, response.json]);
      yield put({ type: 'GET_QUESTIONNAIRES_SUCCESS', data });
      yield NavigationService.navigate('Questionnaires');
    } else {
      yield put({ type: 'GET_QUESTIONNAIRES_ERROR', response });
      yield call(ErrorAlert);
    }
  } catch (err) {
    yield call(ErrorAlert, err.message);
  }
}

function * getQuestions (action) {
  try {
    let data;
    // TODO: instead of my local mockserver, call the real api
    //  const response = yield call(fetch, `http://10.105.188.189:3004/questions/${action.questionnaire}`);
    const response = yield call(fetch, `http://localhost:3004/questions/${action.questionnaire}`);

    if (response && response.status === 200) {
      const resp = yield call([response, response.json]);
      const normalizedData = normalize(resp, questionListSchema);
      data = { ...resp, questions: normalizedData.entities.questions, result: normalizedData.result };
      yield put({ type: 'GET_QUESTIONS_SUCCESS', data });
      yield NavigationService.navigate('Questions');
    } else {
      yield put({ type: 'GET_QUESTIONS_ERROR', response });
      yield call(ErrorAlert);
    }
  } catch (err) {
    yield call(ErrorAlert, err.message);
  }
}

function * submitAnswer (action) {
  try {
    const st = yield select(returnState);
    const answered = st.questionList;
    const payload = denormalize(answered.result, questionListSchema, answered);

    const res = yield call(fetch,
      //  `http://http://10.105.188.189:3004/questions/${answered.id}`,
      `http://localhost:3004/questions/${answered.id}`,

      { method: 'PUT',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

    if (!res || res.status !== 200) {
      // if couldn't submit the answer, try to load latest version of questions from api
      console.log('Something went wrong');
      //      const response = yield call(fetch, `http://10.105.188.189:3004/questions/${answered.id}`);
      const response = yield call(fetch, `http://localhost:3004/questions/${answered.id}`);

      if (response && response.status === 200) {
        const resp = yield call([response, response.json]);
        const normalizedData = normalize(resp, questionListSchema);
        const data = { ...resp, questions: normalizedData.entities.questions, result: normalizedData.result };
        yield put({ type: 'GET_QUESTIONS_SUCCESS', data });
        yield NavigationService.navigate('Questions');
      } else {
        yield put({ type: 'GET_QUESTIONS_ERROR', response });
        yield NavigationService.navigate('Questions');
      }
    }
  } catch (err) {
    yield call(ErrorAlert, err.message);
  }
}

export default function * rootSaga () {
  console.log('wired up!!!');
  yield takeEvery('LOAD_QUESTIONNAIRES', getQuestionnaires);
  yield takeEvery('GET_QUESTION_LIST', getQuestions);
  yield takeEvery('ANSWER_QUESTION', submitAnswer);
}
