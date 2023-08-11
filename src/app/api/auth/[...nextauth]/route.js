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
          redirect_uri: "https://timeslot-iota.vercel.app/api/auth/callback/google",
        }},
        }),
      ],
  callbacks: {
    async session ({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken
      session.user.id = token.id
      
      return session
    }},
    // async session({ session, user }) {
    //   const dbName = "users";
    //   // const session = await getServerSession(authOptions);
    //   const { MongoClient } = require("mongodb");
    //   const client = new MongoClient(process.env.MONGODB_URI);
    //   await client.connect();
    //   // console.log("Connected correctly to server");
    //   const db = client.db(dbName);
    //   //this allows me to take the userId to find the access_token from sessions later down the road
    //   let collection = db.collection("accounts");

    //   const [google] = await collection.findOne({
    //     userId: user.id, provider: "google" 
    //   }
    //   )
    //   return session = google
    // }},
  secret: process.env.SECRET,
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }


