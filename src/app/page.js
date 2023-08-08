import SignIn from "./components/signin";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { Suspense } from "react";
import Link from 'next/link';
import moment from 'moment';

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
    <div key={event._id} className="grid-1 events-box add-margin">
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
    
          
          
            
              <h2 className="text-bold home">
                Welcome, <br></br>{businessName}!
                
              </h2>
              <div className="grid-2">

              <h3 className={`text-bold`}>
                Events
              </h3>
              <div></div>
              </div>
              <div className="grid-2">
              <Suspense fallback={<div>Loading...</div>}>
              {events}
              </Suspense>
              <Link href="/events " className={`text-regular add-event-btn add-margin`} > + </Link>
                </div>
              <div className="availability-box add-margin">
              <div className="grid-3">
              <h3 className={`text-bold no-margin`}>
                Availability
              </h3>
              <div></div>
              <Link href="/availability" className={`text-regular edit-avialability-btn`} > Edit </Link>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <div className="availability">
                  {/* do not show a given day if there is nothing in the database */}
                  {mondaystartValue ? (<>
                <p className={`text-regular width70`}>
                  Monday: </p> <p className={`text-regular width70`}>{mondaystartValue} - {mondayendValue}
                </p>
                </>
              ) : null}
              {tuesdaystartValue ? (
                <>
              
                <p className={`text-regular width70`}>
                  Tuesday: </p> <p className={`text-regular width70`}>{tuesdaystartValue} - {tuesdayendValue}
                </p>
                </>
              ) : null}
              {wednesdaystartValue ? (
                <>
                <p className={`text-regular width70`}>
                  Wednesday: </p> <p className={`text-regular width70`}>{wednesdaystartValue} - {wednesdayendValue}
                </p>
                </>
              ) : null}
              {thursdaystartValue ? (
                <>
                <p className={`text-regular width70`}>
                  Thursday: </p> <p className={`text-regular width70`}>{thursdaystartValue} - {thursdayendValue}
                </p>
                </>
              ) : null}
              {fridaystartValue ? (
                <>
                <p className={`text-regular width70`}>
                  Friday: </p> <p className={`text-regular width70`}>{fridaystartValue} - {fridayendValue}
                </p>
                </>
              ) : null}
              {saturdaystartValue ? (
                <>
                <p className={`text-regular width70`}>
                  Saturday: </p> <p className={`text-regular width70`}>{saturdaystartValue} - {saturdayendValue}
                </p>
                
                </>
              ) : null}
              {sundaystartValue ? (
                <>
                <p className={`text-regular width70`}>
                  Sunday: </p> <p className={`text-regular width70`}>{sundaystartValue} - {sundayendValue}
                </p>
                </>
              ) : null}
              {additionaldaysValue ? (
                <>
                  
                <p className={`text-regular width70`}>
                  Additional Days: </p><p className={`text-regular width70`}>{moment(additionaldaysValue).format('dddd, MMMM Do YYYY, h:mm a')}
                </p>
                  </>
              ) : null}
                </div>
              </Suspense>
              </div>
              <div className="grid-2">
          
              <h3 className={`text-bold`}>
                Design
              </h3>
              <Link href="/design" className={`text-regular underline`} > Edit </Link>
              </div>
             <div className="colors-main-page">
              <p className={`text-regular colorOne-main-page`} style={{backgroundColor: colorOne}}>       </p>
              <p className={`text-regular colorTwo-main-page`} style={{backgroundColor: colorTwo}}>       </p>
              <p className={`text-regular colorThree-main-page`} style={{backgroundColor: colorThree}}>       </p>
              
              <p className={`text-regular colorFour-main-page`} style={{backgroundColor: colorFour}}>       </p>
         </div>
              <p className={`text-regular website-main`}> {website}</p>
            
            
    
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
    
          
            
              <h2 className={`text-bold home`}>
                Welcome, <br></br> {businessName}!
                
              </h2>
              <div className="grid-2">
              
              <h3 className={`text-bold`}>
                Events
              </h3>
              <div></div>
              </div>
              <div className="grid-2">
              <Suspense fallback={<div>Loading...</div>}>
              <div></div>
              </Suspense>
              <Link href="/events " className={`text-regular add-event-btn add-margin`} > + </Link>
              </div>
              <div className="availability-box add-margin">
                <div className="grid-3">
              <h3 className={`text-bold no-margin`}>
                Availability
              </h3>
              <div></div>
              <Link href="/availability" className={`text-regular edit-availability-btn`} > Edit </Link>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <div className="availability">
                  {/* do not show a given day if there is nothing in the database */}
                  {mondaystartValue ? ( <>
                <p className={`text-regular width70`}>
                  Monday: </p> <p className={`text-regular width70`}>{mondaystartValue} - {mondayendValue}
                </p>
                  </>
              ) : null}
              {tuesdaystartValue ? (
                <>
              
                <p className={`text-regular width70`}>
                  Tuesday: </p> <p className={`text-regular width70`}>{tuesdaystartValue} - {tuesdayendValue}
                </p>
                </>
              ) : null}
              {wednesdaystartValue ? (
                <>
                <p className={`text-regular width70`}>
                  Wednesday: </p> <p className={`text-regular width70`}>{wednesdaystartValue} - {wednesdayendValue}
                </p>
                </>
              ) : null}
              {thursdaystartValue ? (
                <>
                <p className={`text-regular width70`}>
                  Thursday: </p> <p className={`text-regular width70`}>{thursdaystartValue} - {thursdayendValue}
                </p>
                </>
              ) : null}
              {fridaystartValue ? (
                <>
                <p className={`text-regular width70`}>
                  Friday: </p> <p className={`text-regular width70`}>{fridaystartValue} - {fridayendValue}
                </p>
                </>
              ) : null}
              {saturdaystartValue ? (
                <>
                <p className={`text-regular width70`}>
                  Saturday: </p> <p className={`text-regular width70`}>{saturdaystartValue} - {saturdayendValue}
                </p>
                
                </>
              ) : null}
              {sundaystartValue ? (
                <>
                <p className={`text-regular width70`}>
                  Sunday: </p> <p className={`text-regular width70`}>{sundaystartValue} - {sundayendValue}
                </p>
                </>
              ) : null}
              {additionaldaysValue ? (
                <>
                  
                <p className={`text-regular width70`}>
                  Additional Days: </p><p className={`text-regular width70`}>{moment(additionaldaysValue).format('dddd, MMMM Do YYYY, h:mm a')}
                </p>
                  </>
              ) : null}
                </div>
              </Suspense>
              </div>
              <div className="grid-2">
              <h3 className={`text-bold`}>
                Design
              </h3>
              <Link href="/design" className={`text-regular underline`} > Edit </Link>
              </div>
              <div className="colors-main-page">
              <p className={`text-regular colorOne-main-page`} style={{backgroundColor: colorOne}}>        </p>
              <p className={`text-regular colorTwo-main-page`} style={{backgroundColor: colorTwo}}>        </p>
              <p className={`text-regular colorThree-main-page`} style={{backgroundColor: colorThree}}>        </p>
              
              <p className={`text-regular colorFour-main-page`} style={{backgroundColor: colorFour}}>        </p>
         </div>
              <p className={`text-regular website-main`}> {website}</p>
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
    
         
            
            
              <h2 className={`text-bold home`}>
                Welcome,<br></br> 
                {businessName}!
                
              </h2>
              <div className="grid-2">
              <h3 className={`text-bold`}>
                Events
              </h3>
              <div></div>
              </div>
              <div className="grid-2">
              <Suspense fallback={<div>Loading...</div>}>
              {events}
              </Suspense>
              <Link href="/events " className={`text-regular add-event-btn add-margin`} > + </Link>
              </div>
              <div className="availability-box add-margin">
              <div className="grid-3">
              <h3 className={`text-bold no-margin`}>
                Availability
              </h3>
              <div></div>
              <Link href="/availability" className={`text-regular edit-avialability-btn`} > Edit </Link>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <div className="availability">
                  {/* do not show a given day if there is nothing in the database */}
                  {mondaystartValue ? (<>
                <p className={`text-regular width70`}>
                  Monday: </p> <p className={`text-regular width70`}>{mondaystartValue} - {mondayendValue}
                </p>
                </>
              ) : null}
              {tuesdaystartValue ? (
                <>
              
                <p className={`text-regular width70`}>
                  Tuesday: </p> <p className={`text-regular width70`}>{tuesdaystartValue} - {tuesdayendValue}
                </p>
                </>
              ) : null}
              {wednesdaystartValue ? (
                <>
                <p className={`text-regular width70`}>
                  Wednesday: </p> <p className={`text-regular width70`}>{wednesdaystartValue} - {wednesdayendValue}
                </p>
                </>
              ) : null}
              {thursdaystartValue ? (
                <>
                <p className={`text-regular width70`}>
                  Thursday: </p> <p className={`text-regular width70`}>{thursdaystartValue} - {thursdayendValue}
                </p>
                </>
              ) : null}
              {fridaystartValue ? (
                <>
                <p className={`text-regular width70`}>
                  Friday: </p> <p className={`text-regular width70`}>{fridaystartValue} - {fridayendValue}
                </p>
                </>
              ) : null}
              {saturdaystartValue ? (
                <>
                <p className={`text-regular width70`}>
                  Saturday: </p> <p className={`text-regular width70`}>{saturdaystartValue} - {saturdayendValue}
                </p>
                
                </>
              ) : null}
              {sundaystartValue ? (
                <>
                <p className={`text-regular width70`}>
                  Sunday: </p> <p className={`text-regular width70`}>{sundaystartValue} - {sundayendValue}
                </p>
                </>
              ) : null}
              {additionaldaysValue ? (
                <>
                  
                <p className={`text-regular width70`}>
                  Additional Days: </p><p className={`text-regular width70`}>{moment(additionaldaysValue).format('dddd, MMMM Do YYYY, h:mm a')}
                </p>
                  </>
              ) : null}
                </div>
              </Suspense>
              </div>
              <div className="grid-2">
              <h3 className={`text-bold`}>
                Design
              </h3>
              <Link href="/design" className={`text-regular underline`} > Edit </Link>
              <p className={`text-regular`}>not set</p>
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
    
            
              <h2 className={`text-bold home`}>
                Welcome, <br></br> {businessName}!
                
              </h2>
            <div className="grid-2">
              <h3 className={`text-bold`}>
                Events
              </h3>
              <div></div>
              </div>
              <div className="grid-2">
              <Suspense fallback={<div>Loading...</div>}>
              {events}
              </Suspense>
              <Link href="/events " className={`text-regular add-event-btn add-margin`} > + </Link>
             </div>
             <div className="availability-box add-margin">
             <div className="grid-3">
              <h3 className={`text-bold no-margin`}>
                Availability
              </h3>
              <div></div>
              <Link href="/availability" className={`text-regular edit-avialability-btn`} > Edit </Link>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <div className="availability">
                  {/* do not show a given day if there is nothing in the database */}
                  <p className={`text-regular width70`}>not set</p>
                </div>
              </Suspense>
              </div>
              <div className="grid-2">
          
              <h3 className={`text-bold`}>
                Design
              </h3>
              <Link href="/design" className={`text-regular underline`} > Edit </Link>
              </div>
             <div className="colors-main-page">
              <p className={`text-regular colorOne-main-page`} style={{backgroundColor: colorOne}}>        </p>
              <p className={`text-regular colorTwo-main-page`} style={{backgroundColor: colorTwo}}>        </p>
              <p className={`text-regular colorThree-main-page`} style={{backgroundColor: colorThree}}>        </p>
              
              <p className={`text-regular colorFour-main-page`} style={{backgroundColor: colorFour}}>        </p>
         </div>
              <p className={`text-regular website-main`}> {website}</p>
              
              
          
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
  
            
              <h2 className={`text-bold home`}>
              Welcome, <br></br>{businessName}!
                
              </h2>
        <div className="grid-2">
              <h3 className={`text-bold`}>
                Events
              </h3>
              <div ></div>
              </div>
              <div className="grid-2">
              <Suspense fallback={<div>Loading...</div>}>
              {events}
              </Suspense>
              <Link href="/events " className={`text-regular add-event-btn add-margin`} > + </Link>
              
              </div>
              <div className="availability-box add-margin">
              <div className="grid-3">
              <h3 className={`text-bold no-margin`}>
                Availability
              </h3>
              <div></div>
              <Link href="/availability" className={`text-regular edit-avialability-btn`} > Edit </Link>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <div className="availability">
                  {/* do not show a given day if there is nothing in the database */}
                  <p className={`text-regular width70`}>not set</p>
                </div>
              </Suspense>
              </div>
              <div className="grid-2">
              <h3 className={`text-bold`}>
                Design
              </h3>
              <Link href="/design" className={`text-regular underline`} > Edit </Link>
              </div>
             <div className="colors-main-page">
              <p className={`text-regular colorOne-main-page`} style={{backgroundColor: colorOne}}>        </p>
              <p className={`text-regular colorTwo-main-page`} style={{backgroundColor: colorTwo}}>        </p>
              <p className={`text-regular colorThree-main-page`} style={{backgroundColor: colorThree}}>        </p>
              
              <p className={`text-regular colorFour-main-page`} style={{backgroundColor: colorFour}}>        </p>
         </div>
              <p className={`text-regular website-main`}> {website}</p>
              
              
            
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
    
            
            
          <h2 className="text-bold home">
                Welcome, <br></br>{businessName}!
                
              </h2>
              <div className="grid-2">
              <h3 className={`text-bold`}>
                Events
              </h3>
              <div></div>
              </div>
              <div className="grid-2">
              <Suspense fallback={<div>Loading...</div>}>
              {events}
              </Suspense>
              <Link href="/events " className={`text-regular add-event-btn add-margin`} > + </Link>
              </div>
              <div className="availability-box add-margin">
              <div className="grid-3">
              <h3 className={`text-bold no-margin`}>
                Availability
              </h3>
              <div></div>
              <Link href="/availability" className={`text-regular edit-avialability-btn`} > Edit </Link>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <div className="availability">
                  {/* do not show a given day if there is nothing in the database */}
                  {mondaystartValue ? (<>
                <p className={`text-regular width70`}>
                  Monday: </p> <p className={`text-regular width70`}>{mondaystartValue} - {mondayendValue}
                </p>
                </>
              ) : null}
              {tuesdaystartValue ? (
                <>
              
                <p className={`text-regular width70`}>
                  Tuesday: </p> <p className={`text-regular width70`}>{tuesdaystartValue} - {tuesdayendValue}
                </p>
                </>
              ) : null}
              {wednesdaystartValue ? (
                <>
                <p className={`text-regular width70`}>
                  Wednesday: </p> <p className={`text-regular width70`}>{wednesdaystartValue} - {wednesdayendValue}
                </p>
                </>
              ) : null}
              {thursdaystartValue ? (
                <>
                <p className={`text-regular width70`}>
                  Thursday: </p> <p className={`text-regular width70`}>{thursdaystartValue} - {thursdayendValue}
                </p>
                </>
              ) : null}
              {fridaystartValue ? (
                <>
                <p className={`text-regular width70`}>
                  Friday: </p> <p className={`text-regular width70`}>{fridaystartValue} - {fridayendValue}
                </p>
                </>
              ) : null}
              {saturdaystartValue ? (
                <>
                <p className={`text-regular width70`}>
                  Saturday: </p> <p className={`text-regular width70`}>{saturdaystartValue} - {saturdayendValue}
                </p>
                
                </>
              ) : null}
              {sundaystartValue ? (
                <>
                <p className={`text-regular width70`}>
                  Sunday: </p> <p className={`text-regular width70`}>{sundaystartValue} - {sundayendValue}
                </p>
                </>
              ) : null}
              {additionaldaysValue ? (
                <>
                  
                <p className={`text-regular width70`}>
                  Additional Days: </p><p className={`text-regular width70`}>{moment(additionaldaysValue).format('dddd, MMMM Do YYYY, h:mm a')}
                </p>
                  </>
              ) : null}
                </div>
              </Suspense>
              </div>
              <div className="grid-2">
              <h3 className={`text-bold`}>
                Design
              </h3>
              <Link href="/design" className={`text-regular underline`} > Edit </Link>
              <p className={`text-regular`}>not set</p>
              
              </div>
             
            
        </main>
      )
  }

  if (currentUserInfo && eventInfo) {
    // console.log(currentUserInfo);
  let businessName = currentUserInfo.businessName;


  return (
        <main >
    
            
          <h2 className="text-bold home">
                Welcome, <br></br>{businessName}!
                
              </h2>
            <div className="grid-2">
              <h3 className={`text-bold`}>
                Events
              </h3>
              <div></div>
              </div>
              <div className="grid-2">
              <Suspense fallback={<div>Loading...</div>}>
              
              {events}
              </Suspense>
              <Link href="/events " className={`text-regular add-event-btn add-margin`} > + </Link>
              </div>
              <div className="availability-box add-margin">
              <div className="grid-3">
              <h3 className={`text-bold no-margin`}>
                Availability
              </h3>
              <div></div>
              <Link href="/availability" className={`text-regular edit-avialability-btn`} > Edit </Link>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <div className="availability">
                  {/* do not show a given day if there is nothing in the database */}
                  <p className={`text-regular width70`}>not set</p>
                </div>
              </Suspense>
              </div>
              <div className="grid-2">
          
          <h3 className={`text-bold`}>
            Design
          </h3>
          <Link href="/design" className={`text-regular underline`} > Edit </Link>
          </div>
              <p className={`text-regular`}>not set</p>
        </main>
      )
  }

  if (currentUserInfo) {
    // console.log(currentUserInfo);
  // let businessName = currentUserInfo.businessName;


  return (
        <main >
    
          
            
            
              <h2 className={`text-bold home`}>
                Welcome, {session.user.name}!
                
              </h2>
              <div className="grid-2">
              <h3 className={`text-bold`}>
                Events
              </h3>
              <div></div>
              </div>
              <div className="grid-2">
              <Suspense fallback={<div>Loading...</div>}>
              <p className={`text-regular`}>not set</p>
              </Suspense>
              <Link href="/events " className={`text-regular add-event-btn add-margin`} > + </Link>
              
              </div>
              <div className="availability-box add-margin">
              <div className="grid-3">
              <h3 className={`text-bold no-margin`}>
                Availability
              </h3>
              <div></div>
              <Link href="/availability" className={`text-regular edit-avialability-btn`} > Edit </Link>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <div className="availability">
                  {/* do not show a given day if there is nothing in the database */}
                  <p className={`text-regular width70`}>not set</p>
                </div>
              </Suspense>
              </div>
              <div className="grid-2">
              <h3 className={`text-bold`}>
                Design
              </h3>
              <Link href="/design" className={`text-regular underline`} > Edit </Link>
              <p className={`text-regular`}>not set</p>
              
              </div>
        </main>
      )
  }

  

}


