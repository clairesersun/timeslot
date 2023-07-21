import SignIn from "../components/signin";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Suspense } from "react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import moment from "moment";

export const metadata = {
  title: "Profile",
  description: "Profile page for the scheduling app",
  keywords: "scheduling app",
};

async function addAvailability(data) {
  "use server";
  const { MongoClient } = require("mongodb");
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    const mondayStart = data.get("mondayStart")?.valueOf();
    const mondayEnd = data.get("mondayEnd")?.valueOf();
    const tuesdayStart = data.get("tuesdayStart")?.valueOf();
    const tuesdayEnd = data.get("tuesdayEnd")?.valueOf();
    const wednesdayStart = data.get("wednesdayStart")?.valueOf();
    const wednesdayEnd = data.get("wednesdayEnd")?.valueOf();
    const thursdayStart = data.get("thursdayStart")?.valueOf();
    const thursdayEnd = data.get("thursdayEnd")?.valueOf();
    const fridayStart = data.get("fridayStart")?.valueOf();
    const fridayEnd = data.get("fridayEnd")?.valueOf();
    const saturdayStart = data.get("saturdayStart")?.valueOf();
    const saturdayEnd = data.get("saturdayEnd")?.valueOf();
    const sundayStart = data.get("sundayStart")?.valueOf();
    const sundayEnd = data.get("sundayEnd")?.valueOf();
    const additionalDays = data.get("additionalDays")?.valueOf();
    const additionalDaysEnd = data.get("additionalDaysEnd")?.valueOf();
    let booked

    const session = await getServerSession(authOptions);
    const googleEmail = session.user.email;

    const dbName = "users";
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    let collection = db.collection("users");
    const users = await collection.findOne({ email: googleEmail });
    // console.log(users._id)
    const userId = users._id;
    //this allows me to take the userId to find the access_token from sessions later down the road
    collection = db.collection("savedInfo");
    // Insert a single document, wait for promise so we can read it back
    const myDoc = await collection.findOne({ googleEmail: googleEmail });
  
    //check if user already exists in database, if so you will update the info, if not you will add the info to the database
    if (myDoc) {
      booked = ["not booked"]
      if (myDoc.booked){
        booked = myDoc.booked
      }
      // console.log(booked)
      const updateInfo = await collection.updateOne(
        { googleEmail: googleEmail },
        { $set: { availability: { mondayStart, mondayEnd, tuesdayStart, tuesdayEnd, wednesdayStart, wednesdayEnd, thursdayStart, thursdayEnd, fridayStart, fridayEnd, saturdayStart, saturdayEnd, sundayStart, sundayEnd, additionalDays, additionalDaysEnd
         }, booked } }
      );
      return console.log(
        "updated info in database: ",
        mondayStart, mondayEnd, tuesdayStart, tuesdayEnd, wednesdayStart, wednesdayEnd, thursdayStart, thursdayEnd, fridayStart, fridayEnd, saturdayStart, saturdayEnd, sundayStart, sundayEnd, additionalDays, additionalDaysEnd, booked
      );
    }
    booked = ["not booked"]
    const newInfo = await collection.insertOne({
      availability: {  mondayStart, mondayEnd, tuesdayStart, tuesdayEnd, wednesdayStart, wednesdayEnd, thursdayStart, thursdayEnd, fridayStart, fridayEnd, saturdayStart, saturdayEnd, sundayStart, sundayEnd, additionalDays, additionalDaysEnd }, booked,
      googleEmail,
      userId,
    });
    return console.log(
      "added info in database: ",
      mondayStart, mondayEnd, tuesdayStart, tuesdayEnd, wednesdayStart, wednesdayEnd, thursdayStart, thursdayEnd, fridayStart, fridayEnd, saturdayStart, saturdayEnd, sundayStart, sundayEnd, additionalDays, additionalDaysEnd, booked, 
      googleEmail,
      userId
    );

  } catch (error) {
        console.log(error);
      } finally {
        revalidatePath("/availability");
        revalidatePath("/[user]/[event]");
        revalidatePath("/");
        await client.close();
      }
}

