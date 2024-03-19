import mongoose, { Schema, Document } from "mongoose";

export interface IServiceProvider extends Document {
  title: string;
  image: string;
  description: string;
}

const ServiceProviderSchema: Schema = new Schema<IServiceProvider>({
  title: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
});

const ServiceProviderModel =
  mongoose.models.ServiceProviders ||
  mongoose.model<IServiceProvider>("ServiceProviders", ServiceProviderSchema); // Updated model name and type

export default ServiceProviderModel;
