import { NextResponse } from "next/server";

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get("host")?.replace(/^www\./, "") || "";

  // Skip API or static routes
  if (url.pathname.startsWith("/_next") || url.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  try {
    // Call your backend API — which uses domainResolver.js
    const res = await fetch(`${process.env.API_URL}/api/domains/${hostname}`, {
      headers: { Authorization: `Bearer ${process.env.INTERNAL_TOKEN}` },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();

      if (data?.portfolioId) {
        url.pathname = `/portfolio/${data.portfolioId}`;
        return NextResponse.rewrite(url);
      }
    }
  } catch (err) {
    console.error("Middleware domain lookup failed:", err);
  }

  // Default: main site
  return NextResponse.next();
}
