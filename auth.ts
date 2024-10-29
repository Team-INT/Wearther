import NextAuth from 'next-auth'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers : [],
  session: {
    strategy : 'jwt',
    maxAge: 60*60*24 // 세션 만료 시간 24h
  },
  pages: {
    signIn : '/login'
  },
  callbacks: {
    signIn: async() => {
      return true
    },
    jwt: async({ token, user }) => {
      return token
    },
    session: async({ session, token }) => {
      return session
    },
    redirect: async({ url, baseUrl })=> {
      // 상대경로
      if(url.startsWith('/')) return `${baseUrl}${url}`

      // 절대경로
      if(url){
        const { search, origin } = new URL(url)
        // ?callbackUrl=
        const callbackUrl = new URLSearchParams(search).get('callbackUrl')
        if(callbackUrl){ // ?callbackUrl=상대경로 : ?callbackUrl=절대경로
          return callbackUrl.startsWith('/') ? `${baseUrl}${callbackUrl}` : callbackUrl
        }

        // 기존 경로 그대로
        if(origin === baseUrl) return url
      }
      return baseUrl
    }
  },
})