import Head from 'next/head'

import withMatomo from '../components/withMatomo'

import '../assets/around/css/theme.min.css'
import '../styles/fonts.css'
import '../styles/variables.css'
import '../styles/global.css'

export default function WwctbApp({ Component, pageProps }) {
  const WrappedComponent = withMatomo(Component)

  return (
    <>
      <Head>
        <link as="font" crossOrigin="anonymous" href="/fonts/cinzel-400.woff2" rel="preload" />
        <link as="font" crossOrigin="anonymous" href="/fonts/cinzel-500.woff2" rel="preload" />
        <link as="font" crossOrigin="anonymous" href="/fonts/cinzel-700.woff2" rel="preload" />
        <link as="font" crossOrigin="anonymous" href="/fonts/cinzel-decorative-400.woff2" rel="preload" />
        <link as="font" crossOrigin="anonymous" href="/fonts/cinzel-decorative-700.woff2" rel="preload" />
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
      </Head>

      <WrappedComponent {...pageProps} />
    </>
  )
}
