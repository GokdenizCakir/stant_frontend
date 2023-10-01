import { NextResponse } from "next/server";
import {
  getCurrentQuestionIndex,
  getPlayerStatus,
  hasGaveUp,
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
    request.nextUrl.pathname.startsWith("/soru/ilerle/")
  ) {
    const playerStatus = getPlayerStatus(jwt);
    if (playerStatus !== "playing") {
      if (playerStatus === "hasWon") {
        redirectURL.pathname = "/kazandin";
      } else if (playerStatus === "hasLost") {
        redirectURL.pathname = "/kaybettin";
      } else if (playerStatus === "hasGaveUp") {
        redirectURL.pathname = "/pes-ettin";
      }
      return NextResponse.redirect(redirectURL);
    }
  }

  if (
    request.nextUrl.pathname.startsWith("/soru/") &&
    !request.nextUrl.pathname.startsWith("/soru/ilerle/")
  ) {
    const questionOrder = Number(request.nextUrl.pathname.split("/")[2]);
    const currentQuestionIndex = getCurrentQuestionIndex(jwt);
    if (questionOrder !== currentQuestionIndex + 1) {
      redirectURL.pathname = `/soru/${currentQuestionIndex + 1}`;
      return NextResponse.redirect(redirectURL);
    }
  }

  if (request.nextUrl.pathname.startsWith("/soru/ilerle/")) {
    const questionOrder = Number(request.nextUrl.pathname.split("/")[3]);
    const currentQuestionIndex = getCurrentQuestionIndex(jwt);
    if (questionOrder !== currentQuestionIndex + 1) {
      redirectURL.pathname = `/soru/ilerle/${currentQuestionIndex + 1}`;
      return NextResponse.redirect(redirectURL);
    }
  }

  if (request.nextUrl.pathname === "/kazandin") {
    const playerStatus = getPlayerStatus(jwt);
    const playerHasWon = playerStatus === "hasWon";
    if (!playerHasWon) {
      redirectURL.pathname = `/hacker-misin-sen`;
      return NextResponse.redirect(redirectURL);
    }
  } else if (request.nextUrl.pathname === "/pes-ettin") {
    const playerStatus = getPlayerStatus(jwt);
    const playerHasGaveUp = playerStatus === "hasGaveUp";
    if (!playerHasGaveUp) {
      redirectURL.pathname = `/hacker-misin-sen`;
      return NextResponse.redirect(redirectURL);
    }
  } else if (request.nextUrl.pathname === "/kaybettin") {
    const playerStatus = getPlayerStatus(jwt);
    const playerHasLost = playerStatus === "hasLost";
    if (!playerHasLost) {
      redirectURL.pathname = `/hacker-misin-sen`;
      return NextResponse.redirect(redirectURL);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/soru/:path*",
    "/kazandin",
    "/kaybettin",
    "/pes-ettin",
    "/hacker-misin-sen",
  ],
};
