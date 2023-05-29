import Link from "next/link";

export default function Header() {
    return(
        <header className="header">
            <div className="container">
                <div className="logo">
                    <Link href="/">Claire Sersun</Link>
                </div>
                <div className="links">
                <Link href="/trial">Trial</Link>
                </div>
            </div>
        </header>
    )
}