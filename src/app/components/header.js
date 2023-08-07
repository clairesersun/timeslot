"use client"
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";


export default async function Header() {
    const { data: session, status } = useSession()
  if (status === "unauthenticated") {
    //does this work?
    return (
        <header className="header">
        <Link href="/"><Image src="/logo_inverse.png" alt="logo" width={200} height={40} className="logo"/></Link>
    </header>
)
  }
    return (
        <header className="header">
            <div className="grid-2">
        <Link href="/"><Image src="/logo_inverse.png" alt="logo" width={200} height={40} className="logo"/></Link>
        <button onClick={() => signOut()} className="signout"><Image src="/shutdown.png" alt="sign out" width={40} height={40} className="signout"/></button>
        </div>
    </header>
        
        
    )
}

