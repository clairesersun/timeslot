export default function deleteAccount() {
    
    async function deletingAccount() {
    'use server'
    const { MongoClient } = require("mongodb");
            const client = new MongoClient(process.env.MONGODB_URI);
            try {
              const session = await getServerSession(authOptions)
              const googleEmail = session.user.email
              
              const dbName = "users";
              await client.connect();
              console.log("Connected correctly to server");
              const db = client.db(dbName);
              let collection = db.collection("users");
              //delete the single instance of the user from the users collection
              const users = await collection.deleteOne({ email: googleEmail })
              return console.log("deleted info from database")
            } catch (error) {
              console.log(error)
            }
            finally {
              await client.close();
          }
          }
  
  
    async function deleteAccountPopUp(e) {
      'use server'
      e.preventDefault()
    if (confirm("Press a button!")) {
        deletingAccount()
    } else {
      return console.log("did not delete account")
    }
    
    }

    return (
        <button onClick={deleteAccountPopUp}>Delete Account </button>
    )
        
    }