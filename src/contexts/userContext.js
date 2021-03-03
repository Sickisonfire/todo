import { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import setAuthToken from '../lib/utilities/setAuthToken'
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_AUTH_REQUEST,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAIL,
} from './types'

const API_URL = 'https://twello-api.herokuapp.com'

/* -------------------------------------
    Context
 -------------------------------------*/

export const UserContext = createContext()

/* -------------------------------------
    Reducer
 -------------------------------------*/

const UserReducer = (state, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
    case USER_LOGIN_REQUEST:
    case USER_AUTH_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case USER_REGISTER_SUCCESS:
    case USER_LOGIN_SUCCESS:
    case USER_AUTH_SUCCESS:
      return { ...state, loading: false, user: action.payload, isAuthenticated: true }
    case USER_AUTH_FAIL:
    case USER_REGISTER_FAIL:
    case USER_LOGIN_FAIL:
    case USER_LOGOUT:
      return { ...state, loading: false, user: null, isAuthenticated: false }
    default:
      return state
  }
}

/* -------------------------------------
    State
 -------------------------------------*/

export const UserState = (props) => {
  const initialState = {
    loading: true,
    user: null,
    isAuthenticated: false,
  }

  useEffect(() => {
    authUser()
  }, [])

  const [state, dispatch] = useReducer(UserReducer, initialState)

  // GET USER
  //
  const authUser = async () => {
    if (localStorage.jwt) {
      try {
        dispatch({
          type: USER_AUTH_REQUEST,
        })

        setAuthToken(localStorage.jwt)
        const { data } = await axios.get(`${API_URL}/users/me`)
        dispatch({
          type: USER_AUTH_SUCCESS,
          payload: data,
        })
      } catch (error) {
        dispatch({
          type: USER_AUTH_FAIL,
        })
      }
    }
  }

  // LOGIN
  //
  const login = async (identifier, password) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      })

      const { data } = await axios.post(`${API_URL}/auth/local`, {
        identifier,
        password,
      })

      localStorage.setItem('jwt', data.jwt)

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data.user,
      })
    } catch (error) {
      localStorage.removeItem('jwt')
      dispatch({
        type: USER_LOGIN_FAIL,
      })
    }
    authUser()
  }

  const logout = async () => {
    dispatch({
      type: USER_LOGOUT,
    })
    localStorage.removeItem('jwt')
    setAuthToken()
  }

  const register = async (username, email, password) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      })
      const { data } = await axios.post(`${API_URL}/auth/local/register`, {
        username,
        email,
        password,
      })

      localStorage.setItem('jwt', data.jwt)

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data.user,
      })
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
      })
    }
    authUser()
  }

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        isAuthenticated: state.isAuthenticated,
        login,
        logout,
        register,
        authUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
