import { Schema, model, Document } from "mongoose";

interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
});

const User = model<User>("User", userSchema);

export default User;
