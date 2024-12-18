import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "@/lib/firebase/service";
import { compare } from "bcrypt";

const AuthOptions: NextAuthOptions ={
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      async authorize(credentials){
        const {email, password} = credentials as {email: string, password: string}
        const user: any = await signIn(email)
        if(user){
          const passwordConfirm = await compare(password, user.password)
          if(passwordConfirm){
            return user
          }else{
            return null
          }
        }else{
          return null
        }
      }
    }),
  ],
  callbacks: {
    async jwt({token, account, profile, user}: any){
      if(account?.provider === "credentials"){
        token.email = user.email
        token.fullname = user.fullname
        token.role = user.role
        token.phone = user.phone
      }
      return token
    },
    async session({session, token}: any) {
      if('email' in token){
        session.user.email = token.email
      }
      if('fullname' in token){
        session.user.fullname = token.fullname
      }
      if('role' in token){
        session.user.role = token.role
      }
      if('phone' in token){
        session.user.phone = token.phone
      }
      return session
    }
  },
  pages: {
    signIn: "/auth/login",
  }
}

export default NextAuth(AuthOptions)