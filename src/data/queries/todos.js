import { GraphQLList as List } from 'graphql';
import ToDoType from '../types/todo';

var TODOs = [
  {
    "id": 1446412739542,
    "title": "Read emails",
    "completed": false,
    "created": "2015-07-24T13:23:15.580Z"
  },
  {
    "id": 1446412740883,
    "title": "Buy orange",
    "completed": true,
    "created": "2015-07-24T13:23:15.580Z"
  }
];

const todos ={
  type: new List(ToDoType),
  resolve: function () {
          return TODOs;
        }
};


export default todos;
