import SignIn from "./components/signin";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { Suspense } from "react";
import Link from 'next/link';

export const metadata = {
  title: "Home",
  description: "Home page for the scheduling app",
  keywords: "scheduling app",
};

export default async function Home() {
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
  collection = db.collection("eventInfo");
  // Insert a single document, wait for promise so we can read it back
  const eventInfo = await collection.find({
    googleEmail: session.user.email,
  });
  // const eventInfoArray = eventInfo.forEach(printjson)
  const eventInfoArray = await eventInfo.toArray();
  // console.log(eventInfoArray);
  const events = eventInfoArray.map((event) => (
    <div key={event._id} className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
      <div>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{event.eventName}</p>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{event.eventDescription}</p>
      <Link href={"/" + currentUserInfo.userId.toString() + "/" + event.eventnameParams} className={`m-0 max-w-[30ch] text-sm opacity-50`} >View scheduling link to send to clients</Link>
      </div>
      <Link href={"/events/" + event.eventnameParams} className={`m-0 max-w-[30ch] text-sm opacity-50`} >Edit event.</Link>
      </div>
      )
    )

  
  // console.log(events);

  if (!currentUserInfo) {
    return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    
    <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
      
    <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
      
        <h1 className={`mb-3 text-2xl font-semibold`}>
          Finish Creating Your Profile
  
        </h1>
        <Link href="/profile" className={`mb-3 text-2xl font-semibold`} > Click Here</Link>
      </div>
    </div>
  </main>)
  }
  
  
  if (currentUserInfo && currentUserInfo.design && currentUserInfo.availability && eventInfo) {
    // console.log(currentUserInfo);
    let businessName = currentUserInfo.businessName;
    
    
    
    
    //get design 
    let colorOne = currentUserInfo.design.colorOne;
    let colorTwo = currentUserInfo.design.colorTwo;
    let colorFour = currentUserInfo.design.colorFour;
    let colorThree = currentUserInfo.design.colorThree;
    
  //get availability
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

// how to say if this doesn't exist, then make the value blank?

  
  return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
    
          <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
            
          <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
            
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Welcome back, {session.user.name} with {businessName}!
                
              </h2>
              <Link href="/profile" className={`mb-3 text-2xl font-semibold`} > Profile</Link>
              <p className={`mb-3 text-2xl font-semibold`}>
                Events
              </p>
              <Suspense fallback={<div>Loading...</div>}>
              {events}
              </Suspense>
              <Link href="/events " className={`m-0 max-w-[30ch] text-sm opacity-50`} > + </Link>
              <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
              <p className={`mb-3 text-2xl font-semibold`}>
                Availability
              </p>
              <Link href="/availability" className={`m-0 max-w-[30ch] text-sm opacity-50`} > Edit </Link>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
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
                  Additional Days: {additionaldaysValue}
                </p>
              ) : null}
                  <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Additional Days: {additionaldaysValue}</p>
                </div>
              </Suspense>
              <p className={`mb-3 text-2xl font-semibold`}>
                Design
              </p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{colorOne}</p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{colorTwo}</p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{colorThree}</p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{colorFour}</p>
              <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
              {/* a view of the design */}
              <Link href="/design" className={`m-0 max-w-[30ch] text-sm opacity-50`} > Edit </Link>
              </div>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                By Claire Sersun
              </p>
            
    
            </div>
          </div>
        </main>
      )
  }

  if (currentUserInfo && currentUserInfo.design && currentUserInfo.availability) {
    // console.log(currentUserInfo);
  let businessName = currentUserInfo.businessName;

  


  //get design 
  let colorOne = currentUserInfo.design.colorOne;
  let colorTwo = currentUserInfo.design.colorTwo;
  let colorFour = currentUserInfo.design.colorFour;
  let colorThree = currentUserInfo.design.colorThree;

  //get availability
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

// how to say if this doesn't exist, then make the value blank?

  
  return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
    
          <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
            
          <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
            
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Welcome back, {session.user.name} with {businessName}!
                
              </h2>
              <Link href="/profile" className={`mb-3 text-2xl font-semibold`} > Profile</Link>
              <p className={`mb-3 text-2xl font-semibold`}>
                Events
              </p>
              <Suspense fallback={<div>Loading...</div>}>
              </Suspense>
              <Link href="/events " className={`m-0 max-w-[30ch] text-sm opacity-50`} > + </Link>
              <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
              <p className={`mb-3 text-2xl font-semibold`}>
                Availability
              </p>
              <Link href="/availability" className={`m-0 max-w-[30ch] text-sm opacity-50`} > Edit </Link>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
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
                  Additional Days: {additionaldaysValue}
                </p>
              ) : null}
                </div>
              </Suspense>
              <p className={`mb-3 text-2xl font-semibold`}>
                Design
              </p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{colorOne}</p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{colorTwo}</p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{colorThree}</p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{colorFour}</p>
              <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
              {/* a view of the design */}
              <Link href="/design" className={`m-0 max-w-[30ch] text-sm opacity-50`} > Edit </Link>
              </div>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                By Claire Sersun
              </p>
            
    
            </div>
          </div>
        </main>
      )
  }

  if (currentUserInfo && currentUserInfo.availability && eventInfo) {
    // console.log(currentUserInfo);
  let businessName = currentUserInfo.businessName;

  //get availability
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

// how to say if this doesn't exist, then make the value blank?

  
  return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
    
          <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
            
          <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
            
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Welcome back, {session.user.name} with {businessName}!
                
              </h2>
              <Link href="/profile" className={`mb-3 text-2xl font-semibold`} > Profile</Link>
              <p className={`mb-3 text-2xl font-semibold`}>
                Events
              </p>
              <Suspense fallback={<div>Loading...</div>}>
              {events}
              </Suspense>
              <Link href="/events " className={`m-0 max-w-[30ch] text-sm opacity-50`} > + </Link>
              <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
              <p className={`mb-3 text-2xl font-semibold`}>
                Availability
              </p>
              <Link href="/availability" className={`m-0 max-w-[30ch] text-sm opacity-50`} > Edit </Link>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
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
                  Additional Days: {additionaldaysValue}
                </p>
              ) : null}
                </div>
              </Suspense>
              <p className={`mb-3 text-2xl font-semibold`}>
                Design
              </p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>not set</p>
              <Link href="/design" className={`m-0 max-w-[30ch] text-sm opacity-50`} > Edit </Link>
              </div>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                By Claire Sersun
              </p>
          </div>
        </main>
      )
  }

  if (currentUserInfo && currentUserInfo.design && eventInfo) {
    // console.log(currentUserInfo);
  let businessName = currentUserInfo.businessName;

  //get design 
  let colorOne = currentUserInfo.design.colorOne;
  let colorTwo = currentUserInfo.design.colorTwo;
  let colorFour = currentUserInfo.design.colorFour;
  let colorThree = currentUserInfo.design.colorThree;
  
  return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
    
          <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
            
          <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
            
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Welcome back, {session.user.name} with {businessName}!
                
              </h2>
              <Link href="/profile" className={`mb-3 text-2xl font-semibold`} > Profile</Link>
              <p className={`mb-3 text-2xl font-semibold`}>
                Events
              </p>
              <Suspense fallback={<div>Loading...</div>}>
              {events}
              </Suspense>
              <Link href="/events " className={`m-0 max-w-[30ch] text-sm opacity-50`} > + </Link>
              <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
              <p className={`mb-3 text-2xl font-semibold`}>
                Availability
              </p>
              <Link href="/availability" className={`m-0 max-w-[30ch] text-sm opacity-50`} > Edit </Link>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-7 lg:text-left">
                  {/* do not show a given day if there is nothing in the database */}
                  <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>not set</p>
                </div>
              </Suspense>
              <p className={`mb-3 text-2xl font-semibold`}>
                Design
              </p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{colorOne}</p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{colorTwo}</p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{colorThree}</p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{colorFour}</p>
              <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
              {/* a view of the design */}
              <Link href="/design" className={`m-0 max-w-[30ch] text-sm opacity-50`} > Edit </Link>
              </div>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                By Claire Sersun
              </p>
            
    
            </div>
          </div>
        </main>
      )
  }

  if (currentUserInfo && currentUserInfo.design ) {
    // console.log(currentUserInfo);
  let businessName = currentUserInfo.businessName;

  


  //get design 
  let colorOne = currentUserInfo.design.colorOne;
  let colorTwo = currentUserInfo.design.colorTwo;
  let colorFour = currentUserInfo.design.colorFour;
  let colorThree = currentUserInfo.design.colorThree;

  
  
  return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
    
          <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
            
          <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
            
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Welcome back, {session.user.name} with {businessName}!
                
              </h2>
              <Link href="/profile" className={`mb-3 text-2xl font-semibold`} > Profile</Link>
              <p className={`mb-3 text-2xl font-semibold`}>
                Events
              </p>
              <Suspense fallback={<div>Loading...</div>}>
              {/* how to do this?
              <div>
               this on is to view 
              <Link href="/[user]/[event]" className={`m-0 max-w-[30ch] text-sm opacity-50`} > event name. This will repeat depending on how many events there are</Link>
               this one is to edit 
              <Link href="/events/[slug]" className={`m-0 max-w-[30ch] text-sm opacity-50`} > Edit event. This will repeat depending on how many events there are</Link>
              </div> */}
              </Suspense>
              <Link href="/events " className={`m-0 max-w-[30ch] text-sm opacity-50`} > + </Link>
              <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
              <p className={`mb-3 text-2xl font-semibold`}>
                Availability
              </p>
              <Link href="/availability" className={`m-0 max-w-[30ch] text-sm opacity-50`} > Edit </Link>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-7 lg:text-left">
                  {/* do not show a given day if there is nothing in the database */}
                  <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>not set</p>
                </div>
              </Suspense>
              <p className={`mb-3 text-2xl font-semibold`}>
                Design
              </p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{colorOne}</p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{colorTwo}</p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{colorThree}</p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{colorFour}</p>
              <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
              {/* a view of the design */}
              <Link href="/design" className={`m-0 max-w-[30ch] text-sm opacity-50`} > Edit </Link>
              </div>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                By Claire Sersun
              </p>
            
    
            </div>
          </div>
        </main>
      )
  }

  if (currentUserInfo && currentUserInfo.availability) {
    // console.log(currentUserInfo);
  let businessName = currentUserInfo.businessName;

  //get availability
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

// how to say if this doesn't exist, then make the value blank?

  
  return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
    
          <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
            
          <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
            
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Welcome back, {session.user.name} with {businessName}!
                
              </h2>
              <Link href="/profile" className={`mb-3 text-2xl font-semibold`} > Profile</Link>
              <p className={`mb-3 text-2xl font-semibold`}>
                Events
              </p>
              <Suspense fallback={<div>Loading...</div>}>
              {/* how to do this?
              <div>
               this on is to view 
              <Link href="/[user]/[event]" className={`m-0 max-w-[30ch] text-sm opacity-50`} > event name. This will repeat depending on how many events there are</Link>
               this one is to edit 
              <Link href="/events/[slug]" className={`m-0 max-w-[30ch] text-sm opacity-50`} > Edit event. This will repeat depending on how many events there are</Link>
              </div> */}
              </Suspense>
              <Link href="/events " className={`m-0 max-w-[30ch] text-sm opacity-50`} > + </Link>
              <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
              <p className={`mb-3 text-2xl font-semibold`}>
                Availability
              </p>
              <Link href="/availability" className={`m-0 max-w-[30ch] text-sm opacity-50`} > Edit </Link>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
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
                  Additional Days: {additionaldaysValue}
                </p>
              ) : null}
                </div>
              </Suspense>
              <p className={`mb-3 text-2xl font-semibold`}>
                Design
              </p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>not set</p>
              <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
              {/* a view of the design */}
              <Link href="/design" className={`m-0 max-w-[30ch] text-sm opacity-50`} > Edit </Link>
              </div>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                By Claire Sersun
              </p>
            
    
            </div>
          </div>
        </main>
      )
  }

  if (currentUserInfo && eventInfo) {
    // console.log(currentUserInfo);
  let businessName = currentUserInfo.businessName;


  return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
    
          <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
            
          <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
            
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Welcome back, {session.user.name} with {businessName}!
                
              </h2>
              <Link href="/profile" className={`mb-3 text-2xl font-semibold`} > Profile</Link>
              <p className={`mb-3 text-2xl font-semibold`}>
                Events
              </p>
              <Suspense fallback={<div>Loading...</div>}>
              {/* how to do this?
              <div>
               this on is to view 
              <Link href="/[user]/[event]" className={`m-0 max-w-[30ch] text-sm opacity-50`} > event name. This will repeat depending on how many events there are</Link>
               this one is to edit 
              <Link href="/events/[slug]" className={`m-0 max-w-[30ch] text-sm opacity-50`} > Edit event. This will repeat depending on how many events there are</Link>
              </div> */}
              {events}
              </Suspense>
              <Link href="/events " className={`m-0 max-w-[30ch] text-sm opacity-50`} > + </Link>
              <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
              <p className={`mb-3 text-2xl font-semibold`}>
                Availability
              </p>
              <Link href="/availability" className={`m-0 max-w-[30ch] text-sm opacity-50`} > Edit </Link>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-7 lg:text-left">
                  {/* do not show a given day if there is nothing in the database */}
                  <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>not set</p>
                </div>
              </Suspense>
              <p className={`mb-3 text-2xl font-semibold`}>
                Design
              </p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>not set</p>
              <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
              {/* a view of the design */}
              <Link href="/design" className={`m-0 max-w-[30ch] text-sm opacity-50`} > Edit </Link>
              </div>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                By Claire Sersun
              </p>
            
    
            </div>
          </div>
        </main>
      )
  }

  if (currentUserInfo) {
    // console.log(currentUserInfo);
  // let businessName = currentUserInfo.businessName;


  return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
    
          <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
            
          <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
            
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Welcome back, {session.user.name}!
                
              </h2>
              <Link href="/profile" className={`mb-3 text-2xl font-semibold`} > Profile</Link>
              <p className={`mb-3 text-2xl font-semibold`}>
                Events
              </p>
              <Suspense fallback={<div>Loading...</div>}>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>not set</p>
              </Suspense>
              <Link href="/events " className={`m-0 max-w-[30ch] text-sm opacity-50`} > + </Link>
              <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
              <p className={`mb-3 text-2xl font-semibold`}>
                Availability
              </p>
              <Link href="/availability" className={`m-0 max-w-[30ch] text-sm opacity-50`} > Edit </Link>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-7 lg:text-left">
                  {/* do not show a given day if there is nothing in the database */}
                  <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>not set</p>
                </div>
              </Suspense>
              <p className={`mb-3 text-2xl font-semibold`}>
                Design
              </p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>not set</p>
              <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
              {/* a view of the design */}
              <Link href="/design" className={`m-0 max-w-[30ch] text-sm opacity-50`} > Edit </Link>
              </div>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                By Claire Sersun
              </p>
            
    
            </div>
          </div>
        </main>
      )
  }

  

}


