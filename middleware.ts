import { NextRequest, NextResponse } from "next/server";

const DEFAULT_LANG = "en";

export function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const lang = nextUrl.searchParams.get("lang");

  // Eğer zaten lang varsa hiçbir şey yapma
  if (lang) {
    return NextResponse.next();
  }

  // Lang yoksa varsayılanı ekle
  nextUrl.searchParams.set("lang", DEFAULT_LANG);
  return NextResponse.redirect(nextUrl);
}
