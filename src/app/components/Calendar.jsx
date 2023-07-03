"use client";

import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
// import "react-date-picker/dist/DatePicker.css";
// import "react-calendar/dist/Calendar.css";
// import mongodb from 'mongodb';
// import GET from './findinfo.js';
//HOW TO GET THE ACCESS TOKEN AND SEND IT TO THE GOOGLE API

export default function Calendar(props) {
  const date = new Date();
  const [start, setStart] = useState("");
  // console.log(start);
  // const [eventName, setEventName] = useState(""); this is the name pulled from the database
  const [eventNotes, setEventNotes] = useState(""); // this is the notes added by the user
  const [attendees, setAttendees] = useState("");
  const user = props.user;
  const description = props.description;
  const length = props.length;
  const eventName = props.eventName;
  const googleEmail = props.googleEmail;
  const mondaystartValue = props.mondaystartValue;
  const mondayendValue = props.mondayendValue;
  const tuesdaystartValue = props.tuesdaystartValue;
  const tuesdayendValue = props.tuesdayendValue;
  const wednesdaystartValue = props.wednesdaystartValue;
  const wednesdayendValue = props.wednesdayendValue;
  const thursdaystartValue = props.thursdaystartValue;
  const thursdayendValue = props.thursdayendValue;
  const fridaystartValue = props.fridaystartValue;
  const fridayendValue = props.fridayendValue;
  const saturdaystartValue = props.saturdaystartValue;
  const saturdayendValue = props.saturdayendValue;
  const sundaystartValue = props.sundaystartValue;
  const sundayendValue = props.sundayendValue;
  const additionaldaysValue = props.additionaldaysValue;
  const accessToken = props.accessToken;

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
    var chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    var charLength = chars.length;
    var result = "";
    for (var i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
  }

  async function createCalendarEvent() {
    console.log("creating calendar event");
    const end = new Date(start.getTime() + length * 60000);
    const event = {
      summary: eventName,
      description: description + " " + eventNotes,
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
            email: googleEmail,
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
          Authorization: "Bearer " + accessToken, // Access token for google
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

  return (
    <div className={`m-0 max-w-[30ch] text-sm opacity-50`}>
      <div
        style={{
          width: "400px",
          margin: "30px auto",
          color: "white",
        }}
      >
        <>
          <p>Event Notes</p>
          <input
            type="text"
            onChange={(e) => {
              setEventNotes(e.target.value);
            }}
          />
          <p>Your Email</p>
          <input type="text" onChange={(e) => setAttendees(e.target.value)} />

          <p>Select Meetime Time</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "flex-start",
              margin: "10px 0",
              padding: "10px",

              color: "black",
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                display: "flex",
                maxWidth: "100%",
                flexBasis: "420px",
                flexDirection: "column",
                flexGrow: "100",
                margin: "10px",
                alignItems: "stretch",
              }}
            >
              <DateTimePicker
                style={{
                  margin: "10px",
                  color: "black",
                }}
                amPmAriaLabel="Select AM/PM"
                calendarAriaLabel="Toggle calendar"
                clearAriaLabel="Clear value"
                dayAriaLabel="Day"
                hourAriaLabel="Hour"
                maxDetail="minute"
                minuteAriaLabel="Minute"
                monthAriaLabel="Month"
                nativeInputAriaLabel="Date and time"
                yearAriaLabel="Year"
                onChange={setStart}
                value={start}
              />
            </div>
          </div>
          <button onClick={() => createCalendarEvent()}>
            Create Calendar Event
          </button>
          <p></p>
        </>
      </div>
    </div>
  );
}
