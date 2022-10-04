import type { FC } from 'react'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { get } from 'lodash'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { userApi } from '../../api/user-api'
import { useUser } from '../../hooks/use-user'
import { DashboardSlideOvers } from '../dashboard/dashbord-slide-overs';

interface UserUpdateFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const UserUpdateForm: FC<UserUpdateFormProps> = (props) => {
  const { open, setOpen, ...other } = props;

  const router = useRouter()
  const { t } = useTranslation()
  const { user, update } = useUser() as any

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(t('Should be an email'))
        .required(t('Required')),
      firstName: Yup
        .string()
        .max(150, t('Max 150 characters'))
        .required(t('Required')),
      lastName: Yup
        .string()
        .max(150, t('Max 150 characters'))
        .required(t('Required')),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const email = get(user, 'email')
        await update(values.email, values.firstName, values.lastName)
        if (email !== values.email) {
          userApi.removeSession()
          router.push('/users/login')
        } else {
          setOpen(false)
          window.location.hash = ''
        }
      } catch (err: any) {
        console.error(err)
        helpers.setStatus({ success: false })
        helpers.setErrors({ submit: err.message })
        helpers.setSubmitting(false)
      }
    }
  })

  useEffect(() => {
    formik.setFieldValue('email', get(user, 'email', ''));
    formik.setFieldValue('firstName', get(user, 'first_name', ''));
    formik.setFieldValue('lastName', get(user, 'last_name', ''));
  }, [user]);

  return (
    <DashboardSlideOvers
      open={open}
      setOpen={setOpen}
      title={t('Profile')}
      description={t('The profile of your account')}
    >
      <div className="mt-8">
        <div className="mt-6">
          <form
            className="space-y-6"
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                {t('First Name')}
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className={Boolean(formik.touched.firstName && formik.errors.firstName) ?
                    "block w-full appearance-none rounded-md border border-red-300 pr-10 text-red-900 px-3 py-2 placeholder-red-300 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                    :
                    "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  }
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  aria-invalid="true"
                  aria-describedby="firstName-error"
                />
                {Boolean(formik.touched.firstName && formik.errors.firstName) &&
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                  </div>
                }
              </div>
              {Boolean(formik.touched.firstName && formik.errors.firstName) &&
                <p className="mt-2 text-sm text-red-600" id="firstName-error">
                  {formik.errors.firstName}
                </p>
              }
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                {t('Last Name')}
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className={Boolean(formik.touched.lastName && formik.errors.lastName) ?
                    "block w-full appearance-none rounded-md border border-red-300 pr-10 text-red-900 px-3 py-2 placeholder-red-300 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                    :
                    "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  }
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  aria-invalid="true"
                  aria-describedby="lastName-error"
                />
                {Boolean(formik.touched.lastName && formik.errors.lastName) &&
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                  </div>
                }
              </div>
              {Boolean(formik.touched.firstName && formik.errors.lastName) &&
                <p className="mt-2 text-sm text-red-600" id="lastName-error">
                  {formik.errors.lastName}
                </p>
              }
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t('Email address')}
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  id="email"
                  name="email"
                  type="email"
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
            <div>
              <button
                disabled={formik.isSubmitting}
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {t('Update')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardSlideOvers>
  )
}

DashboardSlideOvers.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
}