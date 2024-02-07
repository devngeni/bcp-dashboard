import mongoose, { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
  },
  { timestamps: true }
);

userSchema.methods.genToken = function genToken() {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.NEXT_PUBLIC_JWT_SECRET as string,
    { expiresIn: "7d" }
  );
};

userSchema.methods.toJson = function toJson() {
  return {
    email: this.email,
    id: this._id,
    token: this.genToken(),
  };
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
