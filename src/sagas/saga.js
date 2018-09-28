import { takeEvery, call, put, select } from 'redux-saga/effects';
import { normalize, denormalize } from 'normalizr';
import NavigationService from '../NavigationService.js';
import { questionListSchema } from '../api/schemas';
import { returnState } from '../selectors/selectors';
import ErrorAlert from '../components/ui-components/ErrorAlert';

export function * getUserData () {
  try {
    // TODO: instead of my local mockserver, call the real api
    //  const response = yield call(fetch, 'http://10.105.188.189:3004/users/2', {credentials: 'include'});
    const response = yield call(fetch, 'http://localhost:3004/users/1', { credentials: 'include' });

    if (response && response.status === 200) {
      const data = yield call([response, response.json]);
      yield put({ type: 'GET_USER_DATA_SUCCESS', data });
      // yield NavigationService.navigate('Questionnaires');
    } else {
      //  redirect to login
    }
  } catch (err) {
    // redirect to login
  }
}

function * getQuestionnaires (action) {
  try {
    const st = yield select(returnState);
    const role = st.user.role;
    // TODO: instead of my local mockserver, call the real api
    //  const response = yield call(fetch, `http://10.105.188.189:3004/questionnaires?role=${action.data}`, {credentials: 'include'});
    const response = yield call(fetch, `http://localhost:3004/questionnaires?role=${role}`, { credentials: 'include' });

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

export function * handleUpload () {
  try {
    // TODO: instead of my local mockserver, call the real api

    // '/Users/npavlova/Library/Developer/CoreSimulator/Devices/707183AA-DD18-42B3-A05C-B61775135132/data/Media/DCIM/100APPLE/cup.jpg',
    const file = {
      uri: '/Users/npavlova/Downloads/cup.jpg',
      type: 'image/jpeg',
      name: 'cup.jpg'
    };

    yield put({ type: 'ADD_UPLOADED', file });

    // const data = new FormData();
    // data.append('name', 'testName');
    // data.append('photo', file);
    // console.log('this is data', data);
    // const response = yield call(fetch, 'http://localhost:3004/actions',
    //   { method: 'POST',
    //     credentials: 'include',
    //     body: data
    //   });

    // if (response && response.ok) {
    //   const data = yield call([response, response.json]);
    //   console.log(data);
    //   //yield put({ type: 'GET_USER_DATA_SUCCESS', data });
    // } else {
    //   console.log('something else happened:: ', response)
    // }
  } catch (err) {
    console.log('in ELSE', err);
  }
}

function * handleSubmitAction (action) {
  try {
    const st = yield select(returnState);
    const actionData = st.assignAction;
    const photos = actionData.attachments;
    const data = new FormData();

    photos.forEach((photo) => {
      data.append('photo', {
        uri: photo.uri,
        type: 'image/jpeg', // or photo.type
        name: photos.name
      });
    });

    data.append('subject', actionData.subject.value);
    data.append('assignee', actionData.assignee.value);
    data.append('body', actionData.body.value);

    console.log('this is data', data);

    const res = yield call(fetch,
      //  `http://http://10.105.188.189:3004/actions`,
      'http://localhost:3004/actions',

      { method: 'POST',
        credentials: 'include',
        /// mock only accepts json, so I leave it like this for now
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        // headers: {
        //   'Accept': 'multipart/form-data',
        //   'Content-Type': 'multipart/form-data'
        // },
        body: JSON.stringify(data)
      });

    if (res && res.ok) {
      const data = yield call([res, res.json]);
      console.log(data);
    }
    //    const response = yield call(fetch, `http://10.105.188.189:3004/questions/${answered.id}`);

    // }
  } catch (err) {
    yield call(ErrorAlert, err.message);
  }
}

export default function * rootSaga () {
  yield takeEvery('GET_USER_DATA_SUCCESS', getQuestionnaires);
  yield takeEvery('GET_QUESTION_LIST', getQuestions);
  yield takeEvery('ANSWER_QUESTION', submitAnswer);
  yield takeEvery('UPLOAD', handleUpload);
  yield takeEvery('SUBMIT_ACTION', handleSubmitAction);
}
