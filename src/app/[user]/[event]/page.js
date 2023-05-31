"use client"

import Datetime from 'react-datetime';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Schedule() {
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
        console.log(session.user.email);
          
          
          
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
    await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + session.provider_token, // Access token for google
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
  console.log(session);
  console.log(start);//this is the format needed: "2023-05-24T22:17:09-04:00"
  console.log(end);
  console.log(eventName);
  console.log(eventDescription);
  console.log(attendees);
  
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
              <Datetime  onChange={setStart} value={start}/>
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

