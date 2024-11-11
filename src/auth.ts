import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

import {JWT} from "next-auth/jwt";
import {Account, User} from "next-auth";
import {AdapterUser} from "@auth/core/adapters";

// 말씀하신 부분도 해당이 되지만, Credentials 공급자는 로그인 처리 서버(DB)가 별도로 있을테니,
// 직접 액세스 코드를 받아와서 그대로 활용하는 용도입니다.

export const {handlers, signIn, signOut, auth} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {label: "User Name", type: "text"},
        email: {label: "Email", type: "email"},
        password: {label: "Password", type: "password"},
      },
      authorize: async (credentials) => {
        try {
          console.log("Credentials 전달:", credentials);

          const type = credentials.username ? "register" : "login";
          const response = await _signIn(type, credentials);

          console.log("API 응답 데이터:", response);

          // 서버 구조와 동일하게 응답 구조 변경
          if (response && response.userId) {
            const user = {
              id: response.userId.toString(),
              name: response.username,
              email: response.userEmail,
              accessToken: response.accessToken,
              refreshToken: response.refreshToken,
            };
            return user;
          } else {
            console.error("잘못된 유저 데이터를 api로 넘겼습니다.");
            return null;
          }
        } catch (error) {
          console.error("인증 함수 에러:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 세션 만료 시간 24h
  },

  // https://authjs.dev/reference/core#pages
  pages: {
    signIn: "/login",
    newUser: "/register",
  },

  callbacks: {
    signIn: async () => {
      return true;
    },
    jwt: async ({token, user}: {token: JWT; user: User | AdapterUser; account: Account | null}) => {
      if (user && "accessToken" in user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    session: async ({session, token}) => {
      if (token?.accessToken) {
        (session as any).accessToken = token.accessToken;
      }
      return session;
    },
    // redirect: async ({url, baseUrl}) => {
    //   // 상대경로
    //   if (url.startsWith("/")) return `${baseUrl}${url}`;

    //   // 절대경로
    //   if (url) {
    //     const {search, origin} = new URL(url);
    //     // ?callbackUrl=
    //     const callbackUrl = new URLSearchParams(search).get("callbackUrl");
    //     if (callbackUrl) {
    //       // ?callbackUrl=상대경로 : ?callbackUrl=절대경로
    //       return callbackUrl.startsWith("/") ? `${baseUrl}${callbackUrl}` : callbackUrl;
    //     }

    //     // 기존 경로 그대로
    //     if (origin === baseUrl) return url;
    //   }
    //   return baseUrl;
    // },
  },
});

async function _signIn(type: string, body: any) {
  console.log("Entering _signIn with type:", type, "and body:", body);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/${type}/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  console.log("API 응답:", res.status);

  const data = await res.json();
  console.log("API 응답 데이터:", data);

  if (!res.ok) {
    console.error("인증 실패 코드", res.status);
    throw new Error("인증 실패용 ㅠㅠ");
  }

  return data;
}

// async function _signIn(
//   type: "register" | "login",
//   body: {username?: string; email: string; password: string}
// ) {
//   console.log("-----------enter signin");
//   console.log(`${process.env.NEXT_PUBLIC_API_URL}/auth/${type}/email`);
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/${type}/email`, {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   });

//   const data = await res.json();

//   if (res.ok && typeof data !== "string") {
//     const {user} = data;

//     return {
//       email: user.email,
//       name: user.username,
//     };
//   }
// }
