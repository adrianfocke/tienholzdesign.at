import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language") || "";
  const preferredLanguage = acceptLanguage.startsWith("de") ? "de" : "en";

  const response = NextResponse.json({ language: preferredLanguage });
  response.cookies.set("language", preferredLanguage, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
  });

  return response;
}
