// import { ObjectId } from "mongodb";
import { Suspense } from "react";
// import Link from "next/link";
import Calendar from "../../components/Calendar.jsx";

import { getToken } from "next-auth/jwt";

export const metadata = {
  title: "Schedule",
  description: "Scheduling page for the scheduling app",
  keywords: "scheduling app",
};

export default async function ScheduleTime({ params }) {
  //i need this page not to load until the user is logged in

  //instead of requiring a user to be logged in, anyone can see this page. the trick is pulling the name from the url and making sure it matches the name in the database
  const user = params.user;
  if (!user) {
    return <div>User not found</div>;
  }
  user.toString();
  const event = params.event;

  // console.log(session, status)

  // console.log(user);
  // console.log(event);
  const dbName = "users";
  // const session = await getServerSession(authOptions);
  const { MongoClient, ObjectId } = require("mongodb");
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  console.log("Connected correctly to server");
  const db = client.db(dbName);
  //this allows me to take the userId to find the access_token from sessions later down the road
  let collection = db.collection("accounts");
  // Insert a single document, wait for promise so we can read it back
  let accountInfo = await collection.findOne({
    userId: new ObjectId(user),
  });
  let accessToken = accountInfo.access_token;
  let idToken = accountInfo.id_token;
  // console.log(accessToken);
  collection = db.collection("savedInfo");
  // Insert a single document, wait for promise so we can read it back
  let businessInfo = await collection.findOne({
    userId: new ObjectId(user),
  });
  if (!businessInfo) {
    return <div>Business not found</div>;
  }
  const googleEmail = businessInfo.googleEmail;
  const email = businessInfo.email;
  // console.log(googleEmail);
  collection = db.collection("eventInfo");
  let currentEventInfo = await collection.findOne({
    $and: [{ googleEmail: googleEmail }, { eventnameParams: event }],
  }); //this is how to get the event name
  // console.log(currentEventInfo);

  //get business name
  let businessName = businessInfo.businessName;

  //get description
  let description = currentEventInfo.description;

  //get event name
  let eventName = currentEventInfo.eventName;

  //get length
  let length = currentEventInfo.length;

  //get availability
  let mondaystartValue = businessInfo.availability.mondayStart;
  let mondayendValue = businessInfo.availability.mondayEnd;
  let tuesdaystartValue = businessInfo.availability.tuesdayStart;
  let tuesdayendValue = businessInfo.availability.tuesdayEnd;
  let wednesdaystartValue = businessInfo.availability.wednesdayStart;
  let wednesdayendValue = businessInfo.availability.wednesdayEnd;
  let thursdaystartValue = businessInfo.availability.thursdayStart;
  let thursdayendValue = businessInfo.availability.thursdayEnd;
  let fridaystartValue = businessInfo.availability.fridayStart;
  let fridayendValue = businessInfo.availability.fridayEnd;
  let saturdaystartValue = businessInfo.availability.saturdayStart;
  let saturdayendValue = businessInfo.availability.saturdayEnd;
  let sundaystartValue = businessInfo.availability.sundayStart;
  let sundayendValue = businessInfo.availability.sundayEnd;
  let additionaldaysValue = businessInfo.availability.additionalDays;

  // how to say if this doesn't exist, then make the value blank?

  // if (!session) {
  //   return <SignIn />;
  // }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
          <Suspense fallback={<div>Loading...</div>}>
            <h2 className={`mb-3 text-2xl font-semibold`}>{businessName}</h2>
            <h2 className={`mb-3 text-2xl font-semibold`}>{description}</h2>
            <h2 className={`mb-3 text-2xl font-semibold`}>{length} minutes</h2>
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Calendar
              user={user}
              description={description}
              length={length}
              eventName={eventName}
              googleEmail={googleEmail}
              email={email}
              mondaystartValue={mondaystartValue}
              mondayendValue={mondayendValue}
              tuesdaystartValue={tuesdaystartValue}
              tuesdayendValue={tuesdayendValue}
              wednesdaystartValue={wednesdaystartValue}
              wednesdayendValue={wednesdayendValue}
              thursdaystartValue={thursdaystartValue}
              thursdayendValue={thursdayendValue}
              fridaystartValue={fridaystartValue}
              fridayendValue={fridayendValue}
              saturdaystartValue={saturdaystartValue}
              saturdayendValue={saturdayendValue}
              sundaystartValue={sundaystartValue}
              sundayendValue={sundayendValue}
              additionaldaysValue={additionaldaysValue}
              accessToken={accessToken}
              idToken={idToken}
            />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
