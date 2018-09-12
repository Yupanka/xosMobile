import { schema } from 'normalizr';

const questionsSchema = new schema.Entity('questions');
export const questionListSchema = { questions: [ questionsSchema ] };
