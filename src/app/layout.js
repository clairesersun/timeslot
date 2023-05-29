import { Chicle } from 'next/font/google'
import './globals.css'
import Header from './components/header'

const chicle = Chicle({
  weight: ['400'],
  subsets: ['latin']
})


export const metadata = {
  title: 'Claire Sersun',
  description: 'Start of my app',
  keywords: 'scheduling app'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={chicle.className}>
        <Header />
        <main className='container'>
          {children}
        </main>
      </body>
    </html>
  )
}
