import { createContext, useReducer } from 'react'
import { SET_ALERT, REMOVE_ALERT } from './types'

/* -------------------------------------
    Context
 -------------------------------------*/

export const AlertContext = createContext()

/* -------------------------------------
    Reducer
 -------------------------------------*/

const AlertReducer = (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return action.payload
    case REMOVE_ALERT:
      return null
    default:
      return state
  }
}

/* -------------------------------------
    State
 -------------------------------------*/

export const AlertState = (props) => {
  const initialState = null

  const [state, dispatch] = useReducer(AlertReducer, initialState)

  const setAlert = (msg, type) => {
    dispatch({
      type: SET_ALERT,
      payload: { msg, type },
    })

    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
      })
    }, 5000)
  }

  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  )
}
