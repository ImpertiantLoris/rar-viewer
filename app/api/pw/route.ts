import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const password = body.password;

  console.log("PASSWORD ENTERED:", password);

  return NextResponse.json({ success: true });
}