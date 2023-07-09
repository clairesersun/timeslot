"use client";

//I DO NOT HAVE GOOGLE ACCESS TO DO THIS YET -- FIGURE OUT WITH GOOGLE HOW TO DO THIS

import { useState } from "react";
// import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

export default function Calendar(props) {
  const date = new Date();
  const [start, setStart] = useState(new Date());
  const [eventNotes, setEventNotes] = useState(""); // this is the notes added by the user
  const [attendees, setAttendees] = useState("");
  const user = props.user;
  const description = props.description;
  const length = props.length;
  const eventName = props.eventName;
  const googleEmail = props.googleEmail;
  const email = props.email;
  const accessToken = props.accessToken;
  const refreshToken = props.refreshToken;
  const expires_at = props.expires_at;
  const idToken = props.idToken;
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

  const getTimeConstraints = () => {
    if (mondaystartValue === "true")
      return (
        { hours: { min: 0, max: 23, step: 1 } } && {
          minutes: { min: 0, max: 59, step: +length },
        }
      );
    else
      return {
        minutes: { min: 0, max: 59, step: +length },
      };
  };

  var yesterday = moment().subtract(1, "day");
  var valid = function (current, selected) {
    //get ddays from database and any that are not available do not show
    const customDates = ["2023-07-11", "2023-07-12", "2023-07-15"];
    // const customTimes = ["10:00", "11:00"];
    const saturday =
      saturdayendValue === ""
        ? current.day() !== 6 //saturday
        : current.day() == 6;
    const sunday =
      sundayendValue === "" ? current.day() !== 0 : current.day() == 0;
    const monday =
      mondayendValue === "" ? current.day() !== 1 : current.day() == 1;
    const tuesday =
      tuesdayendValue === "" ? current.day() !== 2 : current.day() == 2;
    const wednesday =
      wednesdayendValue === "" ? current.day() !== 3 : current.day() == 3;
    const thursday =
      thursdayendValue === "" ? current.day() !== 4 : current.day() == 4;
    const friday =
      fridayendValue === "" ? current.day() !== 5 : current.day() == 5;
    return (
      current.isAfter(yesterday) &&
      additionaldaysValue &&
      sunday &&
      saturday &&
      monday &&
      tuesday &&
      wednesday &&
      thursday &&
      friday
      // &&
      // !customTimes.includes(current.format("HH:mm")) //can't select days before today
    );
    // !customDates.includes(current.format("YYYY-MM-DD")) &&
    // &&
  };

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
    // console.log(start, end);
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
    // console.log(event);
    //this works, it just expires fast. need to handle refresh tokens
    await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1",
      {
        method: "POST",

        headers: {
          "Content-Type": "text/html",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(event),
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        // console.log(data.conferenceData, data);
        // create a booked event in the database
        alert(
          `Event created, check your Google Calendar! For further questions email ${email}`
        );
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
            style={{
              margin: "10px",
              color: "black",
            }}
            type="text"
            onChange={(e) => {
              setEventNotes(e.target.value);
            }}
          />
          <p>Your Email</p>
          <input
            type="text"
            onChange={(e) => setAttendees(e.target.value)}
            style={{
              margin: "10px",
              color: "black",
            }}
          />

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
              <Datetime
                style={{
                  margin: "10px",
                  color: "black",
                }}
                isValidDate={valid}
                onChange={() => setStart()}
                timeConstraints={getTimeConstraints}
                value={start}
                selected={start}
              />
            </div>
          </div>
          <button onClick={() => createCalendarEvent(accessToken)}>
            Create Calendar Event
          </button>
          <p></p>
        </>
      </div>
    </div>
  );
}
