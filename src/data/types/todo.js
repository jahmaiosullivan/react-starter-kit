import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
  GraphQLBoolean as Boolean
} from 'graphql';
import CustomGraphQLDateType from 'graphql-custom-datetype';

const ToDo = new ObjectType({
  name: 'ToDo',
  fields: {
    id: { type: new NonNull(ID) },
    title: { type: StringType },
    completed: { type: Boolean },
    created: { type: CustomGraphQLDateType,  resolve: () => new Date() }
  }
});
export default ToDo;
