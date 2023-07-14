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
        console.log(data);
        console.log(data.url);
        //redirect to confirmation page
        location.href = data.url;
      });
  } else {
    return console.log("did not delete account")
  }}

export default function DeleteAccount() {
    return (
      <button onClick={() => deleteProfile()} className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
        Delete Account </button>   
    )}

    
    