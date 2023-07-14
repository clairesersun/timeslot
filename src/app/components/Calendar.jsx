"use client";

//I DO NOT HAVE GOOGLE ACCESS TO DO THIS YET -- FIGURE OUT WITH GOOGLE HOW TO DO THIS

// import { useState } from "react";
// import DateTimePicker from "react-datetime-picker";
import { subMinutes } from "date-fns";
import moment, { min } from "moment";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { format } from "path";

export default function Calendar(props) {
  const date = new Date();
  const [start, setStart] = useState(new Date());
  // const [start, setStart] = useState(setHours(setMinutes(date, 0), 9));
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

  const getTimeConstraints = () => {
    return {
      minutes: { min: 0, max: 59, step: +length },
    };
  };

  var yesterday = moment().subtract(1, "day");
  var valid = function (current, selected) {
    //get ddays from database and any that are not available do not show
    // const customdatesTimes = bookings;
    // console.log(customdatesTimes.map((item) => item.booked));
    // const customDates = ["2021-09-15", "2021-09-16"];
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
    return current.isAfter(yesterday);
    // &&
    // additionaldaysValue &&
    // saturday &&
    // sunday &&
    // monday &&
    // tuesday &&
    // wednesday &&
    // thursday &&
    // friday
    // &&
    // !customdatesTimes &&
    // !customTimes.includes(current.format("HH:mm")) //can't select days before today
    // !customDates.includes(current.format("YYYY-MM-DD")) &&
    // &&
  };

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
      // console.log(nextSunday._d);
      datesIncluded.push(nextSunday._d);
      // console.log(i);
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

  // const filterDays = [];
  // const day = getDay(date);
  // day != 1;
  // filterDays.push(day);
  // console.log(filterDays);
  // filterDays.push(yesterday);

  const weekend = (date) => new Date() < date;

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    const selectedTime = moment(selectedDate).format("HH:mm");

    //this is not working past July 17th... why??? because it is turning it into a mm/dd/yyyy format after july 17th

    function addMinutes(date, minutes) {
      date.setMinutes(date.getMinutes() + minutes);

      return date;
    }

    const date = selectedDate;
    //add length from this time
    const newDate = addMinutes(date, +length);
    let minutes = newDate.getMinutes();
    let hours = newDate.getHours();

    if (minutes === 0) {
      minutes = "00";
    }

    let myTime = hours + ":" + minutes;

    // console.log(myTime);
    // console.log(date);

    //add length from this time
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

    //why is 9:40 am & 11:40pm showing up in every available date?
    if (mondayDates.includes(moment(selectedDate).format("dddd"))) {
      let earlyTime = 9 + ":" + 40;
      if (!(mondaystartValue > earlyTime < mondayendValue)) {
        console.log("this is working");
      }
      let lateTime = 23 + ":" + 40;
      if (!(mondaystartValue > lateTime < mondayendValue)) {
        console.log("this is working v2");
      }
      return (
        //this gets rid of the 9:40am -- move it to conditional statement above and then move the late time to inside AND do another one outside of the conditional statement
        earlyTime > myOtherTime &&
        myOtherTime > mondaystartValue &&
        myTime < mondayendValue &&
        // myTime < lateTime &&
        // lateTime < selectedDate.getTime() &&
        // lateTime > mondayendValue &&
        // mondayendValue > lateTime &&
        currentDate.getTime() < selectedDate.getTime()
      );
    }
    if (tuesdayDates.includes(moment(selectedDate).format("dddd"))) {
      return (
        myOtherTime > tuesdaystartValue &&
        myTime < tuesdayendValue &&
        currentDate.getTime() < selectedDate.getTime()
      );
    }
    if (wednesdayDates.includes(moment(selectedDate).format("dddd"))) {
      return (
        myOtherTime > wednesdaystartValue &&
        myTime < wednesdayendValue &&
        currentDate.getTime() < selectedDate.getTime()
      );
    }
    if (thursdayDates.includes(moment(selectedDate).format("dddd"))) {
      // console.log(myOtherTime, thursdaystartValue, myTime, thursdayendValue);
      return (
        myOtherTime > thursdaystartValue &&
        myTime < thursdayendValue &&
        currentDate.getTime() < selectedDate.getTime()
      );
    }
    if (fridayDates.includes(moment(selectedDate).format("dddd"))) {
      return (
        myOtherTime > fridaystartValue &&
        myTime < fridayendValue &&
        currentDate.getTime() < selectedDate.getTime()
      );
    }
    if (saturdayDates.includes(moment(selectedDate).format("dddd"))) {
      return (
        myOtherTime > saturdaystartValue &&
        myTime < saturdayendValue &&
        currentDate.getTime() < selectedDate.getTime()
      );
    }
    if (sundayDates.includes(moment(selectedDate).format("dddd"))) {
      return (
        myOtherTime > sundaystartValue &&
        myTime < sundayendValue &&
        currentDate.getTime() < selectedDate.getTime()
      );
    }
    if (additionaldays.includes(moment(selectedDate).format("dddd"))) {
      return (
        myOtherTime > additionaldaysValue &&
        myTime < additionaldaysValue &&
        currentDate.getTime() < selectedDate.getTime()
      );
    }
    return currentDate.getTime() < selectedDate.getTime();
  };

  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
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
    if (googleEmail === attendees) {
      alert(
        "You cannot book yourself. Please enter a different email address."
      );
      return;
    }
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
    let booked = event.start.dateTime;
    // console.log(booked);
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
              {/* <Datetime
                style={{
                  margin: "10px",
                  color: "black",
                }}
                isValidDate={valid}
                onChange={() => setStart()}
                timeConstraints={getTimeConstraints}
                value={start}
                selected={start}
              /> */}

              <DatePicker
                selected={start}
                onChange={(date) => setStart(date)}
                showTimeSelect
                inline
                timeIntervals={length}
                // withPortal
                // filterTime={(time) => {
                //   //not working yet
                //   if (date.getDay() === 0) {
                //     return (
                //       time >= new Date(0, 0, 0, 12, 30) &&
                //       time <= new Date(0, 0, 0, 19, 0)
                //     );
                //   } else {
                //     time >= new Date(0, 0, 0, 9, 0) &&
                //       time <= new Date(0, 0, 0, 19, 0);
                //   }
                // }}
                // minTime={new Date(0, 0, 0, 12, 30)}
                // maxTime={new Date(0, 0, 0, 19, 0)}
                //not working yet
                highlightDates={new Date()}
                filterTime={filterPassedTime}
                // filterDate={isWeekday}
                includeDates={datesIncluded}
                // excludeDates={filterDays}
                dateFormat="MMMM d, yyyy h:mmaa"
                minDate={new Date()}
                //this max date is 7 days from now
                // maxDate={new Date().setDate(new Date().getDate() + 7)}
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
