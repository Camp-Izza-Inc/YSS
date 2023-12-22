import { db } from "@/db";
import { NextResponse } from "next/server";

const validateInputs = (data) => {};

export async function POST(request) {
  const body = await request.json();
  console.log(body);
  return NextResponse.json({ message: "ok" });
}
