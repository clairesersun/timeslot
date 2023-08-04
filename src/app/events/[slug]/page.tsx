import SignIn from '../../components/signin';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { revalidatePath } from 'next/cache';
import { DeleteEvent } from '../../components/deleteData';
// import { redirect } from 'next/dist/server/api-utils';
// import { useRouter } from 'next/navigation'

export const metadata = {
  title: 'Events',
  description: 'Event page for the scheduling app',
  keywords: 'scheduling app'
}

async function UpdateEvent(data: FormData) {
  'use server'

    const { MongoClient } = require("mongodb");
    const client = new MongoClient(process.env.MONGODB_URI);
    const session = await getServerSession(authOptions)
    const googleEmail = session['user'].email
    try {
      const eventName = data.get('eventName')?.valueOf()
      if (typeof eventName !== 'string' || eventName.length === 0) {
        throw new Error ('Name is required')
      }

      const eventnameParams = eventName.toString().toLowerCase().replace(/\s/g, '')
      // console.log(eventnameParams)
      
      const previousnameSlug = data.get('previousnameSlug')?.valueOf()

      const description = data.get('description')
      if (typeof description !== 'string' || description.length === 0) {
        throw new Error ('Description is required')
      }
      const length = data.get('length')
      if (typeof length !== 'string' || length.length === 0) {
        throw new Error ('Length is required')
      }
      
      // const { slug } = params;
      
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
      const updateInfo = await collection.updateOne(
        {$and:
        [{ googleEmail: googleEmail }, 
        {eventnameParams: previousnameSlug}] },
        {$set: {eventName, eventnameParams, description, length}});
      return console.log("updated info in database: ", eventName, eventnameParams, description, length) 
      // also return a pop up that confirms the update and asks if they want to go back to the home page or make more edits

    } catch (error) {
      console.log(error)
    }
    finally {
      revalidatePath('/')
      revalidatePath('/events/[slug]')
      revalidatePath("/[user]/[event]")
      await client.close();
  }
    }
  
    


    export default async function Events({params}) {
      const { slug } = params;

        const dbName = "users";
      const session = await getServerSession(authOptions)
      console.log(session['user'].email)
      if (!session) {
        return <SignIn /> }
      const { MongoClient } = require("mongodb");
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      console.log("Connected correctly to server");
      const db = client.db(dbName);
      //this allows me to take the userId to find the access_token from sessions later down the road
      let collection = db.collection("savedInfo");
      // Insert a single document, wait for promise so we can read it back
      const googleEmail = session['user'].email
      const currentUserInfo = await collection.findOne({ googleEmail:  googleEmail });
      // console.log(currentUserInfo)
      const visibleName = currentUserInfo.name
        collection = db.collection("eventInfo");
      // Insert a single document, wait for promise so we can read it back
      const eventInfo = await collection.findOne({$and:
        [{ googleEmail: googleEmail }, 
        {eventnameParams: slug}] });
        //throw an error if the event is not found based on the slug
        if (!eventInfo) { throw new Error('Event not found') }
        
        
        
        
        
          
        // console.log(eventInfo)
        const eventName = eventInfo.eventName
        const description = eventInfo.description
        const length = eventInfo.length
    return (
      <main>
  
       
          
        
            <h1 className={`text-bold update-event-title`}>
              Update Event
            </h1>
            <div className='update-event-container grid-1'>
            <h2 className={`text-bold text-in-box `}>
              Title of Event:
            </h2>
            <p className={`text-regular text-in-box no-margin`}>
            {eventName}</p>
            <h2 className={`text-bold text-in-box`}>
              Description: </h2>
            <p className={`text-regular text-in-box no-margin`}>
              {description}
            </p>
            <h2 className={`text-bold text-in-box`}>
              Length
              </h2>
            <p className={`text-regular text-in-box no-margin`}>
              {length} minutes
            </p>
            </div>
            <div className='divider-light'></div>
          <form action={UpdateEvent} id='update-event-form' className="update-event-form grid-1">
          <label htmlFor="eventName"  className='text-bold text-in-box'>Event Name:</label> 
          <input type="text" name="eventName" id="eventName" className='input-box'/>
          <input type="hidden" name="previousnameSlug" id="previousnameSlug" value={slug} />
          <label htmlFor="description" className='text-bold text-in-box'>Description:</label>
          <input type="text" name='description' id='description' className='input-box'/>
          <label htmlFor="length" className='text-bold text-in-box'>Length:</label>
          <input type="text" name='length' id='length' className='input-box'/>
          <button type='submit' className='save-event-btn text-bold'>Save Changes</button>
          </form>
          <DeleteEvent slug={slug}/>
        
      </main>
    )
  }

