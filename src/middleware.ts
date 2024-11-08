import {auth} from "./auth";
import {NextRequest, NextResponse} from "next/server";
export async function middleware(request: NextRequest) {
  // 인증이 필요한 경로와 일치
  // if(isMatch(request.nextUrl.pathname, matchersForAuth)){
  //   return (await getSession()) ? NextResponse.next() : NextResponse.redirect(new URL('/login', request.url))
  // }

  const session = await auth();
  // if (!session) {
  //   return NextResponse.redirect("http://localhost:3000");
  // }

  // 인증 후 회원가입/로그인 접근 제한
  // if(isMatch(request.nextUrl.pathname, matchersForSignIn)){
  //   console.log(await getSession())
  //   return (await getSession()) ? NextResponse.redirect(new URL('/', request.url)) : NextResponse.next()
  // }

  return NextResponse.next();
}
