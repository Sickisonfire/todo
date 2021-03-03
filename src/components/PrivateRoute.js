import { useContext } from 'react'
import { Route } from 'react-router-dom'
import { Login } from '../pages'
import { UserContext } from '../contexts'

export const PrivateRoute = ({ component: Component, ...otherProps }) => {
  const { isAuthenticated, loading } = useContext(UserContext)

  return (
    <Route
      {...otherProps}
      render={(props) =>
        isAuthenticated ? (
          !loading ? (
            <Component {...props} />
          ) : (
            <div>loading...</div>
          )
        ) : (
          // <Redirect to={otherProps.redirectTo ? otherProps.redirectTo : '/login'} />
          <Login />
        )
      }
    />
  )
}

export default PrivateRoute
