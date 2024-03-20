import { NextApiRequest, NextApiResponse } from "next";
import ServiceProviderModel from "../../../../models/ServiceProvider.model";
import { connectDB } from "@/utils/dbconnection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();
    if (req.method === "GET") {
      const providerItems = await ServiceProviderModel.find({});

      if (providerItems.length > 0) {
        return res.status(200).json({
          message: "Found service providers",
          data: providerItems,
        });
      } else {
        return res.json({ message: "No providers found", data: [] });
      }
    } else if (req.method === "POST") {
      if (!req.body) return;
      const newServiceProvider = new ServiceProviderModel(req.body);
      await newServiceProvider.save();
      return res
        .status(201)
        .json({
          success: true,
          data: newServiceProvider,
          message: "Saved service providers",
        });
    } else {
      res.status(405).json({ success: false, message: "Method Not Allowed" });
    }
  } catch (error: any) {
    return res.status(500).json({ err: error.message });
  }
}
