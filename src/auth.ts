import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

export const {handlers, signIn, signOut, auth} = NextAuth({
  providers: [
    CredentialsProvider({
      authorize: async (credentials) => {
        if (!credentials.email || !credentials.password) {
          throw new Error("Missing email or password");
        }

        console.log(credentials);
        const userInfo = credentials;

        try {
          if (userInfo.userName) {
            return _signIn("register", userInfo);
          }
          return _signIn("login", userInfo);
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 세션 만료 시간 24h
  },
  callbacks: {
    signIn: async () => {
      return true;
    },
    jwt: async ({token, user}) => {
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    session: async ({session, token}) => {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
    redirect: async ({url, baseUrl}) => {
      // 상대경로
      if (url.startsWith("/")) return `${baseUrl}${url}`;

      // 절대경로
      if (url) {
        const {search, origin} = new URL(url);
        // ?callbackUrl=
        const callbackUrl = new URLSearchParams(search).get("callbackUrl");
        if (callbackUrl) {
          // ?callbackUrl=상대경로 : ?callbackUrl=절대경로
          return callbackUrl.startsWith("/") ? `${baseUrl}${callbackUrl}` : callbackUrl;
        }

        // 기존 경로 그대로
        if (origin === baseUrl) return url;
      }
      return baseUrl;
    },
  },
});

async function _signIn(
  type: "register" | "login",
  body: {userName?: string; email: string; password: string}
) {
  console.log("-----------enter signin");
  console.log(`${process.env.NEXT_PUBLIC_API_URL}/auth/${type}/email`);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/${type}/email`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  console.log(data);
  if (res.ok && typeof data !== "string") {
    const {user} = data;

    return {
      email: user.email,
      name: user.userName,
      password: user.password,
    };
  }
}
