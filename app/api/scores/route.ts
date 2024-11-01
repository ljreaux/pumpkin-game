"use server";
import { createScore, getTopTen } from "@/app/actions";

export async function GET() {
  try {
    const topTen = await getTopTen();
    return new Response(JSON.stringify(topTen), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch top ten scores" }),
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, score, created_at } = await req.json();
    if (!name || !score || !created_at) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const savedScore = await createScore(name, score, created_at);
    if (!savedScore) {
      return new Response(JSON.stringify({ error: "Failed to save score" }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify(savedScore), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to save score" }), {
      status: 500,
    });
  }
}
