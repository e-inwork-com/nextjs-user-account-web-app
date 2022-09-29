import type { FC, ReactNode } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useUser } from '../../hooks/use-user'

interface UserAuthProps {
  children: ReactNode
}

export const UserAuth: FC<UserAuthProps> = (props) => {
  const { children } = props
  const userAuth = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (!userAuth.isAuthenticated) {
      router.push({
        pathname: '/users/login',
        query: { returnUrl: router.asPath }
      }).catch(console.error)
    }
  }, [router.isReady])

  return (
    <>
      {userAuth.isAuthenticated && children}
    </>
  )
}

UserAuth.propTypes = {
  children: PropTypes.node
}
