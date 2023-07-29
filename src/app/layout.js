import './globals.css'
import Header from './components/header'
import Provider from './components/Provider'
import Footer from "./components/footer";


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
        <body >
          <Provider>
            <Header/>
            <main>
            <link rel="stylesheet" href="https://use.typekit.net/ohb7fqk.css"></link>
              {children}
            </main>
            <Footer/>
          </Provider>
        </body>
      </html>
    </>
  );
}