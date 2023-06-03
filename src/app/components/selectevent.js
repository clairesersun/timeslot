"use client"
export default function SelectEvent() {
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [attendees, setAttendees] = useState("");
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