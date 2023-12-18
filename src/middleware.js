import { NextResponse } from "next/server";
import { COOKIE_NAME } from "./constants";
import { jwtVerify } from "jose";

const SECRET = process.env.JWT_KEY || "";

export async function middleware(request) {
  const cookie = request.cookies.get(COOKIE_NAME);
  if (!cookie) return NextResponse.redirect(new URL("/login", request.url));

  const secret = new TextEncoder().encode(SECRET);
  const token = cookie.value;
  const headers = new Headers(request.headers);
  try {
    const { payload, protectedHeader } = await jwtVerify(token, secret);
    headers.set("id", payload.user_id);
    return NextResponse.next({
      request: {
        headers: headers,
      },
    });
  } catch (e) {
    console.log(e);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/youth/:path*", "/parent/:path*", "/admin/:path*"],
};
