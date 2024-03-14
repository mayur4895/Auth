import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserById } from "@/data/user"
import { Session } from "inspector"
import { userRole } from "@prisma/client"
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({

  pages:{
    signIn: "auth/login",
     error: "auth/error"
  },
  events:{
    async linkAccount({user}){
      await db.user.update({
       where:{id: user.id},
       data:{emailVerified:new Date()}
      })
    }
  },
 
  callbacks:{
   async session({token,session}){
    console.log({SessionToken:token});
 
    if(token.sub && session.user){
      session.user.id = token.sub 
      session.user.role = token.role as userRole;
    }   
    return session;
   },
    async jwt({token}){ 
    if(!token.sub) return token; 
    const userExist = await getUserById(token.sub); 
    if(!userExist) return token; 
    token.role = userExist.role;  
    return token; 
      
    }
  },
 
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})