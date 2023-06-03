// import { getUser } from '../../utils/getUser';
// 'use client'

// import { useSession } from 'next-auth/react';
import SignIn from '../components/signin';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
// import { useState } from 'react';
// import useSWR from 'swr';
// import addData from '../components/addData';

// export const metadata = {
  //   title: 'Profile',
  //   description: 'Profile page for the scheduling app',
  //   keywords: 'scheduling app'
  // }
  
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
      if (myDoc) {
        const updateInfo = await collection.updateOne({ googleEmail: googleEmail }, {$set: {name, email, businessName}});
        return console.log("updated info in database: ", name, email, businessName, googleEmail, userId)}
        //   let colllection = db.collection("users");
        //   const users = await colllection.find({ email: { googleEmail } });
        //   if (users){
          //     let colllection = db.collection("savedInfo");
          //     await colllection.updateOne({ email: { googleEmail } }, {$set: {userId: users._id}});
          //   } else { throw new Error ('User does not exist')}
          //   // colllection = db.collection("savedInfo");
          //   // const p = await colllection.insertOne({googleInfo: users._id});
          //   // throw new Error ('Info already exists')
          // } else {
            // colllection = db.collection("savedInfo");
            const newInfo = await collection.insertOne({name, email, businessName, googleEmail, userId});
      // Find one document
      // Print to the console
      // console.log(myDoc);
      
      return console.log("added info in database: ", name, email, businessName, googleEmail, userId)
      // .then(async (client) => {})
      // db.collection('users').insertOne({})
      
    } catch (error) {
      console.log(error)
    }
    finally {
      await client.close();
  }
    }
    
    export default async function Profile() {
  // const [
  //   { visibleName, email, businessName },
  //   setForm,
  // ] = useState({
  //   visibleName: "",
  //   email: "",
  //   businessName: "",
  // });
  // const [visibleName, setVisibleName] = useState("");
  // const [email, setEmail] = useState("");
  // const [businessName, setBusinessName] = useState("");
  const session = await getServerSession(authOptions)

  if (!session) {
    return <SignIn /> }
//   const {data: session, status} =  useSession({
//   required: true,
//   onUnauthenticated: () => { 
//     console.log('not signed in')}
// })

// console.log(visibleName, email, businessName)

// const handleChange = (e) => {
//   e.preventDefault();
//   setForm({
//     visibleName, 
//     email, 
//     businessName,
//     ...{ [e.target.name]: e.target.value},
//   });
// }
// const { data, error, isLoading } = useSWR('/api/auth', fetch('/api/auth'))
// console.log(data)

// const data = {session}


// const loggedIn = async (data) => {
  //   const response = await fetch('/api/auth/user', {
    //     method: 'GET',
    //     headers: { 'content-type': 'application/json' },
    //     body: JSON.stringify(data)
    
    //   })
    //   return response;
    // }
    // console.log(loggedIn())
    
    // console.log(session, status)
    // console.log(session.user.id) //user this to check if itss in the database and if not create account
    
    // const form = new FormData(document.getElementById("profile-form"));
    // fetch("/auth/user", {
    //   method: "POST",
    //   body: form,
    // });

//     const handleSubmit = (e) => {
//       e.preventDefault()
//       addData(colllection, id, data)
// }

// if (status === "authenticated") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
  
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          
        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
            
            <p className={`mb-3 text-2xl font-semibold`}>
              Name: 
              {/* {visibleName} */}
            </p>
            <p className={`mb-3 text-2xl font-semibold`}>
              Other Email: 
              {/* {email} */}
            </p>
            <p className={`mb-3 text-2xl font-semibold`}>
              Business Name: 
              {/* {businessName} */}
            </p>

            <p className={`mb-3 text-2xl font-semibold`}>
              Google Account Name: {session.user.name}
            </p>
            <p className={`mb-3 text-2xl font-semibold`}>
              Google Account: {session.user.email}
            </p>
            <Image src=
            {session.user.image} alt="Profile photo" width="100" height="100" className={`mb-3 text-2xl font-semibold`} />

          <form action={createProfile} id='profile-form' className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
          <label htmlFor="visibleName" >Name:</label> 
          <input type="text" name="visibleName" id="visibleName" />
          <label htmlFor="email">Email:</label>
          <input type="text" name='email' id='email' />
          <label htmlFor="businessName">Business Name:</label>
          <input type="text" name='businessName' id='businessName' />
          <button type='submit'>Submit</button>
          </form>
          {/* <form id='profile-form' className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
          <label htmlFor="visibleName" >Name:</label> 
          <input type="text" name="visibleName" id="visibleName" onChange={handleChange} value={visibleName}/>
          <label htmlFor="email">Email:</label>
          <input type="text" name='email' id='email' onChange={handleChange} value={email}/>
          <label htmlFor="businessName">Business Name:</label>
          <input type="text" name='businessName' id='businessName' onChange={handleChange} value={businessName}/>
          <button onClick={() => handleSubmit}>Submit</button>
          </form> */}
          </div>
        </div>
      </main>
    )
  }
  
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