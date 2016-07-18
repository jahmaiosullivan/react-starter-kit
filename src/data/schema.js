import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
  GraphQLBoolean as Boolean,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
} from 'graphql';

import me from './queries/me';
import content from './queries/content';
import news from './queries/news';
import todos from './queries/todos';
import groups from './queries/groups';
import ToDoType from './types/todo';


const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      me,
      content,
      news,
      todos,
      groups
    }
  }),
  mutation: new ObjectType({
    name: 'Mutations',
    description: 'Mutations change things',
    fields: () => ({
      add: {
        type: ToDoType,
        description: 'Add a new todo item.',
        args: {
          id: { type: new NonNull(ID) },
          title: { type: StringType },
          completed: { type: Boolean }
        },
        resolve: (value, { id, title, completed }) => {
          return todos.add({ id, title, completed });
        }
      }
    })
  })
});

export default schema;
