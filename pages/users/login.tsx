import type { NextPage } from 'next'
import { LoginForm } from '../../components/user/login-form'
import { useTranslation } from 'react-i18next'

const Login: NextPage = () => {
  const { t } = useTranslation()

  return (
    <div className="grid place-items-center h-screen">
      <div className="flex min-h-full">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-12 w-auto"
                src="/static/logo.png"
                alt="e-inwork.com"
              />
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                {t('Sign in to your account')}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
              {t('Or')}{' '}
                <a href="/users/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                  {t('Create a new account')}
                </a>
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

Login.getLayout = (page) => (
  <>
    {page}
  </>
)

export default Login