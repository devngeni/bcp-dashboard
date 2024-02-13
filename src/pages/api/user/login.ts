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
  try {
    await connectDB();

    if (req.method === "POST") {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isValidPassword = await argon2.verify(user.password, password);

      if (isValidPassword) {
        return res.status(200).json({ user: user.toJson() });
      } else {
        console.log("Invalid credentials");
        res.status(400).json({ message: "Authentication failed" });
      }
    } else if (req.method === "GET") {
      const users = await User.find({});
      res.status(200).json({ users });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
