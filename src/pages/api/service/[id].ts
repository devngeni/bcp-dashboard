import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../utils/dbconnection";
import ServiceItemsModel from "../../../../models/service.model";
import { Service } from "@/services/inserter";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    const { id } = req.query;

    if (req.method === "GET") {
      if (id) {
        const itemId: any = id;
        const promise = new Service(null);
        const service = await promise.getSingleService(itemId);
        return res
          .status(200)
          .json({ message: "Service retrieved successfully", service });
      } else {
        return res.status(400).json("Invalid item ID");
      }
    } else if (req.method === "PUT") {
      const updated_service = new Service(req.body);
      const updated = await updated_service.edit(id);
      return res
        .status(200)
        .json({ message: "Service edited successfully", updated });
    } else if (req.method === "DELETE") {
      const deleted_service = new Service(null);
      const promise = await deleted_service.delete(id);
      if (promise.message) {
        return res.status(200).json({ message: promise.message });
      }
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error: any) {
    return res.status(500).json({ err: error.message });
  }
}
