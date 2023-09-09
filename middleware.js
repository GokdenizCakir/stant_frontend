import { NextResponse } from "next/server";
import {
  getCurrentQuestionIndex,
  hasLost,
  hasWon,
} from "./app/_utils/questions";

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
    request.nextUrl.pathname.startsWith("/soru/") ||
    request.nextUrl.pathname === "/soru/ilerle"
  ) {
    const playerHasWon = hasWon(jwt);
    const playerHasLost = hasLost(jwt);
    if (playerHasWon) {
      redirectURL.pathname = "/kazandin";
      return NextResponse.redirect(redirectURL);
    } else if (playerHasLost) {
      redirectURL.pathname = "/kaybettin";
      return NextResponse.redirect(redirectURL);
    }
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

  if (request.nextUrl.pathname === "/kazandin") {
    const playerHasWon = hasWon(jwt);
    if (!playerHasWon) {
      const playerHasLost = hasLost(jwt);
      if (playerHasLost) {
        redirectURL.pathname = "/kaybettin";
      } else {
        redirectURL.pathname = `/soru/${getCurrentQuestionIndex(jwt) + 1}`;
      }
      return NextResponse.redirect(redirectURL);
    }
  }

  if (request.nextUrl.pathname === "/kaybettin") {
    const playerHasLost = hasLost(jwt);
    if (!playerHasLost) {
      const playerHasWon = hasLost(jwt);
      if (playerHasWon) {
        redirectURL.pathname = "/kazandin";
      } else {
        redirectURL.pathname = `/soru/${getCurrentQuestionIndex(jwt) + 1}`;
      }
      return NextResponse.redirect(redirectURL);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/soru/:path*", "/kazandin", "/kaybettin"],
};
