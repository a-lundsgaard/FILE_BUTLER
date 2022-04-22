// import App from 'next/app'
import "../../styles/globals.css"
import type { AppProps } from 'next/app'
import Head from "next/head";
import NavbarResponsive from "../common/components/navbar/navbarResponsive";
import ErrorSnack from "../common/components/alerts/snackbar";


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>Merge PDF</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className='bg-gradient-to-t from-cyan-500 to-blue-500 h-screen ' >
        <NavbarResponsive />
        <Component {...pageProps} />
        {/* <ErrorSnack type={{msg: 'wronngg', severity: 'error'}} /> */}

      </div>  
    </>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp