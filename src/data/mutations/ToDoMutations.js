import { GraphQLObjectType as ObjectType } from 'graphql';
import ToDoType from '../types/todo';
import todos from '../queries/todos';
import ToDoInputType from '../types/input/ToDoInputType';

export var AddToDoItem = {
    type: ToDoType,
    description: 'Add a new todo item.',
    args: {
      todo: { type: ToDoInputType }
    },
    resolve: (value, { todo }) => {
      return todos.add(todo);
    }
};

