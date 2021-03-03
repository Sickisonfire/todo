import { createContext, useReducer } from 'react'
import axios from 'axios'
import {
  LIST_ADD_REQUEST,
  LIST_ADD_SUCCESS,
  LIST_REMOVE,
  LIST_ADD_FAIL,
  LIST_UPDATE_REQUEST,
  LIST_UPDATE_SUCCESS,
  LISTS_GET_REQUEST,
  LISTS_GET_SUCCESS,
  LISTS_GET_FAIL,
  LISTS_CLEAR_STATE,
} from './types'

const API_URL = 'https://twello-api.herokuapp.com'

/* -------------------------------------
    Context
 -------------------------------------*/

export const ListContext = createContext()

/* -------------------------------------
    Reducer
 -------------------------------------*/

const ListReducer = (state, action) => {
  switch (action.type) {
    case LIST_ADD_REQUEST:
    case LIST_UPDATE_REQUEST:
      return { ...state }
    case LISTS_GET_REQUEST:
      return { ...state, loading: true }
    case LIST_ADD_SUCCESS:
    case LIST_UPDATE_SUCCESS:
    case LISTS_GET_SUCCESS:
      return { ...state, lists: action.payload, loading: false }
    case LIST_ADD_FAIL:
    case LISTS_GET_FAIL:
      return { ...state, loading: false }
    case LIST_REMOVE:
      return { ...state, ...action.payload }
    case LISTS_CLEAR_STATE:
      return { loading: false, lists: [] }
    default:
      return state
  }
}

/* -------------------------------------
    State
 -------------------------------------*/

export const ListState = (props) => {
  const initialState = {
    lists: [],
    loading: true,
  }

  const [state, dispatch] = useReducer(ListReducer, initialState)

  const getLists = async () => {
    try {
      dispatch({
        type: LISTS_GET_REQUEST,
      })
      const { data } = await axios.get(`${API_URL}/lists`)
      dispatch({
        type: LISTS_GET_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: LISTS_GET_FAIL,
      })
      console.log('oops')
    }
  }

  const addList = async (list) => {
    try {
      dispatch({
        type: LIST_ADD_REQUEST,
      })
      const { data } = await axios.post(`${API_URL}/lists`, list)

      dispatch({
        type: LIST_ADD_SUCCESS,
        payload: data,
      })

      getLists()
    } catch (error) {
      dispatch({
        type: LIST_ADD_FAIL,
      })
    }
  }

  const updateList = async (list) => {
    try {
      dispatch({
        type: LIST_UPDATE_REQUEST,
      })
      const { data } = await axios.put(`${API_URL}/lists/${list.id}`, list)

      dispatch({
        type: LIST_ADD_SUCCESS,
        payload: data,
      })
      getLists()
    } catch (error) {
      dispatch({
        type: LIST_ADD_FAIL,
      })
    }
  }

  const deleteList = async (id) => {
    try {
      dispatch({
        type: LIST_REMOVE,
      })
      await axios.delete(`${API_URL}/lists/${id}`)
    } catch (error) {
      console.log(error)
    }
    getLists()
  }

  const clearListState = () => {
    dispatch({
      type: LISTS_CLEAR_STATE,
    })
  }

  return (
    <ListContext.Provider
      value={{
        lists: state.lists,
        loading: state.loading,
        addList,
        updateList,
        deleteList,
        getLists,
        clearListState,
      }}
    >
      {props.children}
    </ListContext.Provider>
  )
}
