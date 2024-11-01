import mongoose, { Schema } from "mongoose";

export interface Score {
  id: string;
  name: string;
  score: number;
  created_at: Date;
}

const Scores = new Schema({
  name: { type: String, required: true, maxLength: 3, uppercase: true },
  score: { type: Number, required: true },
  created_at: { type: Date, required: true },
});

export default mongoose.models.Scores || mongoose.model("Scores", Scores);
