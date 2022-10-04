import { createContext, useEffect, useReducer } from 'react'
import type { FC, ReactNode } from 'react'
import PropTypes from 'prop-types'
import { userApi } from '../api/user-api'

interface State {
  isInitialized: boolean
  isAuthenticated: boolean
  user: object | null
}

interface UserContextValue extends State {
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (email: string, firstName: string, lastName: string, password: string) => Promise<void>
  passwordReset: (password: string) => Promise<void>
  update: (email: string, firstName: string, lastName: string) => Promise<void>
}

interface UserProviderProps {
  children: ReactNode
}

enum ActionType {
  INITIALIZE = 'INITIALIZE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  REGISTER = 'REGISTER',
  PASSWORD_RESET = 'PASSWORD_RESET',
  UPDATE = 'UPDATE',
}

type InitializeAction = {
  type: ActionType.INITIALIZE
  payload: {
    isAuthenticated: boolean
    user: object | null
  }
}

type LoginAction = {
  type: ActionType.LOGIN
  payload: {
    isAuthenticated: boolean
    user: object | null
  }
}

type LogoutAction = {
  type: ActionType.LOGOUT
  payload: {
    isAuthenticated: boolean
    user: object | null
  }
}

type RegisterAction = {
  type: ActionType.REGISTER
  payload: {
    isAuthenticated: boolean
    user: object
  }
}

type PasswordResetAction = {
  type: ActionType.PASSWORD_RESET
  payload: {
    isAuthenticated: boolean
    user: object
  }
}

type UpdateAction = {
  type: ActionType.UPDATE
  payload: {
    isAuthenticated: boolean
    user: object
  }
}

type Action =
  | InitializeAction
  | LoginAction
  | LogoutAction
  | RegisterAction
  | PasswordResetAction
  | UpdateAction

type Handler = (state: State, action: any) => State

const initialState: State = {
  isInitialized: false,
  isAuthenticated: false,
  user: null
}

const handlers: Record<ActionType, Handler> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const { isAuthenticated, user } = action.payload
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    }
  },
  LOGIN: (state: State, action: LoginAction): State => {
    const { user } = action.payload
    return {
      ...state,
      isAuthenticated: true,
      user
    }
  },
  LOGOUT: (state: State): State => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state: State, action: RegisterAction): State => {
    const { user } = action.payload
    return {
      ...state,
      isAuthenticated: false,
      user
    }
  },
  PASSWORD_RESET: (state: State, action: PasswordResetAction): State => {
    const { user } = action.payload
    return {
      ...state,
      isAuthenticated: false,
      user
    }
  },
  UPDATE: (state: State, action: UpdateAction): State => {
    const { user } = action.payload
    return {
      ...state,
      isAuthenticated: true,
      user
    }
  },
}

const reducer = (state: State, action: Action): State => (
  handlers[action.type] ? handlers[action.type](state, action) : state
)

export const UserContext = createContext<UserContextValue>({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  passwordReset: () => Promise.resolve(),
  update: () => Promise.resolve(),
})

export const UserProvider: FC<UserProviderProps> = (props) => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      try {
        const accessToken = window.localStorage.getItem('accessToken')
        if (accessToken) {
          userApi.setSession(accessToken)
          const user = await userApi.me()
          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated: true,
              user
            }
          })
        } else {
          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null
            }
          })
        }
      } catch (err) {
        console.error(err)
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null
          }
        })
      }
    }
    initialize()
  }, [])

  const login = async (email: string, password: string): Promise<void> => {
    await userApi.login(email, password)
    const user = await userApi.me()
    dispatch({
      type: ActionType.LOGIN,
      payload: {
        isAuthenticated: true,
        user
      }
    })
  }

  const logout = async (): Promise<void> => {
    userApi.removeSession()
    dispatch({
      type: ActionType.LOGOUT,
      payload: {
        isAuthenticated: false,
        user: null
      }
    })
  }

  const register = async (email: string, firstName: string, lastName: string, password: string): Promise<void> => {
    const user = await userApi.register(email, firstName, lastName, password)
    dispatch({
      type: ActionType.REGISTER,
      payload: {
        isAuthenticated: false,
        user
      }
    })
  }

  const passwordReset = async (password: string): Promise<void> => {
    const user = await userApi.passwordReset(password)
    dispatch({
      type: ActionType.PASSWORD_RESET,
      payload: {
        isAuthenticated: false,
        user
      }
    })
  }

  const update = async (email: string, firstName: string, lastName: string): Promise<void> => {
    const user = await userApi.update(email, firstName, lastName)
    dispatch({
      type: ActionType.UPDATE,
      payload: {
        isAuthenticated: true,
        user
      }
    })
  }

  return (
    <UserContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
        passwordReset,
        update,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export const UserConsumer = UserContext.Consumer
