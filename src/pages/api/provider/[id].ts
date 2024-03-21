import { NextApiRequest, NextApiResponse } from "next";
import ServiceProviderModel from ".././../../../models/ServiceProvider.model";
import ServicesModel from ".././../../../models/service.model";
import { connectDB } from "@/utils/dbconnection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();
    const { id } = req.query;
    if (req.method === "GET") {
      //65ef3dc98a91bcaaf07b594e
      if (!id)
        return res
          .status(400)
          .json({ error: false, message: "can't proceed with no ID" });
      const serviceProvider = await ServiceProviderModel.findById(id);
      if (!serviceProvider)
        return res.status(400).json({ message: "provider was not found" });

      try {
        const chains = await ServicesModel.find({ service_id: id }).populate(
          "service_id"
        );
        return res.status(200).json({
          success: true,
          serviceProvider: serviceProvider,
          data: chains,
        });
      } catch (e) {}
    } else if (req.method === "PUT" || req.method === "PATCH") {
      const serviceProviderToUpdate = await ServiceProviderModel.findById(id);
      if (!serviceProviderToUpdate) {
        return res.status(404).json({ message: "Service Provider Not Found" });
      }
      const dataToUpdate = req.body;
      const updateServiceProvider =
        await ServiceProviderModel.findByIdAndUpdate(id, dataToUpdate, {
          new: true,
        });
      return res
        .status(200)
        .json({ success: true, data: updateServiceProvider });
    } else if (req.method === "DELETE") {
      //Delete All Service Items With The same service_id as the id

      const serviceItemsToDelete = await ServicesModel.deleteMany({
        service_id: id,
      });
      const serviceProviderToDelete = await ServiceProviderModel.findById(id);
      if (!serviceProviderToDelete) {
        return res.status(404).json({ message: "Service Provider Not Found" });
      }
      await ServiceProviderModel.findByIdAndDelete(id);
      return res.status(200).json({
        success: true,
        message: "Service Provider Deleted Successfully!",
      });
    } else {
      return res
        .status(405)
        .json({ success: false, message: "Method Not Allowed" });
    }
  } catch (error: any) {
    return res.status(500).json({ err: error.message });
  }
}
