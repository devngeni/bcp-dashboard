import { lookupService } from "dns/promises";
import ServiceItem from "../../models/service.model";
export class Service {
  bodyData: any;
  constructor(bodyData: any) {
    this.bodyData = bodyData;
  }

  async post() {
    if (!this.bodyData) throw new Error("body can't be empty"); // will take care of validations later

    const newService = new ServiceItem({
      ...this.bodyData,
    });
    try {
      const service = await newService.save();
      return service;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async get() {
    try {
      const services = await ServiceItem.find();
      if (services.length > 0) {
        return services;
      }
      return {
        message: "No services stored yet",
      };
    } catch (e: any) {
      throw new Error(e);
    }
  }
  async getSingleService(id: string) {
    try {
      const service = await ServiceItem.findById(id);
      if (!service) {
        throw new Error("No service found");
      }
      return service;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async edit(id: any) {
    try {
      const updated_service = await ServiceItem.findByIdAndUpdate(
        id,
        { ...this.bodyData },
        { new: true }
      );

      if (updated_service === null) {
        throw new Error("No service found");
      }
      return updated_service;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async delete(id: any) {
    try {
      const delete_service = await ServiceItem.findByIdAndDelete(id);
      if (delete_service === null) {
        throw new Error("No service found");
      }
      return {
        message: "successfully deleted the service",
      };
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
