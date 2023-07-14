import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth";
import { authOptions } from '../auth/[...nextauth]/route';
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";


export async function DELETE(request) {
    const client = new MongoClient(process.env.MONGODB_URI);
    // console.log(client);
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
      console.log(user);
      const userId = user._id;

      //delete the user's data from the user's collection

      //it is not deleteing the account, events, or user docs
//does this now work? changed it to _id
// const result = await collection.findOne({ _id: new ObjectId(userId) });
// console.log(result);
      await collection.deleteOne({ _id: new ObjectId(userId) });
      //delete the user's data from the savedInfo's collection

      //it is only deleting this one
      collection = db.collection("savedInfo");
      const savedInfo = await collection.findOne({ userId: new ObjectId(userId) });
      if (savedInfo) {
            console.log(savedInfo);
      await collection.deleteOne({ userId: new ObjectId(userId) });
        }

      //delete the user's data from the eventInfo's collection
      collection = db.collection("eventInfo");
      const eventInfo = await collection.findOne({ userId: new ObjectId(userId) });
      if (eventInfo) {
        console.log(eventInfo);
        await collection.deleteMany({ userId: new ObjectId(userId) });
      }
        
      //delete the user's data from the account's collection
      collection = db.collection("accounts");
    //   const account = await collection.findOne({ userId: new ObjectId(userId) });
        // console.log(account);
      await collection.deleteOne({ userId: new ObjectId(userId) });
      return NextResponse.json({ message: "delted profile in database" }) 
    } catch (error) {
      console.log(error);
    }
    finally {
        await client.close();
        const newURL = new URL('/', request.url)
        return NextResponse.redirect(newURL)
    }
}