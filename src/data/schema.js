import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType
} from 'graphql';

import me from './queries/me';
import content from './queries/content';
import news from './queries/news';
import todos from './queries/todos';
import groups from './queries/groups';
import ToDoInputType from './types/input/ToDoInputType';
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
          todo: { type: ToDoInputType }
        },
        resolve: (value, { todo }) => {
          return todos.add(todo);
        }
      }
    })
  })
});

export default schema;
