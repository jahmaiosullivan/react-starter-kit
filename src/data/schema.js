import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType
} from 'graphql';

import me from './queries/me';
import content from './queries/content';
import news from './queries/news';
import todos from './queries/todos';
import groups from './queries/groups';
import { AddToDoItem } from './mutations/ToDoMutations';

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
    fields: {
      add: AddToDoItem
    }
  })
});

export default schema;
