import {getSession} from "@/server/auth";
import {NextRequest, NextResponse} from "next/server";
// import {match} from "path-to-regexp";

const matchersForAuth = [
  "/recommend/:path*", // `*` 와일드카드는 이름이 필요함
];

const matchersForSignIn = ["/register/:path*", "/login/:path*"];

export async function middleware(request: NextRequest) {
  // 인증이 필요한 경로와 일치
  // if (isMatch(request.nextUrl.pathname)) {
  //   return (await getSession())
  //     ? NextResponse.next()
  //     : NextResponse.redirect(new URL("/login", request.url));
  // }

  // 인증 후 회원가입/로그인 접근 제한
  // if (isMatch(request.nextUrl.pathname, matchersForSignIn)) {
  //   return (await getSession()) ? NextResponse.redirect(new URL('/', request.url)) : NextResponse.next();
  // }

  return NextResponse.next();
}

// function isMatch(pathname: string, urls: string[]) {
//   return urls.some((url) => {
//     const matcher = match(url, {decode: decodeURIComponent});
//     const result = matcher(pathname);
//     return result !== false; // `false`가 아닌 경우 일치하는 경로
//   });
// }
