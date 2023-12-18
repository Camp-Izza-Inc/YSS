import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/constants";
import { serialize } from "cookie";
const jose = require("jose");
const SECRET = process.env.JWT_KEY || "";

export async function POST(request) {
  try {
    const secret = new TextEncoder().encode(SECRET);
    const token = await new jose.SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(-1)
      .sign(secret);

    const serialized = serialize(COOKIE_NAME, token, {
      httpOnly: true,
      maxAge: -1,
      sameSite: true,
      path: "/",
    });

    return new Response(
      JSON.stringify({
        success: true,
      }),
      { headers: { "Set-Cookie": serialized } }
    );
  } catch (e) {
    return NextResponse.json(
      {
        success: false,
        message: `Internal Error: ${error}`,
      },
      { status: 500 }
    );
  }
}
