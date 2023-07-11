import SignIn from '../../components/signin';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';
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
      
      const session = await getServerSession(authOptions)
      const googleEmail = session.user.email
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
      await client.close();
  }
    }
  
    async function DeleteEvent(data: FormData) {
      'use server'
  
      const { MongoClient } = require("mongodb");
      const client = new MongoClient(process.env.MONGODB_URI);
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
        
        const session = await getServerSession(authOptions)
        const googleEmail = session.user.email
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
        const deleteInfo = await collection.deleteOne(
          {$and:
          [{ googleEmail: googleEmail }, 
          {eventnameParams: previousnameSlug}, 
          {eventName: eventName},
          {description: description},
          {length: length}
        ] } );
        return console.log("deleted info from database") 
        // also return a pop up that confirms the update and asks if they want to go back to the home page or make more edits
  
      } catch (error) {
        console.log(error)
      }
      finally {
        await client.close();
    }
      }


    export default async function Events({params}) {
      const { slug } = params;

        const dbName = "users";
      const session = await getServerSession(authOptions)
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
      const googleEmail = session.user.email
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
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
  
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          
        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
            
            <h1 className={`mb-3 text-2xl font-semibold`}>
              Update {visibleName}&apos;s Event:
            </h1>
            <h2 className={`mb-3 text-2xl font-semibold`}>
              {eventName}
            </h2>
          <form action={UpdateEvent} id='update-event-form' className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
          <label htmlFor="eventName" >Event Name:</label> 
          <input type="text" name="eventName" id="eventName" />
          <input type="hidden" name="previousnameSlug" id="previousnameSlug" value={slug} />
          <label htmlFor="description">Description:</label>
          <input type="text" name='description' id='description' />
          <label htmlFor="length">Length:</label>
          <input type="text" name='length' id='length' />
          <button type='submit'>Submit</button>
          </form>
          <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
          <form action={DeleteEvent} id='delete-event-form' className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
          <input type="hidden" name="eventName" id="eventName" value={eventName} />
          <input type="hidden" name="previousnameSlug" id="previousnameSlug" value={slug} />
          <input type="hidden" name="description" id="description" value={eventInfo.description} />
          <input type="hidden" name="length" id="length" value={eventInfo.length} />
          <button type='submit'>Delete</button>
          </form>
          </div>
          {/* figure out how to do a pop up delete btn */}
          </div>
        </div>
      </main>
    )
  }

