import { User } from '../models/user';

const userResolvers = {
  Query: {
    getUser: async (parent: any, args: { id: string }) => {
      try {
        const user = await User.findById(args.id);
        return user;
      } catch (error: any) {
        throw new Error(`Error fetching user: ${error.message}`);
      }
    },
    listUser: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error: any) {
        throw new Error(`Error fetching users: ${error.message}`);
      }
    }
  },
  Mutation: {
    createUser: async (parent: any, args: { input: { username: string; email: string }}) => {
      try {
        const { username, email } = args.input;
        const user = new User({ username, email });
        await user.save();
        return user;
      } catch (error: any) {
        throw new Error(`Error creating user: ${error.message}`);
      }
    },
  },
};

export default userResolvers;