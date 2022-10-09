import type { NextPage } from 'next'
import Link from 'next/link'
import { UserRegisterForm  } from '../../components/user/user-register-form'
import { useTranslation } from 'react-i18next'

const Register: NextPage = () => {
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
                {t('Register an account')}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
              {t('Or')}{' '}
                <Link href="/users/login">
                  <a  className="font-medium text-indigo-600 hover:text-indigo-500">
                    {t('Login to your account')}
                  </a>
                </Link>
              </p>
            </div>
            <UserRegisterForm />
          </div>
        </div>
      </div>
    </div>
  )
}

Register.getLayout = (page) => (
  <>
    {page}
  </>
)

export default Register