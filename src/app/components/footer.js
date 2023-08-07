"use client"
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";


export default function Footer() {
    const { data: session, status } = useSession()
    if (status === "unauthenticated") {
        return (<></>
)    }
    return(
        <>
        <footer className="footer">
            <div className="grid-2">
            <Link href="/"><Image src="/home.png" width={55} height={55} alt="home icon" className="icon"/></Link>
            <Link href="/profile"><Image src="/user.png" width={55} height={55} alt="profile icon" className="icon"/></Link>
            </div>
        </footer>
        </>
    )
}