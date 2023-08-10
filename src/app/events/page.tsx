import SignIn from '../components/signin';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'
// import { useRouter } from 'next/router';


export const metadata = {
    title: 'Events',
    description: 'Event page for the scheduling app',
    keywords: 'scheduling app'
  }

  function onlyLettersAndSpaces(str) {
    return /^[A-Za-z\s]*$/.test(str);
  }
  
  
  async function addEvent(data: FormData) {
    'use server'
    const { MongoClient } = require("mongodb");
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
      const eventName = data.get('eventName')?.valueOf()
      // console.log(eventName)
      const eventnameParams = eventName.toString().toLowerCase().replace(/\s/g, '')
      //console.log(eventnameParams)
      
      if (typeof eventName !== 'string' || eventName.length === 0) {
        throw new Error ('Name is required')
      }

      if (!onlyLettersAndSpaces(eventName)) {
        throw new Error ('Only letters and spaces are allowed in the name')
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
      
      const googleEmail = session['user'].email
      
      
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
      revalidatePath('/events')
      revalidatePath("/")
      await client.close();
      redirect('/')
  }
    }
  



    export default async function Events() {
      const session = await getServerSession(authOptions)
      if (!session) {
        return <SignIn /> }
  
    
    return (
      <main>
            
            <p className={`text-bold add-event-title`}>
              Add Event
            </p>
          <form action={addEvent} id='add-event-form' className='add-event-form grid-1'>
          <label htmlFor="eventName" className='text-bold text-in-box'>Title of Event:</label> 
          <input type="text" name="eventName" id="eventName" className='input-box'/>
          <label htmlFor="description" className='text-bold text-in-box'>Description:</label>
          <input type="text" name='description' id='description' className='input-box'/>
          <label htmlFor="length" className='text-bold text-in-box'>Length (in minutes):</label>
          <input type="number" name='length' id='length' className='input-box'/>
          <button type='submit' className='create-event-btn text-bold '>Create Event</button>
          </form>
      </main>
    )
  }

