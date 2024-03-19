import mongoose, { Schema, Document, Types } from "mongoose";
import { Service } from "@/services/inserter"; // Import Service here if needed
import ServiceProviderModel, {
  IServiceProvider,
} from "./ServiceProvider.model";

enum Category {
  ToursandExperiences = "TOURS AND EXPERIENCES",
  TravelConcierge = "TRAVEL CONCIERGE",
  Housekeeping = "HOUSEKEEPING",
  PropertyManagement = "PROPERTY MANAGEMENT",
  Drinks = "DRINKS",
  PrivateChefMealPrep = "PRIVATE CHEF & MEAL PREP",
  WellnessAndGrooming = "WELLNESS AND GROOMING",
  ShoppingAndGroceryRuns = "SHOPPING & GROCERY RUNS",
  NannyService = "NANNY SERVICE",
  Giftshop = "GIFTSHOP",
  Rentables = "RENTABLES",
  LauggageShop = "LAUGGAGE SHOP",
  BannerAd = "BANNER AD",
}

interface IContentItem {
  name: string;
  description?: string;
  imagePath: string;
  price: number;
}

export interface IServiceItem extends Document {
  category: Category;
  subTitle: string;
  tag: string;
  serviceProvider?: IServiceProvider; // Change serviceProvider type to IServiceProvider
  content: IContentItem[];
  service_id: Types.ObjectId;
}

const ServiceItemSchema: Schema = new Schema<IServiceItem>({
  category: {
    type: String,
    required: true,
    enum: {
      values: Object.values(Category),
      message: `Category can only be, ${Object.values(Category).join(",")}`,
    },
  },
  subTitle: { type: String, required: true },
  tag: { type: String },
  serviceProvider: { type: Schema.Types.ObjectId, ref: "ServiceProvider" }, // Change ref to "ServiceProvider"
  service_id: [{ type: Schema.Types.ObjectId, ref: "ServiceProviders" }], // Assuming this is correct, otherwise update the ref // also instead of [] just a {}
  content: [
    {
      name: { type: String, required: true },
      description: { type: String },
      imagePath: { type: String, required: false },
      price: { type: Number },
    },
  ],
});

const ServiceItemsModel =
  mongoose.models.ServiceItems ||
  mongoose.model<IServiceItem>("ServiceItems", ServiceItemSchema);

export default ServiceItemsModel;