export default async function Availability() {
  const dbName = "users";
  const session = await getServerSession(authOptions);
  if (!session) {
    return <SignIn />;
  }
  const { MongoClient } = require("mongodb");
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  console.log("Connected correctly to server");
  const db = client.db(dbName);
  //this allows me to take the userId to find the access_token from sessions later down the road
  let collection = db.collection("savedInfo");
  // Insert a single document, wait for promise so we can read it back
  const currentUserInfo = await collection.findOne({
    googleEmail: session.user.email,
  });
  if (!currentUserInfo) {
    return (
      <>
      <h1>Finish setting up your profile.</h1>
      <Link href="/profile">Click here</Link>
      </>
    )
  }
  // console.log(currentUserInfo);
  let businessName = currentUserInfo.businessName;
  if (currentUserInfo.availability) {
  //get the current values from the database
  let mondaystartValue = currentUserInfo.availability.mondayStart;
  let mondayendValue = currentUserInfo.availability.mondayEnd;
  let tuesdaystartValue = currentUserInfo.availability.tuesdayStart;
  let tuesdayendValue = currentUserInfo.availability.tuesdayEnd;
  let wednesdaystartValue = currentUserInfo.availability.wednesdayStart;
  let wednesdayendValue = currentUserInfo.availability.wednesdayEnd;
  let thursdaystartValue = currentUserInfo.availability.thursdayStart;
  let thursdayendValue = currentUserInfo.availability.thursdayEnd;
  let fridaystartValue = currentUserInfo.availability.fridayStart;
  let fridayendValue = currentUserInfo.availability.fridayEnd;
  let saturdaystartValue = currentUserInfo.availability.saturdayStart;
  let saturdayendValue = currentUserInfo.availability.saturdayEnd;
  let sundaystartValue = currentUserInfo.availability.sundayStart;
  let sundayendValue = currentUserInfo.availability.sundayEnd;
  let additionaldaysValue = currentUserInfo.availability.additionalDays;
  let additionaldaysValueEnd = currentUserInfo.availability.additionalDaysEnd;
// how to say if this doesn't exist, then make the value blank?

  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
          <Suspense fallback={<div>Loading...</div>}>
            <h1 className={`mb-3 text-2xl font-semibold`}>
              {businessName}&apos;s Availability
            </h1>
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Current Availability
            </h2>
            {mondaystartValue ? (
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  Monday: {mondaystartValue} - {mondayendValue}
                </p>
              ) : null}
              {tuesdaystartValue ? (
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  Tuesday: {tuesdaystartValue} - {tuesdayendValue}
                </p>
              ) : null}
              {wednesdaystartValue ? (
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  Wednesday: {wednesdaystartValue} - {wednesdayendValue}
                </p>
              ) : null}
              {thursdaystartValue ? (
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  Thursday: {thursdaystartValue} - {thursdayendValue}
                </p>
              ) : null}
              {fridaystartValue ? (
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  Friday: {fridaystartValue} - {fridayendValue}
                </p>
              ) : null}
              {saturdaystartValue ? (
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  Saturday: {saturdaystartValue} - {saturdayendValue}
                </p>
              ) : null}
              {sundaystartValue ? (
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  Sunday: {sundaystartValue} - {sundayendValue}
                </p>
              ) : null}
              {additionaldaysValue ? (
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  Additional Day Start: {new Date(additionaldaysValue).getHours()}:{(new Date(additionaldaysValue).getMinutes()<10?'0':'') + new Date(additionaldaysValue).getMinutes()} - {additionaldaysValueEnd}
                </p>
              ) : null}
              
          </Suspense>
          <form
            action={addAvailability}
            id="profile-form"
            className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left"
          >
            <label htmlFor="mondayStart">Monday</label>
            <input type="time" name="mondayStart" id="mondayStart"className='text-sky-400'/>
            <p className="lg:text-center"> - </p>
            <input type="time" name="mondayEnd" id="mondayEnd"className='text-sky-400'/>
            <label htmlFor="tuesdayStart">Tuesday</label>
            <input type="time" name="tuesdayStart" id="tuesdayStart" className='text-sky-400'/>
            <p className="lg:text-center"> - </p>
            <input type="time" name="tuesdayEnd" id="tuesdayEnd" className='text-sky-400'/>
            <label htmlFor="wednesdayStart">Wednesday</label>
            <input type="time" name="wednesdayStart" id="wednesdayStart" className='text-sky-400'/>
            <p className="lg:text-center"> - </p>
            <input type="time" name="wednesdayEnd" id="wednesdayEnd"className='text-sky-400'/>
            <label htmlFor="thursdayStart">Thursday</label>
            <input type="time" name="thursdayStart" id="thursdayStart" className='text-sky-400'/>
            <p className="lg:text-center"> - </p>
            <input type="time" name="thursdayEnd" id="thursdayEnd" className='text-sky-400'/>
            <label htmlFor="fridayStart">Friday</label>
            <input type="time" name="fridayStart" id="fridayStart" className='text-sky-400'/>
            <p className="lg:text-center"> - </p>
            <input type="time" name="fridayEnd" id="fridayEnd" className='text-sky-400'/>
            <label htmlFor="saturdayStart">Saturday</label>
            <input type="time" name="saturdayStart" id="saturdayStart" className='text-sky-400'/>
            <p className="lg:text-center"> - </p>
            <input type="time" name="saturdayEnd" id="saturdayEnd"className='text-sky-400'/>
            <label htmlFor="sundayStart">Sunday</label>
            <input type="time" name="sundayStart" id="sundayStart"className='text-sky-400'/>
            <p className="lg:text-center"> - </p>
            <input type="time" name="sundayEnd" id="sundayEnd"className='text-sky-400'/>
            <label htmlFor="additionalDays">Additional Days</label>
            <input type="datetime-local" name="additionalDays" id="additionalDays" className='text-sky-400'/>
            <label htmlFor="additionalDaysEnd">Additional Day End</label>
            <input type="time" name="additionalDaysEnd" id="additionalDaysEnd" className='text-sky-400' placeholder={additionaldaysValueEnd}/>
            {/* I need to figure out how to add multiple */}
            {/* if there is already a value, then add another input */}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </main>
  );
} else {
 
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
          <Suspense fallback={<div>Loading...</div>}>
            <h1 className={`mb-3 text-2xl font-semibold`}>
              {businessName}&apos;s Availability
            </h1>
          </Suspense>
          <form
            action={addAvailability}
            id="profile-form"
            className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left"
          >
            <label htmlFor="mondayStart">Monday</label>
            <input type="time" name="mondayStart" id="mondayStart" className='text-sky-400' placeholder={mondayStart}/>
            {/* set the value value="13:30" by using the current mondayStart */}
            <p className="lg:text-center"> - </p>
            <input type="time" name="mondayEnd" id="mondayEnd" className='text-sky-400' placeholder={mondayEnd}/>
            <label htmlFor="tuesdayStart">Tuesday</label>
            <input type="time" name="tuesdayStart" id="tuesdayStart" className='text-sky-400' placeholder={tuesdayStart}/>
            <p className="lg:text-center"> - </p>
            <input type="time" name="tuesdayEnd" id="tuesdayEnd" className='text-sky-400' placeholder={tuesdayEnd}/>
            <label htmlFor="wednesdayStart">Wednesday</label>
            <input type="time" name="wednesdayStart" id="wednesdayStart" className='text-sky-400' placeholder={wednesdayStart}/>
            <p className="lg:text-center"> - </p>
            <input type="time" name="wednesdayEnd" id="wednesdayEnd" className='text-sky-400' placeholder={wednesdayEnd}/>
            <label htmlFor="thursdayStart">Thursday</label>
            <input type="time" name="thursdayStart" id="thursdayStart" className='text-sky-400' placeholder={thursdayStart}/>
            <p className="lg:text-center"> - </p>
            <input type="time" name="thursdayEnd" id="thursdayEnd" className='text-sky-400' placeholder={thursdayEnd}/>
            <label htmlFor="fridayStart">Friday</label>
            <input type="time" name="fridayStart" id="fridayStart" className='text-sky-400' placeholder={fridayStart}/>
            <p className="lg:text-center"> - </p>
            <input type="time" name="fridayEnd" id="fridayEnd" className='text-sky-400' placeholder={fridayEnd}/>
            <label htmlFor="saturdayStart">Saturday</label>
            <input type="time" name="saturdayStart" id="saturdayStart" className='text-sky-400' placeholder={saturdayStart}/>
            <p className="lg:text-center"> - </p>
            <input type="time" name="saturdayEnd" id="saturdayEnd"className='text-sky-400' placeholder={saturdayEnd}/>
            <label htmlFor="sundayStart">Sunday</label>
            <input type="time" name="sundayStart" id="sundayStart" className='text-sky-400' placeholder={sundayStart}/>
            <p className="lg:text-center"> - </p>
            <input type="time" name="sundayEnd" id="sundayEnd" className='text-sky-400' placeholder={sundayEnd}/>
            <label htmlFor="additionalDays">Additional Days</label>
            <input type="datetime-local" name="additionalDays" id="additionalDays" className='text-sky-400' placeholder={moment(additionalDays).format()}/>
            <label htmlFor="additionalDaysEnd">Additional Day End</label>
            <input type="time" name="additionalDaysEnd" id="additionalDaysEnd" className='text-sky-400'/>
            {/* I need to figure out how to add multiple */}
            {/* if there is already a value, then add another input */}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </main>
  );
}
}