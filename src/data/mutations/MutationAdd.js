import { GraphQLList as List,
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType } from 'graphql';
import ToDoType from '../types/todo';
import TODOs from '../queries/todos';

var MutationAdd = {
  type: new List(ToDoType),
  description: 'Add a Todo',
  args: {
    title: {
      name: 'Todo title',
      type: new NonNull(StringType)
    }
  },
  resolve: (root, {title}) => {
    TODOs.add({
      id: (new Date()).getTime(),
      title: title,
      completed: false
    });
    return TODOs;
  }
};

export default MutationAdd;
