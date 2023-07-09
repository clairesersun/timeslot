import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../../app/../../db/connection.ts"



export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        }},
        }),
      ],
      // callbacks: {
      //   async session({ session, user }) {
      //     const dbName = "users";
      //     // const session = await getServerSession(authOptions);
      //     const { MongoClient } = require("mongodb");
      //     const client = new MongoClient(process.env.MONGODB_URI);
      //     await client.connect();
      //     // console.log("Connected correctly to server");
      //     const db = client.db(dbName);
      //     //this allows me to take the userId to find the access_token from sessions later down the road
      //     let collection = db.collection("accounts");

      //     const [google] = await collection.findOne({
      //       userId: user.id, provider: "google" 
      //     })
      //     if (google.expires_at * 1000 < Date.now()) {
      //       // If the access token has expired, try to refresh it
      //       try {
      //         // https://accounts.google.com/.well-known/openid-configuration
      //         // We need the `token_endpoint`.
      //         const response = await fetch("https://oauth2.googleapis.com/token", {
      //           headers: { "Content-Type": "application/x-www-form-urlencoded" },
      //           body: new URLSearchParams({
      //             client_id: process.env.GOOGLE_CLIENT_ID,
      //             client_secret: process.env.GOOGLE_CLIENT_SECRET,
      //             grant_type: "refresh_token",
      //             refresh_token: google.refresh_token,
      //           }),
      //           method: "POST",
      //         })
    
      //         const tokens = await response.json()
    
      //         if (!response.ok) throw tokens
    
      //         await collection.update({
      //           data: {
      //             access_token: tokens.access_token,
      //             expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
      //             refresh_token: tokens.refresh_token ?? google.refresh_token,
      //           },
      //           where: {
      //             provider_providerAccountId: {
      //               provider: "google",
      //               providerAccountId: google.providerAccountId,
      //             },
      //           },
      //         })
      //       } catch (error) {
      //         console.error("Error refreshing access token", error)
      //         // The error property will be used client-side to handle the refresh token error
      //         session.error = "RefreshAccessTokenError"
      //       }
      //     }
      //     return session
      //   },
      // },
      
    
  secret: process.env.SECRET,
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }


