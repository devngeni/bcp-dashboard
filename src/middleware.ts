import { NextResponse } from "next/server";
import { useEffect } from "react";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
