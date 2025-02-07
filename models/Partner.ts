import mongoose, { Schema, Document } from "mongoose";

// 1️⃣ Define TypeScript Interface
export interface IPartner extends Document {
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  currentLoad: number; // max: 3
  areas: string[];
  shift: { start: string; end: string };
  metrics: { rating: number; completedOrders: number; cancelledOrders: number };
}

// 2️⃣ Define Mongoose Schema
const PartnerSchema = new Schema<IPartner>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  currentLoad: { type: Number, default: 0, max: 3 },
  areas: { type: [String], required: true },
  shift: {
    start: { type: String, required: true },
    end: { type: String, required: true },
  },
  metrics: {
    rating: { type: Number, default: 5 },
    completedOrders: { type: Number, default: 0 },
    cancelledOrders: { type: Number, default: 0 },
  },
});

// 3️⃣ Export the Model
export default mongoose.models.Partner || mongoose.model<IPartner>("Partner", PartnerSchema);
