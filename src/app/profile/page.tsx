import SignIn from '../components/signin';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { Suspense } from 'react';
import  DeleteAccount  from '../../app/components/deleteData';


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
      const googleEmail = session.user.email
      
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
      //check if user already exists in database, if so you will update the info, if not you will add the info to the database
      if (myDoc) {
        const updateInfo = await collection.updateOne({ googleEmail: googleEmail }, {$set: {name, email, businessName}});
        console.log("updated info in database: ", name, email, businessName, googleEmail, userId)
        alert("Updated!")
        return location.reload()
      
    }
        
        const newInfo = await collection.insertOne({name, email, businessName, googleEmail, userId});
        
          
          alert("Updated!")
          console.log("added info in database: ", name, email, businessName, googleEmail, userId)
          return location.reload()
          
    } catch (error) {
      console.log(error)
    }
    finally {
      await client.close();
  }
    }
    

 
    export default async function Profile() {
      const dbName = "users";
      const session = await getServerSession(authOptions)
      if (!session) {
        return <SignIn /> }
      const { MongoClient } = require("mongodb");
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      console.log("Connected correctly to server");
      const db = client.db(dbName);
      //this allows me to take the userId to find the access_token from sessions later down the road
      let collection = db.collection("savedInfo");
      // Insert a single document, wait for promise so we can read it back
      const currentUserInfo = await collection.findOne({ googleEmail:  session.user.email });
      console.log(currentUserInfo)
      if (currentUserInfo === null) {
        const visibleName = "not set"
        const email = "not set"
        const businessName = "not set"
        return (
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
            <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
              
            <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
                <Suspense fallback={<div>Loading...</div>}>
                <p className={`mb-3 text-2xl font-semibold`}>
                  Name:
                </p>
                <p className={`mb-3 text-1xl font-semibold`}>
                  {visibleName}
                </p>
                <p className={`mb-3 text-2xl font-semibold`}>
                  Other Email:
                </p>
                <p className={`mb-3 text-1xl font-semibold`}>
                  {email}
                </p>
                <p className={`mb-3 text-2xl font-semibold`}>
                  Business Name:
                </p>
                <p className={`mb-3 text-1xl font-semibold`}>
                  {businessName}
                </p>
    
                <p className={`mb-3 text-2xl font-semibold`}>
                  Google Account Name:
                </p>
                <p className={`mb-3 text-1xl font-semibold`}>
                {session.user.name}
                </p>
                <p className={`mb-3 text-2xl font-semibold`}>
                  Google Account:
                </p>
                <p className={`mb-3 text-1xl font-semibold`}>
                {session.user.email}
                </p>
                <Image src=
                {session.user.image} alt="Profile photo" width="100" height="100" className={`mb-3 text-2xl font-semibold`} />
                </Suspense>
              <p className={`mb-3 text-2xl font-semibold`}> Edit Profile: </p>
              <form action={createProfile} id='profile-form' className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
              <label htmlFor="visibleName" >Name:</label> 
              <input type="text" name="visibleName" id="visibleName" />
              <label htmlFor="email">Email:</label>
              <input type="text" name='email' id='email' />
              <label htmlFor="businessName">Business Name:</label>
              <input type="text" name='businessName' id='businessName' />
              <button type='submit'>Submit</button>
              </form>
              {/* {deleteAccount()} */}
              {/* figure out how to do a pop up delete btn */}
              </div>
            </div>
          </main>
        )
      
      } else { 
        const visibleName = currentUserInfo.name
        const email = currentUserInfo.email 
        const businessName = currentUserInfo.businessName
        
        
       
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
  
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          
        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
            <Suspense fallback={<div>Loading...</div>}>
            <p className={`mb-3 text-2xl font-semibold`}>
              Name:
            </p>
            <p className={`mb-3 text-1xl font-semibold`}>
              {visibleName}
            </p>
            <p className={`mb-3 text-2xl font-semibold`}>
              Other Email:
            </p>
            <p className={`mb-3 text-1xl font-semibold`}>
              {email}
            </p>
            <p className={`mb-3 text-2xl font-semibold`}>
              Business Name:
            </p>
            <p className={`mb-3 text-1xl font-semibold`}>
              {businessName}
            </p>

            <p className={`mb-3 text-2xl font-semibold`}>
              Google Account Name:
            </p>
            <p className={`mb-3 text-1xl font-semibold`}>
            {session.user.name}
            </p>
            <p className={`mb-3 text-2xl font-semibold`}>
              Google Account:
            </p>
            <p className={`mb-3 text-1xl font-semibold`}>
            {session.user.email}
            </p>
            <Image src=
            {session.user.image} alt="Profile photo" width="100" height="100" className={`mb-3 text-2xl font-semibold`} />
            </Suspense>
          <p className={`mb-3 text-2xl font-semibold`}> Edit Profile: </p>
          <form action={createProfile} id='profile-form' className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
          <label htmlFor="visibleName" >Name:</label> 
          <input type="text" name="visibleName" id="visibleName" />
          <label htmlFor="email">Email:</label>
          <input type="text" name='email' id='email' />
          <label htmlFor="businessName">Business Name:</label>
          <input type="text" name='businessName' id='businessName' />
          <button type='submit'>Submit</button>
          </form>
          <DeleteAccount />
          {/* figure out how to do a pop up delete btn */}
          </div>
        </div>
      </main>
    )
  }}
  
// }

  // for data iften changing, when you fetch do this:
  // const response = await fetch(
    // 'link', {
  //      next: {
  //        revalidate: 60
  //   }
  // }) 
  
  // for apis either do w/in the pages or api/page/route.js then do export async function GET(response) {
  //   return new Response('hello')
  // }

  // to pull info from your json in api use NextResponse from import { NextResponse } from "next/server"
  // then use it in component to fetch from link
  // in component await fetch from the api you created

  //to get a query within your get request use const { searchParams } = new URL(request.url)
  // const query = searchParams.get('query')

  //to post use request.json() to get the body of the request
  // uuid creates random id
  // import {v4 as uuid} from 'uuid'
  //use this when creating a new post