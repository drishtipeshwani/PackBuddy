// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { DefaultTodo, Place } = initSchema(schema);

export {
  DefaultTodo,
  Place
};