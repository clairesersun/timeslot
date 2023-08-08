import SignIn from '../components/signin';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { Suspense } from 'react';
import  DeleteAccount  from '../../app/components/deleteData';
import { revalidatePath } from 'next/cache';


export const metadata = {
    title: 'Profile',
    description: 'Profile page for the scheduling app',
    keywords: 'scheduling app'
  }
  
  async function createProfile(data: FormData) {
    'use server'
    const { MongoClient } = require("mongodb");
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
      const name = data.get('visibleName')?.valueOf()
      
      if (typeof name !== 'string' || name.length === 0) {
        throw new Error ('Name is required')
      }
      const email = data.get('email')
      if (typeof email !== 'string' || email.length === 0) {
        throw new Error ('Email is required')
      }
      const businessName = data.get('businessName')
      if (typeof businessName !== 'string' || businessName.length === 0) {
        throw new Error ('Business Name is required')
      }
      
      const session = await getServerSession(authOptions)
      const googleEmail = session['user'].email
      
      const dbName = "users";
      await client.connect();
      console.log("Connected correctly to server");
      const db = client.db(dbName);
      let collection = db.collection("users");
      const users = await collection.findOne({ email: googleEmail })
      // console.log(users._id)
      const userId = users._id
      //this allows me to take the userId to find the access_token from sessions later down the road
      collection = db.collection("savedInfo");
      // Insert a single document, wait for promise so we can read it back
      const myDoc = await collection.findOne({ googleEmail:  googleEmail });
      let booked
      let colorOne
      let colorTwo
      let colorThree
      let colorFour
      let website
      //check if user already exists in database, if so you will update the info, if not you will add the info to the database
      if (myDoc) {
          colorOne = '#2b536a'
          colorTwo = '#52a288'
          colorThree = '#a4cca9'
          colorFour = '#c4dedf'
          website = ''
          booked = ["not booked"]
          if (myDoc.booked){
            booked = myDoc.booked
          }
          if (myDoc.design){
            colorOne = myDoc.design.colorOne
            colorTwo = myDoc.design.colorTwo
            colorThree = myDoc.design.colorThree
            colorFour = myDoc.design.colorFour
            website = myDoc.design.website
          }
        const updateInfo = await collection.updateOne({ googleEmail: googleEmail }, {$set: {name, email, businessName, booked, 
          design: { colorOne, colorTwo, colorThree, colorFour, website 
        }}});
        return console.log("updated info in database: ", name, email, businessName, googleEmail, userId, booked, colorOne, colorTwo, colorThree, colorFour, website 
      )
        
      }
      colorOne = '#2b536a'
          colorTwo = '#52a288'
          colorThree = '#a4cca9'
          colorFour = '#c4dedf'
          website = ''
      booked = ["not booked"]
      const newInfo = await collection.insertOne({name, email, businessName, googleEmail, userId, booked, 
        design: { colorOne, colorTwo, colorThree, colorFour, website 
      }});
      return console.log("added info in database: ", name, email, businessName, googleEmail, userId, booked, colorOne, colorTwo, colorThree, colorFour, website )
      
    } catch (error) {
      console.log(error)
    }
    finally {
      // Ensures that the client will close when you finish/error and update information on the page
      revalidatePath('/profile')
      revalidatePath('/')
      revalidatePath("/[user]/[event]")
      await client.close();
    }
  }
  
  
  
  export default async function Profile() {
    const dbName = "users";
    const session = await getServerSession(authOptions)
    if (!session) {
      return <SignIn /> }
      // console.log(session)
      const { MongoClient } = require("mongodb");
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      console.log("Connected correctly to server");
      const db = client.db(dbName);
      //this allows me to take the userId to find the access_token from sessions later down the road
      let collection = db.collection("savedInfo");
      // Insert a single document, wait for promise so we can read it back
      const currentUserInfo = await collection.findOne({ googleEmail:  session['user'].email });
      // console.log(currentUserInfo)
      if (currentUserInfo === null) {
        const visibleName = "not set"
        const email = "not set"
        const businessName = "not set"
        return (
          <main className='profile-main-container'>
<div className='profile-given-container'>

          
        <h2 className='text-bold profile-title change-position'>
          Profile
          </h2>
            <Suspense fallback={<div>Loading...</div>}>
              <div className='profile-box grid-1 change-position'>

            <h4 className={`text-bold profile-text-margin-top profile-text-align`}>
              Business Name:
            </h4>
            <p className={`text-regular profile-text-align`}>
              {businessName}
            </p>
              </div>
              <div className='profile-divider-dark change-position'></div>
              <div className='profile-box grid-1 change-position'>
            <h4 className={`text-bold profile-text-align profile-text-margin-top`}>
              Visible Name:
            </h4>
            <p className={`text-regular profile-text-align`}>
              {visibleName}
            </p>
            <h4 className={`text-bold profile-text-align profile-text-margin-top`}>
              Visible Email:
            </h4>
            <p className={`text-regular profile-text-align`}>
              {email}
            </p>
            </div>
            <div className='profile-divider-dark-2 change-position'></div>
            <Image src=
            {session['user'].image} alt="Profile photo" width="75" height="75" className='profile-photo'/>
            <div>
            <div className='profile-box grid-1'>
            <h4 className={`text-bold profile-text-margin-top-large profile-text-align`}>
              Google Account Name:
            </h4>
            <p className={`text-regular profile-text-align`}>
            {session['user'].name}
            </p>
            <h4 className={`text-bold profile-text-align profile-text-margin-top`}>
              Google Account Email:
            </h4>
            <p className={`text-regular profile-text-align`}>
            {session['user'].email}
            </p>
            </div>
            </div>
            
            </Suspense>
            </div>

            <form action={createProfile} id='profile-form' className="edit-profile-form grid-1 justify-center">
          <p className='edit-profile text-bold'> Edit</p>
            <div className='profile-box grid-1'>
          <label htmlFor="businessName" className='text-bold profile-label'>Business Name:</label>
          <input type="text" name='businessName' id='businessName' className='input-box-profile'/>
          </div>
          <div className='profile-divider-light'></div>
          <div className='profile-box grid-1'>
          <label htmlFor="visibleName" className='text-bold profile-label' >Visible Name:</label> 
          <input type="text" name="visibleName" id="visibleName" className='input-box-profile'/>
          <label htmlFor="email" className='text-bold profile-label'>Visible Email:</label>
          <input type="text" name='email' id='email' className='input-box-profile'/>
          </div>
          

          <DeleteAccount />
          <button type='submit' className='submit-profile-btn text-bold'>Submit</button>
          
          </form>
          
          <div className='bottom-of-page'></div>
      </main>
        )
      
      } else { 
        const userId = currentUserInfo.userId
        const visibleName = currentUserInfo.name
        const email = currentUserInfo.email 
        const businessName = currentUserInfo.businessName
        const googleEmail = currentUserInfo.googleEmail
        
        
       
    return (
      <main className='profile-main-container'>
  
          <div className='profile-given-container'>

        <h2 className='text-bold profile-title change-position'>
          Profile
          </h2>
            <Suspense fallback={<div>Loading...</div>}>
            <div className='profile-box grid-1 change-position'>

            <h4 className={`text-bold profile-text-margin-top profile-text-align`}>
              Business Name:
            </h4>
            <p className={`text-regular profile-text-align`}>
              {businessName}
            </p>
              </div>
              <div className='profile-divider-dark change-position'></div>
              <div className='profile-box grid-1 change-position'>
            <h4 className={`text-bold profile-text-align profile-text-margin-top`}>
              Visible Name:
            </h4>
            <p className={`text-regular profile-text-align`}>
              {visibleName}
            </p>
            <h4 className={`text-bold profile-text-align profile-text-margin-top`}>
              Visible Email:
            </h4>
            <p className={`text-regular profile-text-align`}>
              {email}
            </p>
            </div>
            <div className='profile-divider-dark-2 change-position'></div>
            <Image src=
            {session['user'].image} alt="Profile photo" width="75" height="75" className='profile-photo'/>
            <div>
            <div className='profile-box grid-1'>
            <h4 className={`text-bold profile-text-margin-top-large profile-text-align`}>
              Google Account Name:
            </h4>
            <p className={`text-regular profile-text-align`}>
            {session['user'].name}
            </p>
            <h4 className={`text-bold profile-text-align profile-text-margin-top`}>
              Google Account Email:
            </h4>
            <p className={`text-regular profile-text-align`}>
            {session['user'].email}
            </p>
            </div>
            </div>
            
            </Suspense>
            </div>

         

          <form action={createProfile} id='profile-form' className="edit-profile-form grid-1 justify-center">
          <p className='edit-profile text-bold'> Edit</p>
            <div className='profile-box grid-1'>
          <label htmlFor="businessName" className='text-bold profile-label'>Business Name:</label>
          <input type="text" name='businessName' id='businessName' className='input-box-profile'/>
          </div>
          <div className='profile-divider-light'></div>
          <div className='profile-box grid-1'>
          <label htmlFor="visibleName" className='text-bold profile-label' >Visible Name:</label> 
          <input type="text" name="visibleName" id="visibleName" className='input-box-profile'/>
          <label htmlFor="email" className='text-bold profile-label'>Visible Email:</label>
          <input type="text" name='email' id='email' className='input-box-profile'/>
          </div>
          

          <DeleteAccount />
          <button type='submit' className='submit-profile-btn text-bold'>Submit</button>
          
          </form>
          
          <div className='bottom-of-page'></div>
      </main>
    )
  }}
  