import { NextApiRequest, NextApiResponse } from "next";
import ServiceItemsModel from "../../../../../../models/service.model";
import { connectDB } from "@/utils/dbconnection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const { providerId, serviceItemId } = req.query;

  if (req.method === "GET") {

    if (!serviceItemId) {
      return res
        .status(400)
        .json({ error: true, message: "Service item ID is required" });
    }
    const serviceItem = await ServiceItemsModel.findById(serviceItemId);
    if (!serviceItem) {
      return res.status(404).json({ message: "Service item not found" });
    }
    return res.status(200).json({ success: true, data: serviceItem });
  } else if (req.method === "PUT" || req.method === "PATCH") {
    if (!serviceItemId) {
      return res.status(400).json({
        error: true,
        message: "Service item ID is required for update",
      });
    }
    const updatedServiceItem = await ServiceItemsModel.findByIdAndUpdate(
      serviceItemId,
      req.body,
      { new: true }
    );
    if (!updatedServiceItem) {
      return res.status(404).json({ message: "Service item not found" });
    }
    return res.status(200).json({ success: true, data: updatedServiceItem });
  } else if (req.method === "DELETE") {
    if (!serviceItemId) {
      return res.status(400).json({
        error: true,
        message: "Service item ID is required for deletion",
      });
    }
    const deletedServiceItem = await ServiceItemsModel.findByIdAndDelete(
      serviceItemId
    );
    if (!deletedServiceItem) {
      return res.status(404).json({ message: "Service item not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Service item deleted successfully" });
  } else {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }
}
