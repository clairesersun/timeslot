"use server";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/route";
import { MongoClient } from "mongodb";

export default async function Deleting() {
  const client = new MongoClient(process.env.MONGODB_URI);
  console.log(client);
  const session = await getServerSession(authOptions);
  try {
    const googleEmail = session.user.email;
    await client.connect();
    console.log("Connected correctly to server");
    const dbName = "users";
    const db = client.db(dbName);
    let collection = db.collection("users");
    //delete the single instance of the user from the users collection
    const user = await collection.findOne({ email: googleEmail });
    const userId = user._id;
    //delete the user's data from the user's collection
    await collection.deleteOne({ email: googleEmail });
    //delete the user's data from the savedInfo's collection
    collection = db.collection("savedInfo");
    await collection.deleteOne({ userId: userId });
    //delete the user's data from the eventInfo's collection
    collection = db.collection("eventInfo");
    await collection.deleteAll({ userId: userId });
    //delete the user's data from the account's collection
    collection = db.collection("accounts");
    await collection.deleteOne({ userId: userId });

    return console.log("deleted info from database");
  } catch (error) {
    console.log(error);
  }
}
