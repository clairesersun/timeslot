// import { getUser } from '../../utils/getUser';
'use client'

import { useSession } from 'next-auth/react';
import SignIn from '../signin/page';
import Image from 'next/image';

// export const metadata = {
//   title: 'Profile',
//   description: 'Profile page for the scheduling app',
//   keywords: 'scheduling app'
// }
export default async function Profile() {
  const {data: session, status} =  useSession({
  required: true,
  onUnauthenticated: () => { 
    console.log('not signed in')}
})
console.log(session, status)
console.log(session.user.email) //user this to check if itss in the database and if not create account
if (status === "authenticated") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
  
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          
        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
          
            <p className={`mb-3 text-2xl font-semibold`}>
              Name: {session.user.name}
            </p>
            <p className={`mb-3 text-2xl font-semibold`}>
              Email: {session.user.email}
            </p>
            <Image src={session.user.image} alt="Profile photo" width="200" height="200" className={`mb-3 text-2xl font-semibold`} />
             
  
          </div>
        </div>
      </main>
    )
  }
  else return <SignIn /> 
  
}

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