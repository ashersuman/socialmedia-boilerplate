import { buildSchema } from 'graphql';
import userSchema from './user.graphql';
import userResolvers from './userResolvers';

const schema = buildSchema(userSchema);

const root = {
  ...userResolvers,
};

export { schema, root };