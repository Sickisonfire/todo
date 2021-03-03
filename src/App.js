import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Navbar, Alert } from './components'
import { AlertState, UserState, ListState } from './contexts'

/** @jsxImportSource @emotion/react */
import tw, { css } from 'twin.macro'
import { Global } from '@emotion/react'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faEnvelope,
  faLock,
  faUser,
  faGlobeAmericas,
  faInfoCircle,
  faExclamationCircle,
  faCheckCircle,
  faTimesCircle,
  faPlus,
  faEllipsisH,
  faTimes,
  faSearch,
  faMagnet,
  faArchive,
} from '@fortawesome/free-solid-svg-icons'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const About = lazy(() => import('./pages/About'))

const Landing = lazy(() => import('./pages/Landing'))
const Register = lazy(() => import('./pages/Register'))
const Login = lazy(() => import('./pages/Login'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))

library.add(
  faEnvelope,
  faLock,
  faUser,
  faGlobeAmericas,
  faInfoCircle,
  faExclamationCircle,
  faCheckCircle,
  faTimesCircle,
  faPlus,
  faEllipsisH,
  faTimes,
  faSearch,
  faMagnet,
  faArchive
)

export const App = () => {
  return (
    <>
      <Router>
        <UserState>
          <AlertState>
            <ListState>
              <Global styles={globalStyle} />
              <Navbar />
              <Alert />
              <Suspense fallback={<div>loading..</div>}>
                <Switch>
                  <Route exact path='/dashboard' component={Dashboard} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/' component={Landing} />
                  <Route component={PageNotFound} />
                </Switch>
              </Suspense>
            </ListState>
          </AlertState>
        </UserState>
      </Router>
    </>
  )
}

const globalStyle = css`
  body {
    ${tw`bg-gray-200`}
  }
`
