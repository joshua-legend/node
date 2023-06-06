import { Schema, model, Document } from "mongoose";

interface Admin extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
}

const adminSchema = new Schema<Admin>({
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
    default: "admin",
  },
});

const Admin = model<Admin>("Admin", adminSchema);

export default Admin;
