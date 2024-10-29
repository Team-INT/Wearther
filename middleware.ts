import { NextRequest, NextResponse } from "next/server"
import { match } from "path-to-regexp"

const matchersForAuth = [
  '/recommend/*',
]

const matchersForSignIn = [
  '/register/*', 
  '/login/*'
]

export async function middleware(request: NextRequest) {
  // 인증이 필요한 경로와 일치
  if(isMatch(request.nextUrl.pathname, matchersForAuth)){
    return (await getSession()) ? NextResponse.next() : NextResponse.redirect(new URL('/login', request.url))
  }

  // 인증 후 회원가입/로그인 접근 제한
  if(isMatch(request.nextUrl.pathname, matchersForSignIn)){
    return (await getSession()) ? NextResponse.redirect(new URL('/', request.url)) : NextResponse.next()
  }

  return NextResponse.next()
}

function isMatch(pathname: string, urls: string[]){
  return urls.some(url => !!match(url)(pathname))
}