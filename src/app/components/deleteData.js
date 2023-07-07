"use client"
// import Deleting from "./deleting"



async function deleteProfile() {
  debugger
  //how to get this to only happen when the button is clicked?
  if (confirm("Are you sure you want to delete?")) {
   
    //this cannot be done on the client side! how to fix?
    // Deleting()
  } else {
    return console.log("did not delete account")
  }}

export default function DeleteAccount() {



    return (
      <button onClick={() => deleteProfile()} className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
        Delete Account </button>
        
    )
        
    }

    
    