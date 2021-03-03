import { useState } from 'react'
import { Validators } from '../lib/utilities/Validator'
import { Helmet } from 'react-helmet'
import { Link, useHistory } from 'react-router-dom'
import { InputField } from '../components'

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'

export const Login = () => {
  const [formData, setformData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData
  const history = useHistory()

  const handleChange = (key) => (value) => {
    setformData({ ...formData, [key]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // login(email, password)
    alert('This is only a frontend demo.')
    history.push('/dashboard')
  }

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     setAlert(`Welcome back ${user.username}`, 'SUCCESS')
  //     history.push('/dashboard')
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isAuthenticated, history, setAlert])

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Card>
        <H1>Login</H1>

        <Form onSubmit={handleSubmit}>
          <div>
            <InputField
              aria='Email'
              icon='envelope'
              type='email'
              value={email}
              placeholder='Your Email'
              onChange={handleChange('email')}
              validators={[
                { check: Validators.required, message: 'This field is required' },
                { check: Validators.email, message: 'Please enter a valid email address' },
              ]}
              required
            />
          </div>
          <div>
            <InputField
              aria='Password'
              icon='lock'
              type='password'
              value={password}
              placeholder='Password'
              onChange={handleChange('password')}
              validators={[{ check: Validators.required, message: 'This field is required' }]}
              required
            />
          </div>

          <div tw='mx-auto mt-10'>
            <button
              type='submit'
              tw='px-10 py-3 text-white focus:(outline-none ring-4) bg-blue-400 rounded hover:bg-blue-500'
            >
              Login
            </button>
          </div>
        </Form>
        <p tw='mt-5 '>
          Create an account{' '}
          <Link to='/register' tw='underline'>
            Sign up
          </Link>
        </p>
      </Card>
    </>
  )
}

const Form = tw.form`m-auto flex flex-col`
const H1 = tw.h1`text-4xl mb-5 font-bold mb-10`
const Card = tw.div` m-10 bg-white p-10 rounded-xl shadow-lg md:(max-w-2xl mx-auto)`

export default Login
