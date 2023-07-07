"use server";

export default async function Deleting() {
  try {
    const { MongoClient } = require("mongodb");
    const client = new MongoClient(process.env.MONGODB_URI);
    const session = await getServerSession(authOptions);
    const googleEmail = session.user.email;

    const dbName = "users";
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    let collection = db.collection("users");
    //delete the single instance of the user from the users collection
    const users = await collection.deleteOne({ email: googleEmail });
    return console.log("deleted info from database");
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}
