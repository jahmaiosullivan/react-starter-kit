import {
  GraphQLBoolean as Boolean,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
  GraphQLInputObjectType as InputType
} from 'graphql';
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

export default ToDoInputType;
