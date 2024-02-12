import argon2 from "argon2";
import jwt from "jsonwebtoken";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../utils/dbconnection";
import User from "../../../../models/user.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  if (req.method == "POST") {
    const { email, oldPassword, newPassword } = req.body;
    try {
      const user = await User.findOne({ email });
      const isValidPassword = await argon2.verify(user?.password, oldPassword);

      if (user && isValidPassword) {
        const hashedPassword = await argon2.hash(newPassword);
        user.password = hashedPassword;
        await user.save();
        res
          .status(200)
          .json({ message: "You have successfully changed your password." });
      } else {
        console.log("Invalid credentials");
        res.status(400).json({ message: "User failed to change password" });
      }
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }
}
