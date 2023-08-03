"use client"



async function deleteProfile() {

  //only delete if user confirms
  if (confirm("Are you sure you want to delete? This cannot be undone.")) {
   
    await fetch("/api/profile", {
      method: "DELETE",
      headers: {
        "Content-Type": "text/html ",
      },
      followRedirect: true,
    })
      .then((data) => {
        return data;
      })
      .then((data) => {
        // console.log(data);
        // console.log(data.url);
        //redirect to confirmation page
        location.href = data.url;
      });
  } else {
    return console.log("did not delete account")
  }}

export default function DeleteAccount() {
    return (
      <button onClick={() => deleteProfile()} className="delete-profile-btn text-bold">
        Delete Account </button>   
    )}

    async function deleteCreatedEvent(slug) {
      // console.log(slug)

      //only delete if user confirms
      if (confirm("Are you sure you want to delete? This cannot be undone.")) {
       
        await fetch("/api/event", {
          method: "DELETE",
          headers: {
            "Content-Type": "text/html ",
            "slug": slug
          },
          followRedirect: true,
        })
          .then((data) => {
            return data;
          })
          .then((data) => {
            // console.log(data);
            // console.log(data.url);
            //redirect to confirmation page
            location.href = data.url;
          });
      } else {
        return console.log("did not delete event")
      }}
    
    export function DeleteEvent(props) {
      let slug = props.slug
      // console.log(slug)
        return (
          <button onClick={() => deleteCreatedEvent(slug)} className="delete-profile-btn text-bold">
            Delete Event </button>   
        )}
    
    