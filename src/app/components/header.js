"use client"
import Link from "next/link";
import { signOut } from "next-auth/react";
import Img from 'next/image'
import { useSession } from "next-auth/react";


export default async function Header() {
    const { data: session, status } = useSession()
  if (status === "authenticated") {
    return (
        <header className="header">
            <div className="container flex flex-col items-left justify-between p-24 mb-32 grid text-left lg:mb-0 lg:grid-cols-2 lg:text-left">
                <div className="logo">
                    <Link href="/">Claire Sersun</Link>
                </div>
                <div className="links mb-32 grid text-left lg:mb-0 lg:grid-cols-5 lg:text-left">
                <Link href="/profile">Profile</Link>
                <Link href="/events">Events</Link>
                <Link href="/availability">Availability</Link>
                <Link href="/design">Design</Link>
                <button onClick={() => signOut()}>Sign out</button>
                </div>
            </div>
        </header>
    
)
  }
    return(
        <header className="header">
        <Link href="/"><Img src="/../public/logo_inverse.png" width={200} height={40} className="logo"/></Link>
    </header>
        
    )
}

