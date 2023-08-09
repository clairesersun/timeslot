import SignIn from "../components/signin";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Suspense } from "react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import moment from "moment";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Availability",
  description: "Availability page for the scheduling app",
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
        return redirect("/availability");
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
      <h1 className="text-bold">Finish setting up your profile.</h1>
      <Link href="/profile" className="text-bold">Click here</Link>
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
    <main className="availability-page availability-main-container">
      <div className="availability-container">

            <h1 className={`text-bold add-margin availability-current`}>
             Availability
            </h1>
          <Suspense fallback={<div>Loading...</div>}>
<div className="availability-current grid-1 available-container">

          
            {mondaystartValue ? (
              <>
                <div className={`grid-3 unjustify`}>
              <p className={`text-bold add-margin`}>
                  Monday
                </p>
                <div></div>
                <div></div>
                <p className={`text-regular`}>
                {mondaystartValue}
                </p>
                <div className={`dash justify`}> 
                </div>
                <p className={`text-regular`}>{mondayendValue}
                </p>
                </div>
              </>
              ) : null}
              {tuesdaystartValue ? (
                <>
                <div className={`grid-3 unjustify`}>
                <p className={`text-bold add-margin`}>
                  Tuesday
                </p>
                <div></div>
                <div></div>
                <p className={`text-regular`}>
              {tuesdaystartValue}
              </p>
              <div className={`dash justify`}> 
                </div>
            <p className={`text-regular`}>{tuesdayendValue}
          </p>
          </div>
          </>
              ) : null}
              {wednesdaystartValue ? (
                <div className={`grid-3 unjustify`}>
                <p className={`text-bold add-margin`}>
                  Wednesday
                </p>
                <div></div>
                <div></div>
                <p className={`text-regular`}>{wednesdaystartValue}
                </p>
                <div className={`dash justify`}> 
                </div>
                <p className={`text-regular`}> {wednesdayendValue}
                </p>
                </div>
              ) : null}
              {thursdaystartValue ? (
                <>
                <div className={`grid-3 unjustify`}>
                  
                <p className={`text-bold add-margin`}>
                  Thursday
                </p>
                <div></div>
                <div></div>
                <p className={`text-regular`}>{thursdaystartValue}
                </p>
                <div className={`dash justify`}> 
                </div>
                <p className={`text-regular`}>{thursdayendValue}
                </p>
                </div>
                </>
              ) : null}
              {fridaystartValue ? (
                <>
                <div className={`grid-3 unjustify`}>
                <p className={`text-bold add-margin`}>
                  Friday
                </p>
                <div></div>
                <div></div>
                <p className={`text-regular`}>
                 {fridaystartValue}
                </p>
                <div className={`dash justify`}> 
                </div>
                <p className={`text-regular`}>{fridayendValue}
                </p>
                </div>
                </>
              ) : null}
              {saturdaystartValue ? (
                <>
                <div className={`grid-3 unjustify`}>

                <p className={`text-bold add-margin`}>
                  Saturday
                </p>
                <div></div>
                <div></div>
                <p className={`text-regular`}>{saturdaystartValue}
                </p>
                <div className={`dash justify`}> 
                </div>
                <p className={`text-regular`}>
                  {saturdayendValue}
                </p>
                </div>
                </>
              ) : null}
              {sundaystartValue ? (
                <>
                <div className={`grid-3 unjustify`}>
                <p className={`text-bold add-margin`}>
                  Sunday
                </p>
                <div></div>
                <div></div>
                <p className={`text-regular`}>
               {sundaystartValue}
                </p>
                <div className={`dash justify`}> 
                </div>
                <p className={`text-regular`}>{sundayendValue}
                </p>
                </div>
                </>
              ) : null}
              {additionaldaysValue ? (
                <>
                <div className={`grid-3 unjustify`}>
                <p className={`text-bold add-margin`}>
                  Additional Day
                </p>
                <div></div>
                <p className={`text-regular`}>
                  {moment(additionaldaysValue).format("MMMM Do YYYY")} </p>
                <p className={`text-regular`}>
                  {new Date(additionaldaysValue).getHours()}:{(new Date(additionaldaysValue).getMinutes()<10?'0':'') + new Date(additionaldaysValue).getMinutes()}
                </p>
                <div className={`dash justify`}> 
                </div>
                <p className={`text-regular`}>
                 {additionaldaysValueEnd}
                </p>
                </div>
              </>
              ) : null}
              
              </div>
          </Suspense>
          </div>
          <div className="avail-spacer"></div>
          <form
            action={addAvailability}
            id="profile-form"
            className="availability-form"
          >
            <div className="grid-3">

            <label htmlFor="mondayStart" className={`text-bold`}>Monday</label>
            <div></div>
            <div></div>
            <input type="time" name="mondayStart" id="mondayStart"className='text-regular availability-input-box'/>
            <div className="dash"></div>
            <input type="time" name="mondayEnd" id="mondayEnd"className='text-regular availability-input-box'/>
            <label htmlFor="tuesdayStart" className={`text-bold`}>Tuesday</label>
            <div></div>
            <div></div>
            <input type="time" name="tuesdayStart" id="tuesdayStart" className='text-regular availability-input-box'/>
            <div className="dash"></div>
            <input type="time" name="tuesdayEnd" id="tuesdayEnd" className='text-regular availability-input-box'/>
            <label htmlFor="wednesdayStart" className={`text-bold`}>Wednesday</label>
            <div></div>
            <div></div>
            <input type="time" name="wednesdayStart" id="wednesdayStart" className='text-regular availability-input-box'/>
            <div className="dash"></div>
            <input type="time" name="wednesdayEnd" id="wednesdayEnd"className='text-regular availability-input-box'/>
            <label htmlFor="thursdayStart" className={`text-bold`}>Thursday</label>
            <div></div>
            <div></div>
            <input type="time" name="thursdayStart" id="thursdayStart" className='text-regular availability-input-box'/>
            <div className="dash"></div>
            <input type="time" name="thursdayEnd" id="thursdayEnd" className='text-regular availability-input-box'/>
            <label htmlFor="fridayStart" className={`text-bold`}>Friday</label>
            <div></div>
            <div></div>
            <input type="time" name="fridayStart" id="fridayStart" className='text-regular availability-input-box'/>
            <div className="dash"></div>
            <input type="time" name="fridayEnd" id="fridayEnd" className='text-regular availability-input-box'/>
            <label htmlFor="saturdayStart" className={`text-bold`}>Saturday</label>
            <div></div>
            <div></div>
            <input type="time" name="saturdayStart" id="saturdayStart" className='text-regular availability-input-box'/>
            <div className="dash"></div>
            <input type="time" name="saturdayEnd" id="saturdayEnd"className='text-regular availability-input-box'/>
            <label htmlFor="sundayStart" className={`text-bold`}>Sunday</label>
            <div></div>
            <div></div>
            <input type="time" name="sundayStart" id="sundayStart"className='text-regular availability-input-box'/>
            <div className="dash"></div>
            <input type="time" name="sundayEnd" id="sundayEnd"className='text-regular availability-input-box'/>
            <label htmlFor="additionalDays" className={`text-bold`}>Additional Day</label>
            <div></div>
            <div></div>
            <input type="datetime-local" name="additionalDays" id="additionalDays" className='text-regular availability-input-box'/>
            <div className="dash"></div>
            <input type="time" name="additionalDaysEnd" id="additionalDaysEnd" className='text-regular availability-input-box' placeholder={additionaldaysValueEnd}/>
            <div></div>
            <div></div>
            {/* I need to figure out how to add multiple */}
            {/* if there is already a value, then add another input */}
  </div>
  <div className="grid-1 justify">

            <button type="submit" className="text-bold save-availability-btn">Save Times</button>
  </div>
          </form>
          <div className="bottom-of-page"></div>
       
    </main>
  );
} else {
 
  
  return (
    <main className="availability-page">
      <div className="availability-container">
            <h1 className={`text-bold add-margin availability-current`}>Availability
            </h1>
            </div>
          <form
            action={addAvailability}
            id="profile-form"
            className="availability-form"
          >
            <div className="grid-3">
            <label htmlFor="mondayStart" className={`text-bold`}>Monday</label>
            <div></div>
            <div></div>
            <input type="time" name="mondayStart" id="mondayStart"className='text-regular availability-input-box'/>
            <div className="dash"></div>
            <input type="time" name="mondayEnd" id="mondayEnd"className='text-regular availability-input-box'/>
            <label htmlFor="tuesdayStart" className={`text-bold`}>Tuesday</label>
            <div></div>
            <div></div>
            <input type="time" name="tuesdayStart" id="tuesdayStart" className='text-regular availability-input-box'/>
            <div className="dash"></div>
            <input type="time" name="tuesdayEnd" id="tuesdayEnd" className='text-regular availability-input-box'/>
            <label htmlFor="wednesdayStart" className={`text-bold`}>Wednesday</label>
            <div></div>
            <div></div>
            <input type="time" name="wednesdayStart" id="wednesdayStart" className='text-regular availability-input-box'/>
            <div className="dash"></div>
            <input type="time" name="wednesdayEnd" id="wednesdayEnd"className='text-regular availability-input-box'/>
            <label htmlFor="thursdayStart" className={`text-bold`}>Thursday</label>
            <div></div>
            <div></div>
            <input type="time" name="thursdayStart" id="thursdayStart" className='text-regular availability-input-box'/>
            <div className="dash"></div>
            <input type="time" name="thursdayEnd" id="thursdayEnd" className='text-regular availability-input-box'/>
            <label htmlFor="fridayStart" className={`text-bold`}>Friday</label>
            <div></div>
            <div></div>
            <input type="time" name="fridayStart" id="fridayStart" className='text-regular availability-input-box'/>
            <div className="dash"></div>
            <input type="time" name="fridayEnd" id="fridayEnd" className='text-regular availability-input-box'/>
            <label htmlFor="saturdayStart" className={`text-bold`}>Saturday</label>
            <div></div>
            <div></div>
            <input type="time" name="saturdayStart" id="saturdayStart" className='text-regular availability-input-box'/>
            <div className="dash"></div>
            <input type="time" name="saturdayEnd" id="saturdayEnd"className='text-regular availability-input-box'/>
            <label htmlFor="sundayStart" className={`text-bold`}>Sunday</label>
            <div></div>
            <div></div>
            <input type="time" name="sundayStart" id="sundayStart"className='text-regular availability-input-box'/>
            <div className="dash"></div>
            <input type="time" name="sundayEnd" id="sundayEnd"className='text-regular availability-input-box'/>
            <label htmlFor="additionalDays" className={`text-bold`}>Additional Day</label>
            <div></div>
            <div></div>
            <input type="datetime-local" name="additionalDays" id="additionalDays" className='text-regular availability-input-box'/>
            <div className="dash"></div>
            <input type="time" name="additionalDaysEnd" id="additionalDaysEnd" className='text-regular availability-input-box'/>
            <div></div>
            <div></div>
            {/* I need to figure out how to add multiple */}
            {/* if there is already a value, then add another input */}
  </div>
  <div className="grid-1 justify">

            <button type="submit" className="text-bold save-availability-btn">Save Times</button>
  </div>
          </form>
          <div className="bottom-of-page"></div>
    </main>
  );
}
}