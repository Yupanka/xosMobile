import { takeEvery, call, put, select } from 'redux-saga/effects';
import { normalize, denormalize } from 'normalizr';
import NavigationService from '../../NavigationService.js';
import { questionListSchema } from '../api/schemas';
import { returnState } from '../selectors/selectors';

// export function* getUserData() {
// 	try {
// 		//TODO: instead of my local mockserver, call the real api
// 		const response = yield call(fetch, 'http://localhost:3004/users/1', {credentials: 'include'});
// 		if (response && response.status === 200) {
// 			const data = yield call([response, response.json]);
// 			yield put({type: 'GET_USER_DATA_SUCCESS', data});
// 		} else {
// 		//	yield put(push('/notfound'));
// 		}
// 	} catch (err) {
// 		//yield put(push('/notfound'));
// 	}
// };

// function* getQuestionnaires(action) {
// 	try {
// 		//TODO: instead of my local mockserver, call the real api
// 		const response = yield call(fetch, `http://localhost:3004/questionnaires?role=${action.data}`, {credentials: 'include'});
// 		if (response && response.status === 200) {
// 			const data = yield call([response, response.json]);
// 			yield put({type: 'GET_QUESTIONNAIRES_SUCCESS', data});
// 			yield NavigationService.navigate('Questionnaires');
// 		} else {
// 			yield put({type: 'GET_QUESTIONNAIRES_ERROR', response});
// 		//	yield put(push('/questionnaires'));
// 		}

// 	} catch (err) {
// 	//	yield put(push('/notfound'));
// 	}
// };

// function* getQuestions(action) {
// 	try {
	
// 		let data;
// 		//TODO: instead of my local mockserver, call the real api
// 		//	const today = new Date();
// 		// const response = yield call(fetch, 
// 		// 	`http://localhost:3004/questions/${action.questionnaire}`, 
// 		// 	{method: 'POST', 
// 		// 	credentials: 'include',
// 		// 	headers: {
//   //   			'Accept': 'application/json',
//   //   			'Content-Type': 'application/json',
//   // 			},
//   // 			body: JSON.stringify({
//   //   			date: today,
//   //   			questionnaire: action.questionnaire
//   // 			})
//   // 		});
//   		const response = yield call(fetch, `http://localhost:3004/questions/${action.questionnaire}`);
//   		if (response && response.status === 200) {
//   			const resp = yield call([response, response.json]);
// 			const normalizedData = normalize(resp, questionListSchema);
// 			data = {...resp, questions: normalizedData.entities.questions, result: normalizedData.result};
// 			console.log(data)
// 			yield put({type: 'GET_QUESTIONS_SUCCESS', data});
// 			yield NavigationService.navigate('Questions');
// 		//	yield put(push(`/questionnaire/${action.questionnaire}`));
//   		} else {
//   			yield put({type: 'GET_QUESTIONS_ERROR', response});
//   		//	yield put(push(`/questionnaire/${action.questionnaire}`));
//   		}
		
// 	} catch (err) {
// 	//	yield put(push('/notfound'));
// 	}
// };

// function* submitAnswer(action) {
// 	try {
// 		const st = yield select(returnState);
// 		const answered = st.questionList;
// 		const payload = denormalize(answered.result, questionListSchema, answered);

// 		const res = yield call(fetch, 
// 			`http://localhost:3004/questions/${answered.id}`, 
// 			{method: 'PUT', 
// 			credentials: 'include',
// 			headers: {
//   			'Accept': 'application/json',
//   			'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify(payload)
// 		});

// 		if (!res || res.status !== 200) {
// 			// if couldn't submit the answer, try to load latest version of questions from api
// 			console.log('Something went wrong');
// 			const response = yield call(fetch, `http://localhost:3004/questions/${answered.id}`);
//   		if (response && response.status === 200) {
//   			const resp = yield call([response, response.json]);
// 				const normalizedData = normalize(resp, questionListSchema);
// 				const data = {...resp, questions: normalizedData.entities.questions, result: normalizedData.result};
// 				yield put({type: 'GET_QUESTIONS_SUCCESS', data});
// 				yield put(push(`/questionnaire/${answered.id}`));
//   		} else {
//   			yield put({type: 'GET_QUESTIONS_ERROR', response});
//   			yield put(push(`/questionnaire/${answered.id}`));
//   		}
// 		}
// 	} catch (err) {
// 		console.log(err)
// 	}
// };

export default function* rootSaga() {
	console.log('wired up!')
  // yield takeEvery('LOAD_QUESTIONNAIRES', getQuestionnaires);
  // yield takeEvery('GET_QUESTION_LIST', getQuestions);
  // yield takeEvery('ANSWER_QUESTION', submitAnswer);
}