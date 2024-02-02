import argon2 from "argon2";
import _ from "lodash";
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
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      const isValidPassword = await argon2.verify(user?.password, password);

      if (user && isValidPassword) {
        return res.status(200).json({ user });
      } else {
        console.log("Invalid credentials");
        // we shall discuss if we will need sessions or jwt once we start implementing Oauth part - Fred
        res.status(400).json({ message: "authentication of admin failed" });
      }
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }
}
