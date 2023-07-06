//Server Protected Route
// import { getServerSession } from "next-auth/react"
// import { redirect } from "next/dist/server/api-utils"
// export default async function ServerProtectedPage() {
//   const session  = await getServerSession(authOptions)

//   if (!session) {
//     redirect('/signin?callbackUrl=/server-protected-page')}
//     return (
//       this is where the page contents go
//     )
// }


import { getServerSession } from "next-auth/react"
import { NextResponse } from "next/server"
// import { authOptions } from "src/app/api/auth/[...nextauth]/route"

export async function GET() {
  const session  = await getServerSession

  if (!session) {
    return NextResponse.json({ message: 'you are not logged in' })
}
    return (
      NextResponse.json({ message: session.user.name + ', you are logged in'})
    )
 }
