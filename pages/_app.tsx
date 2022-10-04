import type { FC } from 'react'
import '../styles/globals.css'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useTranslation } from 'react-i18next'
import { UserProvider } from '../contexts/user-context'
import '../i18n'

type NexPageProps = AppProps & {
  Component: NextPage
}

const App: FC<NexPageProps> = (props) => {
  const { Component, pageProps } = props
  const { t } = useTranslation()
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>{t('e-inwork.com')}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <UserProvider>
        {getLayout(<Component {...pageProps} />)}
      </UserProvider>
    </>
  )
}

export default App
