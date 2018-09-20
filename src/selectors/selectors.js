import { denormalize } from 'normalizr';
import { questionListSchema } from '../api/schemas';

export const returnState = state => state;

export const getQuestions = state => {
  const denormalizedData = denormalize(state.result, questionListSchema, state);
  return denormalizedData;
};
