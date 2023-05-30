"use client"
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Header() {
    return(
        <header className="header">
            <div className="container">
                <div className="logo">
                    <Link href="/">Claire Sersun</Link>
                </div>
                <div className="links">
                <Link href="/trial">Trial</Link>
                <Link href="/signin">Sign in page</Link>
                <button onClick={() => signOut()}>Sign out</button>
                </div>
            </div>
        </header>
    )
}