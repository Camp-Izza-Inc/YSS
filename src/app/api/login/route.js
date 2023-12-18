import { db } from "@/db";
import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { COOKIE_NAME, TOKEN_EXPIRATION } from "@/constants";
const bcrypt = require("bcrypt");
const jose = require("jose");
const SECRET = process.env.JWT_KEY || "";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const account = await db.accounts.findUnique({
      where: {
        email: email,
      },
    });

    if (!account) {
      // email not found
      return NextResponse.json({
        auth: false,
        message: "Email has not been registered",
      });
    }

    const match = await bcrypt.compare(password, account.user_password);
    if (!match) {
      // incorrect password
      return NextResponse.json({
        auth: false,
        message: "Invalid email and password combination",
      });
    }

    // correct password
    const secret = new TextEncoder().encode(SECRET);
    const token = await new jose.SignJWT({
      user_id: account.id,
      account_type: account.account_type,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret);

    const serialized = serialize(COOKIE_NAME, token, {
      httpOnly: true,
      maxAge: TOKEN_EXPIRATION,
      sameSite: true,
      path: "/",
    });

    return new Response(
      JSON.stringify({
        auth: true,
        account_type: account.account_type,
      }),
      { headers: { "Set-Cookie": serialized } }
    );
  } catch (error) {
    return NextResponse.json(
      {
        auth: false,
        message: `Internal Error: ${error}`,
      },
      { status: 500 }
    );
  }
}
