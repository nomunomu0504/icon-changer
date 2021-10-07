import type { AppProps } from 'next/app'

const App: React.VFC<AppProps> = ({ Component, pageProps }): JSX.Element => {
  return <Component {...pageProps} />
}

export default App
