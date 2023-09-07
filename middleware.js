import { NextResponse } from "next/server";
import { getCurrentQuestionIndex } from "./app/_utils/questions";

export function middleware(request) {
  const jwt = request.cookies.get("jwt")?.value;
  const redirectURL = request.nextUrl.clone();
  let isLoggedIn = false;

  if (jwt !== undefined && jwt !== "") {
    isLoggedIn = true;
  }

  if (request.nextUrl.pathname === "/" && isLoggedIn) {
    const currentQuestionIndex = getCurrentQuestionIndex(jwt);
    redirectURL.pathname = `/soru/${currentQuestionIndex + 1}`;
    return NextResponse.redirect(redirectURL);
  } else if (request.nextUrl.pathname !== "/" && !isLoggedIn) {
    redirectURL.pathname = "/";
    return NextResponse.redirect(redirectURL);
  }

  if (
    request.nextUrl.pathname.startsWith("/soru/") &&
    request.nextUrl.pathname !== "/soru/ilerle"
  ) {
    const questionOrder = Number(request.nextUrl.pathname.split("/")[2]);
    const currentQuestionIndex = getCurrentQuestionIndex(jwt);
    if (questionOrder !== currentQuestionIndex + 1) {
      redirectURL.pathname = `/soru/${currentQuestionIndex + 1}`;
      return NextResponse.redirect(redirectURL);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/soru/:path*", "/soru/ilerle"],
};
