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
    <div key={event._id} className="grid-1 events-box">
      <p className={`text-bold event-title-box`}>{event.eventName}</p>
      <Link href={"/" + currentUserInfo.userId.toString() + "/" + event.eventnameParams} className={`text-regular event-spacing`} >View Public Link</Link>
      <Link href={"/events/" + event.eventnameParams} className={`text-regular edit-event`} >Edit Event</Link>
      
      </div>
      )
    )

  
  // console.log(events);

  if (!currentUserInfo) {
    return (
    <main className="container">
    
      
    <div className="grid-1">
      
        <h1 className={`text-bold`}>
          Finish Creating Your Profile
  
        </h1>
        <Link href="/profile" className={`text-bold`} > Click Here</Link>
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
    let website = currentUserInfo.design.website;
    
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
        <main >
    
          
            
          <div className="grid-1">
            
              <h2 className="text-bold home">
                Welcome, <br></br>{businessName}!
                
              </h2>
              <h3 className={`text-bold`}>
                Events
              </h3>
              <div className="grid-2">
              <Suspense fallback={<div>Loading...</div>}>
              {events}
              </Suspense>
              <Link href="/events " className={`text-regular add-event-btn`} > + </Link>
                </div>
              <div className="availability-box">
              <div className="grid-2">
              <h3 className={`text-bold`}>
                Availability
              </h3>
              <Link href="/availability" className={`text-regular`} > Edit </Link>
              </div>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <div className="availability">
                  {/* do not show a given day if there is nothing in the database */}
                  {mondaystartValue ? (<>
                <p className={`text-regular`}>
                  Monday: </p> <p className={`text-regular`}>{mondaystartValue} - {mondayendValue}
                </p>
                </>
              ) : null}
              {tuesdaystartValue ? (
                <>
              
                <p className={`text-regular`}>
                  Tuesday: </p> <p className={`text-regular`}>{tuesdaystartValue} - {tuesdayendValue}
                </p>
                </>
              ) : null}
              {wednesdaystartValue ? (
                <>
                <p className={`text-regular`}>
                  Wednesday: </p> <p className={`text-regular`}>{wednesdaystartValue} - {wednesdayendValue}
                </p>
                </>
              ) : null}
              {thursdaystartValue ? (
                <>
                <p className={`text-regular`}>
                  Thursday: </p> <p className={`text-regular`}>{thursdaystartValue} - {thursdayendValue}
                </p>
                </>
              ) : null}
              {fridaystartValue ? (
                <>
                <p className={`text-regular`}>
                  Friday: </p> <p className={`text-regular`}>{fridaystartValue} - {fridayendValue}
                </p>
                </>
              ) : null}
              {saturdaystartValue ? (
                <>
                <p className={`text-regular`}>
                  Saturday: </p> <p className={`text-regular`}>{saturdaystartValue} - {saturdayendValue}
                </p>
                
                </>
              ) : null}
              {sundaystartValue ? (
                <>
                <p className={`text-regular`}>
                  Sunday: </p> <p className={`text-regular`}>{sundaystartValue} - {sundayendValue}
                </p>
                </>
              ) : null}
              {additionaldaysValue ? (
                  <>
                  
                <p className={`text-regular`}>
                  Additional Days: </p><p className={`text-regular`}>{additionaldaysValue}
                </p>
                  </>
              ) : null}
                </div>
              </Suspense>
              
              <h3 className={`text-bold`}>
                Design
              </h3>
              <Link href="/design" className={`text-regular`} > Edit </Link>
             <div className="colors-main-page">
              <p className={`text-regular colorOne-main-page`} style={{backgroundColor: colorOne}}>{colorOne}</p>
              <p className={`text-regular colorTwo-main-page`} style={{backgroundColor: colorTwo}}>{colorTwo}</p>
              <p className={`text-regular colorThree-main-page`} style={{backgroundColor: colorThree}}>{colorThree}</p>
              
              <p className={`text-regular colorFour-main-page`} style={{backgroundColor: colorFour}}>{colorFour}</p>
         </div>
              <p className={`text-regular`}> {website}</p>
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
        <main >
    
          
            
          <div className="grid-1">
            
              <h2 className={`text-bold`}>
                Welcome back, {session.user.name} with {businessName}!
                
              </h2>
              <Link href="/profile" className={`text-bold`} > Profile</Link>
              <p className={`text-bold`}>
                Events
              </p>
              <Suspense fallback={<div>Loading...</div>}>
              </Suspense>
              <Link href="/events " className={`text-regular`} > + </Link>
              <div className="grid-2">
              <p className={`text-bold`}>
                Availability
              </p>
              <Link href="/availability" className={`text-regular`} > Edit </Link>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <div className="availability">
                  {/* do not show a given day if there is nothing in the database */}
                  {mondaystartValue ? (
                <p className={`text-regular`}>
                  Monday: {mondaystartValue} - {mondayendValue}
                </p>
              ) : null}
              {tuesdaystartValue ? (
                <p className={`text-regular`}>
                  Tuesday: {tuesdaystartValue} - {tuesdayendValue}
                </p>
              ) : null}
              {wednesdaystartValue ? (
                <p className={`text-regular`}>
                  Wednesday: {wednesdaystartValue} - {wednesdayendValue}
                </p>
              ) : null}
              {thursdaystartValue ? (
                <p className={`text-regular`}>
                  Thursday: {thursdaystartValue} - {thursdayendValue}
                </p>
              ) : null}
              {fridaystartValue ? (
                <p className={`text-regular`}>
                  Friday: {fridaystartValue} - {fridayendValue}
                </p>
              ) : null}
              {saturdaystartValue ? (
                <p className={`text-regular`}>
                  Saturday: {saturdaystartValue} - {saturdayendValue}
                </p>
              ) : null}
              {sundaystartValue ? (
                <p className={`text-regular`}>
                  Sunday: {sundaystartValue} - {sundayendValue}
                </p>
              ) : null}
              {additionaldaysValue ? (
                <p className={`text-regular`}>
                  Additional Days: {additionaldaysValue}
                </p>
              ) : null}
                </div>
              </Suspense>
              <p className={`text-bold`}>          Design
              </p>
              <p className={`text-regular`}>{colorOne}</p>
              <p className={`text-regular`}>{colorTwo}</p>
              <p className={`text-regular`}>{colorThree}</p>
              <p className={`text-regular`}>{colorFour}</p>
              <div className="grid-2">
              {/* a view of the design */}
              <Link href="/design" className={`text-regular`} > Edit </Link>
              </div>
              <p className={`text-regular`}>
                By Claire Sersun
              </p>
            
    
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
        <main >
    
         
            
          <div className="grid-1">
            
              <h2 className={`text-bold`}>
                Welcome back, {session.user.name} with {businessName}!
                
              </h2>
              <Link href="/profile" className={`text-bold`} > Profile</Link>
              <p className={`text-bold`}>
                Events
              </p>
              <Suspense fallback={<div>Loading...</div>}>
              {events}
              </Suspense>
              <Link href="/events " className={`text-regular`} > + </Link>
              <div className="grid-2">
              <p className={`text-bold`}>
                Availability
              </p>
              <Link href="/availability" className={`text-regular`} > Edit </Link>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <div className="availability">
                  {/* do not show a given day if there is nothing in the database */}
                  {mondaystartValue ? (
                <p className={`text-regular`}>
                  Monday: {mondaystartValue} - {mondayendValue}
                </p>
              ) : null}
              {tuesdaystartValue ? (
                <p className={`text-regular`}>
                  Tuesday: {tuesdaystartValue} - {tuesdayendValue}
                </p>
              ) : null}
              {wednesdaystartValue ? (
                <p className={`text-regular`}>
                  Wednesday: {wednesdaystartValue} - {wednesdayendValue}
                </p>
              ) : null}
              {thursdaystartValue ? (
                <p className={`text-regular`}>
                  Thursday: {thursdaystartValue} - {thursdayendValue}
                </p>
              ) : null}
              {fridaystartValue ? (
                <p className={`text-regular`}>
                  Friday: {fridaystartValue} - {fridayendValue}
                </p>
              ) : null}
              {saturdaystartValue ? (
                <p className={`text-regular`}>
                  Saturday: {saturdaystartValue} - {saturdayendValue}
                </p>
              ) : null}
              {sundaystartValue ? (
                <p className={`text-regular`}>
                  Sunday: {sundaystartValue} - {sundayendValue}
                </p>
              ) : null}
              {additionaldaysValue ? (
                <p className={`text-regular`}>
                  Additional Days: {additionaldaysValue}
                </p>
              ) : null}
                </div>
              </Suspense>
              <p className={`text-bold`}>
                Design
              </p>
              <p className={`text-regular`}>not set</p>
              <Link href="/design" className={`text-regular`} > Edit </Link>
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
        <main >
    
            
          <div className="grid-1">
            
              <h2 className={`text-bold`}>
                Welcome back, {session.user.name} with {businessName}!
                
              </h2>
              <Link href="/profile" className={`text-bold`} > Profile</Link>
              <p className={`text-bold`}>
                Events
              </p>
              <Suspense fallback={<div>Loading...</div>}>
              {events}
              </Suspense>
              <Link href="/events " className={`text-regular`} > + </Link>
              <div className="grid-2">
              <p className={`text-bold`}>
                Availability
              </p>
              <Link href="/availability" className={`text-regular`} > Edit </Link>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <div className="availability">
                  {/* do not show a given day if there is nothing in the database */}
                  <p className={`text-regular`}>not set</p>
                </div>
              </Suspense>
              <p className={`text-bold`}>
                Design
              </p>
              <p className={`text-regular`}>{colorOne}</p>
              <p className={`text-regular`}>{colorTwo}</p>
              <p className={`text-regular`}>{colorThree}</p>
              <p className={`text-regular`}>{colorFour}</p>
              <div className="grid-2">
              {/* a view of the design */}
              <Link href="/design" className={`text-regular`} > Edit </Link>
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
        <main >
    
            
          <div className="grid-1">
            
              <h2 className={`text-bold`}>
                Welcome back, {session.user.name} with {businessName}!
                
              </h2>
              <Link href="/profile" className={`text-bold`} > Profile</Link>
              <p className={`text-bold`}>
                Events
              </p>
              <Suspense fallback={<div>Loading...</div>}>
              {events}
              </Suspense>
              <Link href="/events " className={`text-regular`} > + </Link>
              <div className="grid-2">
              <p className={`text-bold`}>
                Availability
              </p>
              <Link href="/availability" className={`text-regular`} > Edit </Link>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <div className="availability">
                  {/* do not show a given day if there is nothing in the database */}
                  <p className={`text-regular`}>not set</p>
                </div>
              </Suspense>
              <p className={`text-bold`}>
                Design
              </p>
              <p className={`text-regular`}>{colorOne}</p>
              <p className={`text-regular`}>{colorTwo}</p>
              <p className={`text-regular`}>{colorThree}</p>
              <p className={`text-regular`}>{colorFour}</p>
              <div className="grid-2">
              {/* a view of the design */}
              <Link href="/design" className={`text-regular`} > Edit </Link>
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
        <main >
    
            
          <div className="grid-1">
            
              <h2 className={`text-bold`}>
                Welcome back, {session.user.name} with {businessName}!
                
              </h2>
              <Link href="/profile" className={`text-bold`} > Profile</Link>
              <p className={`text-bold`}>
                Events
              </p>
              <Suspense fallback={<div>Loading...</div>}>
              {events}
              </Suspense>
              <Link href="/events " className={`text-regular`} > + </Link>
              <div className="grid-2">
              <p className={`text-bold`}>
                Availability
              </p>
              <Link href="/availability" className={`text-regular`} > Edit </Link>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <div className="availability">
                  {/* do not show a given day if there is nothing in the database */}
                  {mondaystartValue ? (
                <p className={`text-regular`}>
                  Monday: {mondaystartValue} - {mondayendValue}
                </p>
              ) : null}
              {tuesdaystartValue ? (
                <p className={`text-regular`}>
                  Tuesday: {tuesdaystartValue} - {tuesdayendValue}
                </p>
              ) : null}
              {wednesdaystartValue ? (
                <p className={`text-regular`}>
                  Wednesday: {wednesdaystartValue} - {wednesdayendValue}
                </p>
              ) : null}
              {thursdaystartValue ? (
                <p className={`text-regular`}>
                  Thursday: {thursdaystartValue} - {thursdayendValue}
                </p>
              ) : null}
              {fridaystartValue ? (
                <p className={`text-regular`}>
                  Friday: {fridaystartValue} - {fridayendValue}
                </p>
              ) : null}
              {saturdaystartValue ? (
                <p className={`text-regular`}>
                  Saturday: {saturdaystartValue} - {saturdayendValue}
                </p>
              ) : null}
              {sundaystartValue ? (
                <p className={`text-regular`}>
                  Sunday: {sundaystartValue} - {sundayendValue}
                </p>
              ) : null}
              {additionaldaysValue ? (
                <p className={`text-regular`}>
                  Additional Days: {additionaldaysValue}
                </p>
              ) : null}
                </div>
              </Suspense>
              <p className={`text-bold`}>
                Design
              </p>
              <p className={`text-regular`}>not set</p>
              <div className="grid-2">
              {/* a view of the design */}
              <Link href="/design" className={`text-regular`} > Edit </Link>
              </div>
             
            
    
            </div>
        </main>
      )
  }

  if (currentUserInfo && eventInfo) {
    // console.log(currentUserInfo);
  let businessName = currentUserInfo.businessName;


  return (
        <main >
    
          <div className="grid-1">
            
              <h2 className={`text-bold`}>
                Welcome back, {session.user.name} with {businessName}!
                
              </h2>
              <Link href="/profile" className={`text-bold`} > Profile</Link>
              <p className={`text-bold`}>
                Events
              </p>
              <Suspense fallback={<div>Loading...</div>}>
              
              {events}
              </Suspense>
              <Link href="/events " className={`text-regular`} > + </Link>
              <div className="grid-2">
              <p className={`text-bold`}>
                Availability
              </p>
              <Link href="/availability" className={`text-regular`} > Edit </Link>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <div className="availability">
                  {/* do not show a given day if there is nothing in the database */}
                  <p className={`text-regular`}>not set</p>
                </div>
              </Suspense>
              <p className={`text-bold`}>
                Design
              </p>
              <p className={`text-regular`}>not set</p>
              <div className="grid-2">
              {/* a view of the design */}
              <Link href="/design" className={`text-regular`} > Edit </Link>
              </div>
             
    
            </div>
        </main>
      )
  }

  if (currentUserInfo) {
    // console.log(currentUserInfo);
  // let businessName = currentUserInfo.businessName;


  return (
        <main >
    
          
            
          <div className="grid-1">
            
              <h2 className={`text-bold`}>
                Welcome back, {session.user.name}!
                
              </h2>
              <Link href="/profile" className={`text-bold`} > Profile</Link>
              <p className={`text-bold`}>
                Events
              </p>
              <Suspense fallback={<div>Loading...</div>}>
              <p className={`text-regular`}>not set</p>
              </Suspense>
              <Link href="/events " className={`text-regular`} > + </Link>
              <div className="grid-2">
              <p className={`text-bold`}>
                Availability
              </p>
              <Link href="/availability" className={`text-regular`} > Edit </Link>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <div className="availability">
                  {/* do not show a given day if there is nothing in the database */}
                  <p className={`text-regular`}>not set</p>
                </div>
              </Suspense>
              <p className={`text-bold`}>
                Design
              </p>
              <p className={`text-regular`}>not set</p>
              <div className="grid-2">
              {/* a view of the design */}
              <Link href="/design" className={`text-regular`} > Edit </Link>
              </div>
    
            </div>
        </main>
      )
  }

  

}


