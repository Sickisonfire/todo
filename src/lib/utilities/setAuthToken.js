import axios from 'axios'

//if token in localStorage set header to token esle if not token, delete value in header

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export default setAuthToken
