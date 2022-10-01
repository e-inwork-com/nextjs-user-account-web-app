import { useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { userApi } from '../../api/user-api'

const Logout: NextPage = () => {
  const router = useRouter()
  userApi.removeSession()

  useEffect(() => {
    userApi.removeSession()
    router.push('/users/login')
  }, [router, userApi]);

  return null;
}


export default Logout