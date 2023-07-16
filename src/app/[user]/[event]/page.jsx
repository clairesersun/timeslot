import { Suspense } from "react";
import Calendar from "../../components/Calendar.jsx";
import moment from "moment";

export const metadata = {
  title: "Schedule",
  description: "Scheduling page for the scheduling app",
  keywords: "scheduling app",
};

export default async function ScheduleTime({ params }) {
  //i need this page not to load until the user is logged in

  //instead of requiring a user to be logged in, anyone can see this page. the trick is pulling the name from the url and making sure it matches the name in the database
  const user = params.user;
  // console.log(user);
  user.toString();
  if (!user.length > 11) {
    return <div>User not found</div>;
  }
  // console.log(user);
  // const userId = new ObjectId(user);
  // if (!userId) {
  //   return <div>User not found</div>;
  // }

  const event = params.event;
  if (!event) {
    return;
  }

  const dbName = "users";
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
  let refreshtoken = accountInfo.refresh_token;
  let expires_at = accountInfo.expires_at;
  let providerAccountId = accountInfo.providerAccountId;
  let idToken = accountInfo.id_token;
  if (expires_at * 1000 < Date.now()) {
    // If the access token has expired, try to refresh it
    try {
      // https://accounts.google.com/.well-known/openid-configuration
      // We need the `token_endpoint`.
      const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          grant_type: "refresh_token",
          refresh_token: refreshtoken,
        }),
        method: "POST",
      });

      const tokens = await tokenResponse.json();

      if (!tokenResponse.ok) throw tokens;

      await collection.updateOne(
        {
          providerAccountId: providerAccountId,
        },
        {
          $set: {
            access_token: tokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
            refresh_token: tokens.refresh_token ?? refreshtoken,
          },
        }
      );
      console.log("updating access token");
      accessToken = tokens.access_token;
      refreshtoken = tokens.refresh_token ?? refreshtoken;
      expires_at = Math.floor(Date.now() / 1000 + tokens.expires_in);
    } catch (error) {
      console.error("Error refreshing access token", error);
      // The error property will be used client-side to handle the refresh token error
      throw (error = "RefreshAccessTokenError");
    }
  }
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
  //get bookings
  let bookings = businessInfo.booked;
  // console.log(bookings);
  let notBooked = bookings.shift();
  let bookingTimes = bookings.map((bookingTimes) => (
    <p className={`m-0 max-w-[30ch] text-sm opacity-50`} key={bookingTimes}>
      {moment(bookingTimes).format("MMMM Do YYYY, h:mm a")}
    </p>
  ));
  bookings.unshift(notBooked);
  collection = db.collection("eventInfo");
  let currentEventInfo = await collection.findOne({
    $and: [{ googleEmail: googleEmail }, { eventnameParams: event }],
  }); //this is how to get the event name

  //get business name
  let businessName = businessInfo.businessName;

  //get description
  let description = currentEventInfo.description;

  //get event name
  let eventName = currentEventInfo.eventName;

  //get length
  let length = currentEventInfo.length;

  if (!businessInfo.availability) {
    console.log("availability doesn't exists");
    //get availability
    let mondaystartValue = "";
    let mondayendValue = "";
    let tuesdaystartValue = "";
    let tuesdayendValue = "";
    let wednesdaystartValue = "";
    let wednesdayendValue = "";
    let thursdaystartValue = "";
    let thursdayendValue = "";
    let fridaystartValue = "";
    let fridayendValue = "";
    let saturdaystartValue = "";
    let saturdayendValue = "";
    let sundaystartValue = "";
    let sundayendValue = "";
    let additionaldaysValue = "";
    let additionaldaysValueEnd = "";

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
            <Suspense fallback={<div>Loading...</div>}>
              <h2 className={`mb-3 text-2xl font-semibold`}>{businessName}</h2>
              <h2 className={`mb-3 text-2xl font-semibold`}>{description}</h2>
              <h2 className={`mb-3 text-2xl font-semibold`}>
                {length} minutes
              </h2>
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <h2 className={`mb-3 text-2xl font-semibold`}>
                {eventName} Availability in {length} minute slots
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                in {length} minute slots{" "}
              </p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                No current availability
              </p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                {" "}
                Contact {email} for more information
              </p>
            </Suspense>
          </div>
        </div>
      </main>
    );
  }

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
  let additionaldaysValueEnd = businessInfo.availability.additionalDaysEnd;

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
            <h2 className={`mb-3 text-2xl font-semibold`}>
              {eventName} Availability in {length} minute slots
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              in {length} minute slots{" "}
            </p>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Currently booked appointments are listed below
            </p>
            <Suspense fallback={<div>Loading...</div>}>
              <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
                {bookingTimes}
              </div>
            </Suspense>
            {/* create a list of booked times */}
            <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-7 lg:text-left">
              {/* do not show a given day if there is nothing in the database */}
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
              {fridayendValue ? (
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  Friday: {fridaystartValue} - {fridayendValue}
                </p>
              ) : null}
              {saturdayendValue ? (
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  Saturday: {saturdaystartValue} - {saturdayendValue}
                </p>
              ) : null}
              {sundaystartValue ? (
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  Sunday: {sundaystartValue} - {sundayendValue}
                </p>
              ) : null}

              {additionaldaysValue !== "" ? (
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  Additional Available Day/Times:{" "}
                  {moment(additionaldaysValue).format("MMMM Do YYYY, h:mm a")}
                </p>
              ) : null}
            </div>
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Calendar
              user={user}
              description={description}
              length={length}
              event={event}
              eventName={eventName}
              googleEmail={googleEmail}
              email={email}
              bookings={bookings}
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
              additionaldaysValueEnd={additionaldaysValueEnd}
              accessToken={accessToken}
              idToken={idToken}
              refreshtoken={refreshtoken}
              expires_at={expires_at}
            />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
