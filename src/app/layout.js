import { Chicle } from 'next/font/google'
import './globals.css'
import Header from './components/header'
import Provider from './components/Provider'
// import "bootstrap/dist/css/bootstrap.min.css";

const chicle = Chicle({
  weight: ['400'],
  subsets: ['latin']
})


export const metadata = {
  title: 'Claire Sersun',
  description: 'Start of my app',
  keywords: 'scheduling app'
}

export const dynamicParams = true; // enable dynamic params

export default async function RootLayout({
  children} 
) {
  
  return (
    <>
      <html lang="en">
        <body className={chicle.className}>
          <Provider>
            <Header/>
            <main>
              {children}
            </main>
          </Provider>
        </body>
      </html>
    </>
  );
}