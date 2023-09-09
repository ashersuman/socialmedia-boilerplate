import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
}

const UserSchema = new Schema({
  username: String,
  email: String,
});

export const User = mongoose.model<IUser>('User', UserSchema);
