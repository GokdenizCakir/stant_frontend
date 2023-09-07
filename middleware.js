import { NextResponse } from "next/server";

export function middleware(request) {
  const jwt = request.cookies.get("jwt")?.value;
  const redirectURL = request.nextUrl.clone();
  let isLoggedIn = false;

  if (jwt !== undefined && jwt !== "") {
    isLoggedIn = true;
  }

  if (request.nextUrl.pathname === "/") {
    if (isLoggedIn) {
      redirectURL.pathname = "/soru";
      return NextResponse.redirect(redirectURL);
    }
  } else {
    if (!isLoggedIn) {
      redirectURL.pathname = "/";
      return NextResponse.redirect(redirectURL);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/soru", "/soru/ilerle"],
};
