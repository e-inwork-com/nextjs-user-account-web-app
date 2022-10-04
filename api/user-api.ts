import axios from '../lib/axios'
import { apiConfig } from '../config'

class UserApi {
  setSession = (accessToken: string) => {
    if (accessToken) {
      window.localStorage.setItem('accessToken', accessToken)
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
      window.localStorage.removeItem('accessToken')
      delete axios.defaults.headers.common.Authorization
    }
  }

  removeSession = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('accessToken')
    }
    delete axios.defaults.headers.common.Authorization
  }

  async login(email: string, password: string ): Promise<object>  {
    this.removeSession()
    return new Promise((resolve, reject) => {
      axios.post(`${apiConfig.host}/api/token/`, {
        username: email,
        password
      }).then((response: any) => {
        this.setSession(response.data.access)
        resolve(response.data.access)
      }).catch((error: any) => {
        if (error.response.status === 400) {
          reject(new Error('Check the right password and the right email'))
        } else {
          reject(error)
        }
      })
    })
  }

  async register(email: string, firstName: string, lastName: string, password: string): Promise<object>  {
    this.removeSession()
    return new Promise((resolve, reject) => {
      axios.post(`${apiConfig.host}/api/users/`, {
        email,
        first_name: firstName,
        last_name: lastName,
        password
      }).then((response: any) => {
        resolve(response.data)
      }).catch((error: any) => {
        reject(error)
      })
    })
  }

  async update(email: string, firstName: string, lastName: string): Promise<object>  {
    return new Promise((resolve, reject) => {
      axios.patch(`${apiConfig.host}/api/users/me/`, {
        email: email,
        first_name: firstName,
        last_name: lastName,
      }).then((response: any) => {
        resolve(response.data)
      }).catch((error: any) => {
        reject(error)
      })
    })
  }

  async passwordReset(password: string): Promise<object>  {
    return new Promise((resolve, reject) => {
      axios.patch(`${apiConfig.host}/api/users/me/`, { password }).then((response: any) => {
        resolve(response.data)
        this.removeSession()
      }).catch((error: any) => {
        reject(error)
      })
    })
  }

  async me(): Promise<object>  {
    return new Promise((resolve, reject) => {
      axios.get(`${apiConfig.host}/api/users/me/`).then((response: any) => {
        resolve(response.data)
      }).catch((error: any) => {
        reject(error)
        this.removeSession()
      })
    })
  }
}

export const userApi = new UserApi()
