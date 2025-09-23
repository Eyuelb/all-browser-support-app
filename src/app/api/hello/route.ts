// app/api/hello/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Hello from Next.js API 🚀",
    time: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    message: `You sent: ${body.text}`,
    time: new Date().toISOString(),
  });
}
