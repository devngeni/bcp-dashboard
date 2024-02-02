import mongoose, { Schema, Document } from "mongoose";

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
  content: IContentItem[];
}

const ServiceItemSchema: Schema = new Schema<IServiceItem>({
  category: {
    type: Schema.Types.String,
    required: true,
    enum: {
      values: Object.values(Category),
      message: `Category can only be, ${Object.values(Category).join(",")}`,
    },
  },
  subTitle: { type: Schema.Types.String, required: true },
  content: [
    {
      name: { type: Schema.Types.String, required: true },
      description: { type: Schema.Types.String },
      imagePath: { type: Schema.Types.String, required: true },
      price: { type: Schema.Types.Number, required: true },
    },
  ],
});

const ServiceItemsModel =
  mongoose.models.ServiceItems ||
  mongoose.model("ServiceItems", ServiceItemSchema);

export default ServiceItemsModel;
