import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../db-connection";
import { Service } from "@/services/inserter";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();
    if (req.method === "GET") {
      const services = await new Service(null).get();
      return res.status(200).json({
        message: "Services retrieved successfully",
        services,
      });
    } else if (req.method === "POST") {
      const service = new Service(req.body);
      const result = await service.post();

      return res.json(result);
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error: any) {
    return res.status(500).json({ err: error.message });
  }
}
