"use server";

import connectDB from "@/lib/dbConnect";
import scores from "@/models/scores";

export async function getTopTen() {
  await connectDB();
  const allScores = await scores.find().sort({ score: -1 }).limit(10);
  return allScores.map((score) => ({
    id: score._id.toString(),
    name: score.name,
    score: score.score,
    created_at: score.created_at,
  }));
}

export async function createScore(
  name: string,
  score: number,
  created_at: Date
) {
  await connectDB();
  const newScore = new scores({
    name,
    score,
    created_at,
  });
  const saved = await newScore.save();
  return {
    id: saved._id.toString(),
    name: saved.name,
    score: saved.score,
    created_at: saved.created_at,
  };
}
