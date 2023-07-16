import { NextResponse } from 'next/server'
import { MongoClient } from "mongodb";
import { revalidatePath } from "next/cache";
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';

export async function DELETE(request) {
    const client = new MongoClient(process.env.MONGODB_URI);
    const session = await getServerSession(authOptions)
    const googleEmail = session.user.email
    const slug = request.headers.get('slug')
    try {
      const dbName = "users";
      await client.connect();
      console.log("Connected correctly to server");
      const db = client.db(dbName);
      let collection = db.collection("users");
      collection = db.collection("eventInfo");
      // Insert a single document, wait for promise so we can read it back
      const eventInfo = await collection.findOne({$and:
        [{ googleEmail: googleEmail }, 
        {eventnameParams: slug}] });
        // console.log(eventInfo)
        let eventName = eventInfo.eventName;
        let eventnameParams = eventInfo.eventnameParams;
        let description = eventInfo.description;
        let length = eventInfo.length;
    // let googleEmail = eventInfo.googleEmail;
    debugger
      await collection.deleteOne(
        {$and:
        [{ googleEmail: googleEmail }, 
        {eventnameParams: eventnameParams}, 
        {eventName: eventName},
        {description: description},
        {length: length}
      ] } );
      return console.log("deleted info from database")
    } catch (error) {
      console.log(error)
    }
    finally {
      revalidatePath('/')
      revalidatePath('/[user]/[event]')
      await client.close();
        const newURL = new URL('/deleted', request.url)
        return NextResponse.redirect(newURL)
  }
    }