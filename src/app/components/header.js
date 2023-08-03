"use client"
import Link from "next/link";
import { signOut } from "next-auth/react";
import Img from 'next/image'
import { useSession } from "next-auth/react";


export default async function Header() {
    const { data: session, status } = useSession()
  if (status === "unauthenticated") {
    //does this work?
    return (
        <header className="header">
        <Link href="/"><Img src="/../public/logo_inverse.png" alt="logo" width={200} height={40} className="logo"/></Link>
    </header>
)
  }
    return (
        <header className="header">
            <div className="grid-2">
        <Link href="/"><Img src="/../public/logo_inverse.png" alt="logo" width={200} height={40} className="logo"/></Link>
        <button onClick={() => signOut()} className="signout"><Img src="/../public/shutdown.png" alt="sign out" width={40} height={40} className="signout"/></button>
        </div>
    </header>
        
        
    )
}

