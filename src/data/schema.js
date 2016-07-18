import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
  GraphQLBoolean as Boolean,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
  GraphQLInputObjectType as InputType
} from 'graphql';

import me from './queries/me';
import content from './queries/content';
import news from './queries/news';
import todos from './queries/todos';
import groups from './queries/groups';
import ToDoType from './types/todo';
import CustomGraphQLDateType from 'graphql-custom-datetype';

const ToDoInputType = new InputType({
  name: 'ToDoInput',
  fields: {
    id: { type: new NonNull(ID) },
    title: { type: StringType },
    completed: { type: Boolean },
    created: { type: CustomGraphQLDateType,  resolve: () => new Date() }
  }
});


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
