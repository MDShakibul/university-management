import { Schema, model } from 'mongoose';
import { AuthModel, ILoginUser } from './auth.interface';

const AuthSchema = new Schema<ILoginUser, AuthModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Auth = model<ILoginUser, AuthModel>(
  'AcademicDepartment',
  AuthSchema
);
