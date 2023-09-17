import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './user.interface';
import config from '../../../config';
import bcrypt from 'bcrypt';

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

/* UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  );

  next();
}); */

// User.create() / user.save()
UserSchema.pre('save', async function (next) {
  // Hashing user password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  );

  if (!this.needsPasswordChange) {
    this.passwordChangedAt = new Date();
  }

  next();
});

UserSchema.methods.isUserExist = async function (
  id: string
): Promise<Partial<IUser> | null> {
  return await User.findOne(
    { id },
    { id: 1, password: 1, needsPasswordChange: 1, role: 1 }
  );
};

UserSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

export const User = model<IUser, UserModel>('User', UserSchema);
