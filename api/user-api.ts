import axios from '../lib/axios'
import { apiConfig } from '../config'

class UserApi {
  setSession = (accessToken: string) => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
      axios.defaults.headers.common.Authorization = `JWT ${accessToken}`
    } else {
      localStorage.removeItem('accessToken')
      delete axios.defaults.headers.common.Authorization
    }
  }

  removeSession = () => {
    if (localStorage.getItem('accessToken')) {
      localStorage.removeItem('accessToken')
      delete axios.defaults.headers.common.Authorization
    }
  }

  async login(email: string, password: string ): Promise<object>  {
    this.removeSession()
    return new Promise((resolve, reject) => {
      axios.post(`${apiConfig.host}/api/token/auth/`, {
        username: email,
        password
      }).then((response: any) => {
        this.setSession(response.data.token)
        resolve(response.data.token)
      }).catch((error: any) => {
        if (error.response.status === 400) {
          reject(new Error('Check the right password and the right email'))
        } else {
          reject(error)
        }
      })
    })
  }

  async register(username: string, email: string, mobilePhone: string, firstName: string, lastName: string, password: string): Promise<object>  {
    this.removeSession()
    return new Promise((resolve, reject) => {
      axios.post(`${apiConfig.host}/api/users/`, {
        username,
        email,
        mobile_phone: mobilePhone,
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

  async update(email: string, mobilePhone: string, firstName: string, lastName: string): Promise<object>  {
    return new Promise((resolve, reject) => {
      axios.patch(`${apiConfig.host}/api/users/me/`, {
        email: email,
        mobile_phone: mobilePhone,
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
