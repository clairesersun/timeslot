import SignIn from '../components/signin';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import  AddAlert  from '../components/alert';
// import { useRouter } from 'next/router';


export const metadata = {
    title: 'Events',
    description: 'Event page for the scheduling app',
    keywords: 'scheduling app'
  }

  
  
  async function addEvent(data: FormData) {
    'use server'
    const { MongoClient } = require("mongodb");
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
      const eventName = data.get('eventName')?.valueOf()
      console.log(eventName)
      const eventnameParams = eventName.toString().toLowerCase().replace(/\s/g, '')
      console.log(eventnameParams)
      
      if (typeof eventName !== 'string' || eventName.length === 0) {
        throw new Error ('Name is required')
      }
      const description = data.get('description')
      if (typeof description !== 'string' || description.length === 0) {
        throw new Error ('Description is required')
      }
      const length = data.get('length')
      if (typeof length !== 'string' || length.length === 0) {
        throw new Error ('Length is required')
      }
      
      const session = await getServerSession(authOptions)
      
      const googleEmail = session.user.email
      
      
      const dbName = "users";
      await client.connect();
      console.log("Connected correctly to server");
      const db = client.db(dbName);
      let collection = db.collection("users");
      const users = await collection.findOne({ email: googleEmail })
      // console.log(users._id)
      const userId = users._id
      //this allows me to take the userId to find the access_token from sessions later down the road
      collection = db.collection("eventInfo");
      // Insert a single document, wait for promise so we can read it back
      const newInfo = await collection.insertOne({eventName, eventnameParams, description, length, userId, googleEmail });
      return console.log("added info in database: " +
      eventName +
      ", " +
      eventnameParams +
      ", " +
      description +
      ", " +
      length)
      // AddAlert(eventName, eventnameParams, description, length)
      
    } catch (error) {
      console.log(error)
    }
    finally {
      await client.close();
  }
    }
  



    export default async function Events() {
      const session = await getServerSession(authOptions)
      if (!session) {
        return <SignIn /> }
  
    
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
  
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          
        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
            
            <p className={`mb-3 text-2xl font-semibold`}>
              Add Events
            </p>
          <form action={addEvent} id='add-event-form' className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
          <label htmlFor="eventName" >Event Name:</label> 
          <input type="text" name="eventName" id="eventName" />
          <label htmlFor="description">Description:</label>
          <input type="text" name='description' id='description' />
          <label htmlFor="length">Length:</label>
          <input type="text" name='length' id='length' />
          <button type='submit'>Submit</button>
          </form>
          {/* {deleteAccount()} */}
          {/* figure out how to do a pop up delete btn */}
          </div>
        </div>
      </main>
    )
  }

