// import { getUser } from '../../utils/getUser';

export const metadata = {
  title: 'Trial Claire Sersun',
  description: 'Start of my app',
  keywords: 'scheduling app'
}
export default async function Trial() {
  // const user = await getUser(id);
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
  
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          
        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
          
            <h2 className={`mb-3 text-2xl font-semibold`}>
              working? YES!{' '}
              
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Coming soon!
            </p>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              By Claire Sersun
            </p>
  
          </div>
        </div>
      </main>
    )
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