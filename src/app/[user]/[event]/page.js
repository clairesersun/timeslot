"use client"

import Datetime from 'react-datetime';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import SignIn from '../../components/signin';
// import mongodb from 'mongodb';
// import GET from './findinfo.js';
//HOW TO GET THE ACCESS TOKEN AND SEND IT TO THE GOOGLE API

export default async function Schedule() {
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [attendees, setAttendees] = useState("");
    const {data: session, status} =  useSession({
        required: true,
        onUnauthenticated: () => { 
            console.log('not signed in')}
        })
// console.log(session, status)
// GET()

        // async function handleCreateAccount(e) {
        //     try {
        //       const res = await fetch("/api/user", {
        //         method: "POST",
        //         headers: {
        //           "content-type": "application/json",
        //         },
        //         body: JSON.stringify({ 
        //             access_token, 
        //             id_token, 
        //             email }),
        //       });
        //       if (res.status === 200) return router.push("/");
        //       const { error: message } = await res.json();
        //       setError(message);
        //     } catch (err) {
        //       console.log(err);
        //     }
        //   }

//     const MongoClient = require("mongodb");
// const url = 'mongodb://localhost:27017/';
// const databasename = "users";  // Database name
// MongoClient.connect(url).then((client) => {
  
//     const connect = client.db(databasename);
  
//     // Connect to collection
//     const collection = connect
//         .collection("accounts");
  
//     collection.find({}).toArray().then((ans) => {
//         console.log(ans);
//     });
// }).catch((err) => {
  
//     // Printing the error message
//     console.log(err.Message);

// });

    // const accessToken = await getCsrfToken()
    // console.log(accessToken)
    // console.log(token)
    //is this not correct?
        // console.log(session.user.email);
          
        // console.log(db.test.sessions.access_token)
          
          function getRandonString(length) {
              var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
              var charLength = chars.length;
              var result = '';
              for ( var i = 0; i < length; i++ ) {
                  result += chars.charAt(Math.floor(Math.random() * charLength));
                }
                return result;
            }
            
            async function createCalendarEvent() {
                console.log(session, status, start)
                console.log("creating calendar event")
                const event = {
                    summary: eventName,
                    description: eventDescription,
                    start: {
        dateTime: start.toISOString(), // Date.toISOString() ->
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: end.toISOString(), // Date.toISOString() ->
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      attendees:
        // you will need to run a check to ensure this is a correct email address as per https://datatracker.ietf.org/doc/html/rfc5322#section-3.4
        [
          //this will be the entered address
          { email: attendees, responseStatus: "needsAction" },
          //this will be the business owners address
          {
            email: session.user.email,
            responseStatus: "accepted",
            self: true,
          },
        ],
      conferenceData: {
        createRequest: {
          conferenceSolutionKey: { type: "hangoutsMeet" },
          requestId: getRandonString(22),
        },
      },
    };
    
    //need the access token to create the event

//     await clientPromise
//     // `await clientPromise` will use the default database passed in the MONGODB_URI
//     // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
//     //
//     // `const client = await clientPromise`
//     // `const db = client.db("myDatabase")`
//     //
//     // Then you can execute queries against your database like so:
//     // db.find({}) or any of the MongoDB Node Driver commands
// let client = await clientPromise;
// let db = await client.db("test");

    await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + users.accounts.access_token, // Access token for google
        },
        body: JSON.stringify(event),
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data.conferenceData, data);
        alert("Event created, check your Google Calendar!");
      });
    }
  
  console.log(session)
//   console.log(session);
//   console.log(start);//this is the format needed: "2023-05-24T22:17:09-04:00"
//   console.log(end);
//   console.log(eventName);
//   console.log(eventDescription);
//   console.log(attendees);
  if (status === "authenticated") {
    return (
      <div className={`m-0 max-w-[30ch] text-sm opacity-50`}>
        <div style={{
            width: "400px",
            margin: "30px auto",
            color: "white",
          }}>
            <>
            <h2>Hi {session.user.email}</h2>
            <p>Start of your event</p>
              <Datetime  onChange={setStart} value={start} style={{color: "black"}}/>
              <p>End of your event</p>
              <Datetime onChange={setEnd} value={end} />
              <p>Event name</p>
              <input type="text" onChange={(e) => setEventName(e.target.value)} />
              <p>Event description</p>
              <input
                type="text"
                onChange={(e) => setEventDescription(e.target.value)}
              />
              <p>Event attendees</p>
              <input type="text" onChange={(e) => setAttendees(e.target.value)} />
              <hr />
              <button onClick={() => createCalendarEvent()}>
                Create Calendar Event
              </button>
              <p></p>
            </>
        </div>
        
      </div>
    );
  }
  else return <SignIn /> 
}
