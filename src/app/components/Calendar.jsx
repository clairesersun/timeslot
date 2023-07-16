"use client";

import { subMinutes } from "date-fns";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//you need to handle booked appt times in the calendar
//add them to times they cannot book with the exclude dates property in the calendar

export default function Calendar(props) {
  const date = new Date();
  const [start, setStart] = useState(new Date());
  const [eventNotes, setEventNotes] = useState(""); // this is the notes added by the user
  const [attendees, setAttendees] = useState("");
  const user = props.user;
  const description = props.description;
  const length = props.length;
  const event = props.event;
  const bookings = props.bookings;
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

  //include specific dates based on if the user has availability on that day
  const datesIncluded = [new Date()];
  const mondayDates = [];
  const monday = moment().weekday(1);
  if (mondaystartValue !== "") {
    for (let i = 0; i < 52; i++) {
      let day = i;
      let nextMonday;
      nextMonday = moment(monday).add(7 * day, "days");
      // console.log(nextMonday._d);
      if (!mondayDates.includes("Monday")) {
        mondayDates.push(moment(nextMonday._d).format("dddd"));
      }
      datesIncluded.push(nextMonday._d);
      // console.log(i);
      i + 7;
    }
  }
  const tuesday = moment().weekday(2);
  const tuesdayDates = [];
  if (tuesdaystartValue !== "") {
    for (let i = 0; i < 52; i++) {
      let day = i;
      let nextTuesday;
      nextTuesday = moment(tuesday).add(7 * day, "days");
      if (!tuesdayDates.includes("Tuesday")) {
        tuesdayDates.push(moment(nextTuesday._d).format("dddd"));
      }
      // console.log(nextTuesday._d);
      datesIncluded.push(nextTuesday._d);
      // console.log(i);
      i + 7;
    }
  }
  const wednesday = moment().weekday(3);
  const wednesdayDates = [];
  if (wednesdaystartValue !== "") {
    for (let i = 0; i < 52; i++) {
      let day = i;
      let nextWednesday;
      nextWednesday = moment(wednesday).add(7 * day, "days");
      if (!wednesdayDates.includes("Wednesday")) {
        wednesdayDates.push(moment(nextWednesday._d).format("dddd"));
      }
      // console.log(nextWednesday._d);
      datesIncluded.push(nextWednesday._d);
      // console.log(i);
      i + 7;
    }
  }
  const thursday = moment().weekday(4);
  const thursdayDates = [];
  if (thursdaystartValue !== "") {
    for (let i = 0; i < 52; i++) {
      let day = i;
      let nextThursday;
      nextThursday = moment(thursday).add(7 * day, "days");
      if (!thursdayDates.includes("Thursday")) {
        thursdayDates.push(moment(nextThursday._d).format("dddd"));
      }
      // console.log(nextThursday._d);
      datesIncluded.push(nextThursday._d);
      // console.log(i);
      i + 7;
    }
  }
  const friday = moment().weekday(5);
  const fridayDates = [];
  if (fridaystartValue !== "") {
    for (let i = 0; i < 52; i++) {
      let day = i;
      let nextFriday;
      nextFriday = moment(friday).add(7 * day, "days");
      if (!fridayDates.includes("Friday")) {
        fridayDates.push(moment(nextFriday._d).format("dddd"));
      }
      // console.log(nextFriday._d);
      datesIncluded.push(nextFriday._d);
      // console.log(i);
      i + 7;
    }
  }
  const saturday = moment().weekday(6);
  const saturdayDates = [];
  if (saturdaystartValue !== "") {
    for (let i = 0; i < 52; i++) {
      let day = i;
      let nextSaturday;
      nextSaturday = moment(saturday).add(7 * day, "days");
      if (!saturdayDates.includes("Saturday")) {
        saturdayDates.push(moment(nextSaturday._d).format("dddd"));
      }
      // console.log(nextSaturday._d);
      datesIncluded.push(nextSaturday._d);
      // console.log(i);
      i + 7;
    }
  }
  const sunday = moment().weekday(7);
  const sundayDates = [];
  if (sundaystartValue !== "") {
    for (let i = 0; i < 52; i++) {
      let day = i;
      let nextSunday;
      nextSunday = moment(sunday).add(7 * day, "days");
      if (!sundayDates.includes("Sunday")) {
        sundayDates.push(moment(nextSunday._d).format("dddd"));
      }
      datesIncluded.push(nextSunday._d);
      i + 7;
    }
  }
  const additionaldays = [];
  if (additionaldaysValue !== "") {
    let addDays = moment(additionaldaysValue).toDate();
    if (!additionaldays.includes(addDays)) {
      additionaldays.push(moment(addDays).format("dddd"));
    }
    datesIncluded.push(addDays);
  }

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    const selectedTime = moment(selectedDate).format("HH:mm");

    function addMinutes(date, minutes) {
      date.setMinutes(date.getMinutes() + minutes);

      return date;
    }

    const date = selectedDate;
    const newDate = addMinutes(date, +length);
    let minutes = newDate.getMinutes();
    let hours = newDate.getHours();

    let selectedMinutes = date.getMinutes();
    let selectedHours = date.getHours();

    if (selectedMinutes === 0) {
      selectedMinutes = "00";
    }
    let mySelectedTime = selectedHours + ":" + selectedMinutes;

    if (minutes === 0) {
      minutes = "00";
    }

    let myTime = hours + ":" + minutes;

    const newerDate = subMinutes(date, +length);
    let minusMinutes = newerDate.getMinutes();
    let minusHours = newerDate.getHours();

    if (minusMinutes === 0) {
      minusMinutes = "00";
    }

    let myOtherTime = minusHours + ":" + minusMinutes;

    // console.log(myOtherTime);
    // console.log(date);

    // //add length from this time
    // let addedTime = moment(selectedDate).add(+length, "minutes").calendar();
    // console.log(addedTime);
    // // let date = new Date(subtractedTime);
    // // let formattedTime = moment(date).format("HH:mm");
    // let myString = addedTime.split(" ");
    // let myTime;
    // myTime = myString[2] + " " + myString[3];
    // if (myString[3] === "PM") {
    //   let string = myString[2].split(":");
    //   let hour = string[0];
    //   let minute = string[1];
    //   let newHour = parseInt(hour) + 12;
    //   //add length to this time
    //   myTime = newHour + ":" + minute;
    // }
    // let endValue;
    let lengthMult = length * 2;
    let earlyTime = 9 + ":" + lengthMult;
    let lateTime = 23 + ":" + lengthMult;
    if (lengthMult >= 60) {
      earlyTime = 9 + ":" + length;
      lateTime = 23 + ":" + length;
    }
    //why is 9:40 am & 11:40pm showing up in every available date?
    if (mondayDates.includes(moment(selectedDate).format("dddd"))) {
      if (!(mondaystartValue > earlyTime < mondayendValue)) {
        if (!(mondaystartValue > lateTime < mondayendValue)) {
          return (
            //if both late time and early time are not within the mondaystartValue and mondayendValue then return this
            earlyTime > myOtherTime &&
            myOtherTime > mondaystartValue &&
            myTime < mondayendValue &&
            // add late time to this conditional statement
            //this is not working
            // mondayendValue < lateTime &&
            // lateTime < myTime &&
            currentDate.getTime() < selectedDate.getTime()
          );
        }
        console.log("this is working");
        // if early time only is not within the mondaystartValue and mondayendValue then return this
        return (
          earlyTime > myOtherTime &&
          myOtherTime > mondaystartValue &&
          myTime < mondayendValue &&
          currentDate.getTime() < selectedDate.getTime()
        );
      }
      if (!(mondaystartValue > lateTime < mondayendValue)) {
        //if late time only is not within the mondaystartValue and mondayendValue then return this
        console.log("this is working v3");
        return (
          //if both late time and early time are not within the mondaystartValue and mondayendValue then return this
          myOtherTime > mondaystartValue &&
          myTime < mondayendValue &&
          // add late time to this conditional statement
          currentDate.getTime() < selectedDate.getTime()
        );
      }
      return (
        myOtherTime > mondaystartValue &&
        myTime < mondayendValue &&
        currentDate.getTime() < selectedDate.getTime()
      );
    }
    if (tuesdayDates.includes(moment(selectedDate).format("dddd"))) {
      if (!(tuesdaystartValue > earlyTime < tuesdayendValue)) {
        if (!(tuesdaystartValue > lateTime < tuesdayendValue)) {
          return (
            earlyTime > myOtherTime &&
            myOtherTime > tuesdaystartValue &&
            myTime < tuesdayendValue &&
            //this is not working
            lateTime > myTime &&
            currentDate.getTime() < selectedDate.getTime()
          );
        }
        return (
          earlyTime > myOtherTime &&
          myOtherTime > tuesdaystartValue &&
          myTime < tuesdayendValue &&
          currentDate.getTime() < selectedDate.getTime()
        );
      }
      if (!(tuesdaystartValue > lateTime < tuesdayendValue)) {
        return (
          myOtherTime > tuesdaystartValue &&
          myTime < tuesdayendValue &&
          //this is not working
          lateTime > myTime &&
          currentDate.getTime() < selectedDate.getTime()
        );
      }
      // if early time only is not within the tuesdaystartValue and tuesdayendValue then return this
      //if both late time and early time are not within the tuesdaystartValue and tuesdayendValue then return this
      return (
        myOtherTime > tuesdaystartValue &&
        myTime < tuesdayendValue &&
        currentDate.getTime() < selectedDate.getTime()
      );
    }
    if (wednesdayDates.includes(moment(selectedDate).format("dddd"))) {
      if (!(wednesdaystartValue > earlyTime < wednesdayendValue)) {
        if (!(wednesdaystartValue > lateTime < wednesdayendValue)) {
          return (
            // if both late time and early time are not within the wednesdaystartValue and wednesdayendValue then return this
            earlyTime > myOtherTime &&
            myOtherTime > wednesdaystartValue &&
            myTime < wednesdayendValue &&
            //this is not working
            lateTime > myTime &&
            currentDate.getTime() < selectedDate.getTime()
          );
        }
        return (
          //if early time is not within the wednesdaystartValue and wednesdayendValue then return this
          earlyTime > myOtherTime &&
          myOtherTime > wednesdaystartValue &&
          myTime < wednesdayendValue &&
          currentDate.getTime() < selectedDate.getTime()
        );
      }
      if (!(wednesdaystartValue > lateTime < wednesdayendValue)) {
        //if late time only is not within the wednesdaystartValue and wednesdayendValue then return this
        return (
          myOtherTime > wednesdaystartValue &&
          myTime < wednesdayendValue &&
          //this is not working
          lateTime > myTime &&
          currentDate.getTime() < selectedDate.getTime()
        );
      }
      return (
        myOtherTime > wednesdaystartValue &&
        myTime < wednesdayendValue &&
        currentDate.getTime() < selectedDate.getTime()
      );
    }
    if (thursdayDates.includes(moment(selectedDate).format("dddd"))) {
      if (!(thursdaystartValue > earlyTime < thursdayendValue)) {
        if (!(thursdaystartValue > lateTime < thursdayendValue)) {
          return (
            // if both late time and early time are not within the thursdaystartValue and thursdayendValue then return this
            earlyTime > myOtherTime &&
            myOtherTime > thursdaystartValue &&
            myTime < thursdayendValue &&
            //this is not working
            lateTime > myTime &&
            currentDate.getTime() < selectedDate.getTime()
          );
        }
        return (
          //if early time is not within the thursdaystartValue and thursdayendValue then return this
          earlyTime > myOtherTime &&
          myOtherTime > thursdaystartValue &&
          myTime < thursdayendValue &&
          currentDate.getTime() < selectedDate.getTime()
        );
      }
      if (!(thursdaystartValue > lateTime < thursdayendValue)) {
        //if late time only is not within the thursdaystartValue and thursdayendValue then return this
        return (
          myOtherTime > thursdaystartValue &&
          myTime < thursdayendValue &&
          //this is not working
          lateTime > myTime &&
          currentDate.getTime() < selectedDate.getTime()
        );
      }
      return (
        myOtherTime > thursdaystartValue &&
        myTime < thursdayendValue &&
        currentDate.getTime() < selectedDate.getTime()
      );
    }
    if (fridayDates.includes(moment(selectedDate).format("dddd"))) {
      if (!(fridaystartValue > earlyTime < fridayendValue)) {
        if (!(fridaystartValue > lateTime < fridayendValue)) {
          return (
            // if both late time and early time are not within the fridaystartValue and fridayendValue then return this
            earlyTime > myOtherTime &&
            myOtherTime > fridaystartValue &&
            myTime < fridayendValue &&
            //this is not working
            lateTime > myTime &&
            currentDate.getTime() < selectedDate.getTime()
          );
        }
        return (
          //if early time is not within the fridaystartValue and fridayendValue then return this
          earlyTime > myOtherTime &&
          myOtherTime > fridaystartValue &&
          myTime < fridayendValue &&
          currentDate.getTime() < selectedDate.getTime()
        );
      }
      if (!(fridaystartValue > lateTime < fridayendValue)) {
        //if late time only is not within the fridaystartValue and fridayendValue then return this
        return (
          myOtherTime > fridaystartValue &&
          myTime < fridayendValue &&
          //this is not working
          lateTime > myTime &&
          currentDate.getTime() < selectedDate.getTime()
        );
      }
      return (
        myOtherTime > fridaystartValue &&
        myTime < fridayendValue &&
        currentDate.getTime() < selectedDate.getTime()
      );
    }
    if (saturdayDates.includes(moment(selectedDate).format("dddd"))) {
      if (!(saturdaystartValue > earlyTime < saturdayendValue)) {
        if (!(saturdaystartValue > lateTime < saturdayendValue)) {
          return (
            // if both late time and early time are not within the saturdaystartValue and saturdayendValue then return this
            earlyTime > myOtherTime &&
            myOtherTime > saturdaystartValue &&
            myTime < saturdayendValue &&
            //this is not working
            lateTime > myTime &&
            currentDate.getTime() < selectedDate.getTime()
          );
        }
        return (
          //if early time is not within the saturdaystartValue and saturdayendValue then return this
          earlyTime > myOtherTime &&
          myOtherTime > saturdaystartValue &&
          myTime < saturdayendValue &&
          currentDate.getTime() < selectedDate.getTime()
        );
      }
      if (!(saturdaystartValue > lateTime < saturdayendValue)) {
        //if late time only is not within the saturdaystartValue and saturdayendValue then return this
        return (
          myOtherTime > saturdaystartValue &&
          myTime < saturdayendValue &&
          //this is not working
          lateTime > myTime &&
          currentDate.getTime() < selectedDate.getTime()
        );
      }
      return (
        myOtherTime > saturdaystartValue &&
        myTime < saturdayendValue &&
        currentDate.getTime() < selectedDate.getTime()
      );
    }
    if (sundayDates.includes(moment(selectedDate).format("dddd"))) {
      if (!(sundaystartValue > earlyTime < sundayendValue)) {
        if (!(sundaystartValue > lateTime < sundayendValue)) {
          // if both late time and early time are not within the sundaystartValue and sundayendValue then return this
          return (
            earlyTime > myOtherTime &&
            myOtherTime > sundaystartValue &&
            myTime < sundayendValue &&
            //this is not working
            lateTime > myTime &&
            currentDate.getTime() < selectedDate.getTime()
          );
        }
        return (
          //if early time is not within the sundaystartValue and sundayendValue then return this
          earlyTime > myOtherTime &&
          myOtherTime > sundaystartValue &&
          myTime < sundayendValue &&
          currentDate.getTime() < selectedDate.getTime()
        );
      }
      if (!(sundaystartValue > lateTime < sundayendValue)) {
        //if late time only is not within the sundaystartValue and sundayendValue then return this
        return (
          myOtherTime > sundaystartValue &&
          myTime < sundayendValue &&
          //this is not working
          lateTime > myTime &&
          currentDate.getTime() < selectedDate.getTime()
        );
      }
      return (
        myOtherTime > sundaystartValue &&
        myTime < sundayendValue &&
        currentDate.getTime() < selectedDate.getTime()
      );
    }
    // I need to create a start and end time for the additional days
    if (additionaldays.includes(moment(selectedDate).format("dddd"))) {
      if (!(additionaldaysValue > earlyTime < additionaldaysValue)) {
        if (!(additionaldaysValue > lateTime < additionaldaysValue)) {
          // if both late time and early time are not within the additionaldaysValue and additionaldaysValue then return this
          return (
            earlyTime > myOtherTime &&
            myOtherTime > additionaldaysValue &&
            myTime < additionaldaysValue &&
            //this is not working
            lateTime > myTime &&
            currentDate.getTime() < selectedDate.getTime()
          );
        }
        return (
          //if early time is not within the additionaldaysValue and additionaldaysValue then return this
          earlyTime > myOtherTime &&
          myOtherTime > additionaldaysValue &&
          myTime < additionaldaysValue &&
          currentDate.getTime() < selectedDate.getTime()
        );
      }
      if (!(additionaldaysValue > lateTime < additionaldaysValue)) {
        //if late time only is not within the additionaldaysValue and additionaldaysValue then return this
        return (
          myOtherTime > additionaldaysValue &&
          myTime < additionaldaysValue &&
          //this is not working
          lateTime > myTime &&
          currentDate.getTime() < selectedDate.getTime()
        );
      }
      return (
        myOtherTime > additionaldaysValue &&
        myTime < additionaldaysValue &&
        currentDate.getTime() < selectedDate.getTime()
      );
    }
    return currentDate.getTime() < selectedDate.getTime();
  };

  const excludeTimes = () => {};

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
    if (googleEmail === attendees) {
      alert(
        "You cannot book yourself. Please enter a different email address."
      );
      return;
    }
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
    let booked = event.start.dateTime;
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
        console.log(data.conferenceData, data);
        // create a booked event in the database
        alert(
          `Event created, check your Google Calendar! For further questions email ${email}`
        );
      });
    await fetch("/api/booked", {
      method: "PATCH",
      headers: {
        "Content-Type": "text/html ",
      },
      body: JSON.stringify({ booked, bookings, googleEmail, event }),
      followRedirect: true,
    })
      .then((data) => {
        return data;
      })
      .then((data) => {
        console.log(data);
        console.log(data.url);
        //redirect to confirmation page
        location.href = data.url;
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
              <DatePicker
                selected={start}
                onChange={(date) => setStart(date)}
                showTimeSelect
                inline
                timeIntervals={length}
                //not working yet
                highlightDates={new Date()}
                filterTime={filterPassedTime}
                includeDates={datesIncluded}
                excludeTimes={bookings.getTime()}
                dateFormat="MMMM d, yyyy h:mmaa"
                minDate={new Date()}
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
