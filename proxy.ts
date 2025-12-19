import { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { NextResponse } from "next/server";

export const proxy = async (request: NextRequest) => {
  const session = getSessionCookie(request);
  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/create", "/bounces/:path*"], //routes the proxiy/middleware applies to
};
