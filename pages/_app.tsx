import type { FC } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../i18n'
import { useTranslation } from 'react-i18next'

const App: FC<AppProps> = (props) => {
  const { Component, pageProps } = props
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>
          {t('Home')}
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
