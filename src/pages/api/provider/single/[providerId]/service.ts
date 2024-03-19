import { NextApiRequest, NextApiResponse } from "next";
import ServiceItemsModel from "../../../../../../models/service.model";
import { connectDB } from "@/utils/dbconnection";
import ServiceProviderModel from "../../../../../../models/ServiceProvider.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();
    const { providerId } = req.query;

    if (req.method === "POST") {
      if (!providerId) {
        return res.status(400).json({
          error: true,
          message: "Provider ID is required for creating a service item.",
        });
      }

      const providerExists = await ServiceProviderModel.findById(providerId);
      if (!providerExists) {
        return res.status(404).json({
          error: true,
          message: "Service provider not found.",
        });
      }

      const newServiceItem = new ServiceItemsModel({
        ...req.body,
        service_id: providerId,
      });

      await newServiceItem.save();

      const populatedServiceItem = await ServiceItemsModel.findById(
        newServiceItem._id
      ).populate("service_id", "title image description");

      return res
        .status(201)
        .json({ success: true, data: populatedServiceItem });
    } else {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "An error occurred processing your request.",
    });
  }
}
