import argon2 from "argon2";
import jwt from "jsonwebtoken";

import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/dbconnection";
import User from "../../../../../models/user.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();
    const userIdFromToken = req.query.id;

    const user = await User.findById(userIdFromToken);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isAdmin = user.role === "admin";

    if (req.method === "GET") {
      const userId = req.query.id as string;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ message: "User not found!" });
      }
      return res.status(200).json({ User: user });
    } else if (req.method === "PUT") {
      const userId = req.query.id as string;
      const updatedData = req.body;

      if (!isAdmin && userIdFromToken !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { ...updatedData } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res
        .status(200)
        .json({ user: updatedUser, message: "User updated successfully" });
    } else if (req.method === "DELETE") {
      const userId = req.query.id as string;

      if (!isAdmin && userIdFromToken !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      await User.findByIdAndDelete(userId);
      return res.status(200).json({ message: "User Deleted" });
    } else {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
