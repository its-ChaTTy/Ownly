import { AuthProvider } from '@/context/auth.context';
import { getUserFromSession } from '@/context/auth.context';
import { ChakraProvider } from '@chakra-ui/react'
import App from 'next/app'
import '@/styles/root/_global.scss'
import Head from 'next/head';

function MyApp({ Component, pageProps, user }) {
  return (
    <AuthProvider user={user}>
         <Head>
            <title>Ownly</title>
            <meta
              name="description"
              content="A new age renting platform where you can rent anything and everything as long as it is just a thing ;)"
            />
            <link
              rel="icon"
              href="/favicon.ico"
            />
          </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  if (appContext.router.isSsr === undefined) {
    const appProps = await App.getInitialProps(appContext);
    const user = await getUserFromSession(appContext.ctx);
    return { ...appProps, user: user };
  } else {
    const appProps = await App.getInitialProps(appContext);
    return { ...appProps };
  }
}

export default MyApp;
