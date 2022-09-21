import type { FC } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

export const LoginForm: FC = () => {
  const router = useRouter()
  const { t } = useTranslation()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(t('Should be an email'))
        .max(255)
        .required(t('Required')),
      password: Yup
        .string()
        .max(255)
        .required(t('Required')),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        toast.success(t('Successfuly!'))
        const url = (router.query.url as string) || '/'
        router.push(url)
      } catch (err: any) {
        console.error(err)
        toast.error(t('Something wrong!'))
        helpers.setStatus({ success: false })
        helpers.setErrors({ submit: err.message })
        helpers.setSubmitting(false)
      }
    }
  })

  return (
    <div className="mt-8">
      <div className="mt-6">
        <form
          className="space-y-6"
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t('Email address')}
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={Boolean(formik.touched.email && formik.errors.email) ?
                  "block w-full appearance-none rounded-md border border-red-300 pr-10 text-red-900 px-3 py-2 placeholder-red-300 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  :
                  "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                }
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                aria-invalid="true"
                aria-describedby="email-error"
              />
              {Boolean(formik.touched.email && formik.errors.email) &&
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>
              }
            </div>
            {Boolean(formik.touched.email && formik.errors.email) &&
              <p className="mt-2 text-sm text-red-600" id="email-error">
                {formik.errors.email}
              </p>
            }
          </div>
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              {t('Password')}
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={Boolean(formik.touched.password && formik.errors.password) ?
                  "block w-full appearance-none rounded-md border border-red-300 pr-10 text-red-900 px-3 py-2 placeholder-red-300 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  :
                  "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                }
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {Boolean(formik.touched.password && formik.errors.password) &&
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>
              }
            </div>
            {Boolean(formik.touched.password && formik.errors.password) &&
              <p className="mt-2 text-sm text-red-600" id="email-error">
                {formik.errors.password}
              </p>
            }
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                {t('Remember me')}
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                {t('Forgot your password?')}
              </a>
            </div>
          </div>
          <div>
            <button
              disabled={formik.isSubmitting}
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {t('Sign in')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}