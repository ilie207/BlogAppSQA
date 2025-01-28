import { NextResponse } from "next/server";
import { generateToken } from "../../../../middleware/csrf";

export async function GET() {
  return NextResponse.json({ csrfToken: generateToken() });
}
