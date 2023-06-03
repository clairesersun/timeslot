'use client'

import { useSession } from 'next-auth/react';
import SignIn from '../components/signin';

export default function Events(){
  const {data: session, status} =  useSession({
    required: true,
    onUnauthenticated: () => { 
      console.log('not signed in')}
  })
  console.log(session, status)
  if (status === "authenticated") {
    return (
        console.log(session, status),
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
    
          <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
            
          <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
            
              <h1 className={`mb-3 text-2xl font-semibold`}>
                Events
                
              </h1>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Name: {session.user.name}
              </p>
            
    
            </div>
          </div>
        </main>
      )
  }

  else return <SignIn /> 
  
}


