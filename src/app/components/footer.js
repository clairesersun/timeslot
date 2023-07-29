"use client"
import Link from "next/link";
import Img from 'next/image'


export default function Footer() {
   
    return(
        <>
        <footer className="footer">
            <div className="grid-2">
            <Link href="/"><Img src="/../public/home.png" width={55} height={55} className="icon"/></Link>
            <Link href="/profile"><Img src="/../public/user.png" width={55} height={55} className="icon"/></Link>
            </div>
        </footer>
        </>
    )
}