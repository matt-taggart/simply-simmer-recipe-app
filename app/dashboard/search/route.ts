import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  try {
    const response = await axios.get(process.env.BRAVE_SEARCH_API_URL!, {
      params: {
        q: query,
      },
      headers: {
        "X-Subscription-Token": process.env.BRAVE_SEARCH_API_KEY,
        Accept: "application/json", // Explicitly setting the Accept header
      },
    });

    const searchResults = response.data.web.results.filter(
      (result) => result.subtype === "recipe"
    );

    return NextResponse.json(searchResults);
  } catch (error) {
    return NextResponse.json({ error: "An unexpected error occurred" });
  }
}
