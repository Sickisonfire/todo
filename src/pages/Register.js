import { useState } from 'react'
import { Validators } from '../lib/utilities/Validator'
import { Helmet } from 'react-helmet'
import { Link, useHistory } from 'react-router-dom'

import { InputField, Checkbox } from '../components'

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'

export const Register = () => {
  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    tosCheck: false,
    country: '',
  })

  const history = useHistory()

  const { name, email, password, confirmPassword, tosCheck } = formData

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('this is only a frontend demo.')
    history.push('/dashboard')
  }

  const handleChange = (key) => (value) => {
    setformData({ ...formData, [key]: value })
  }

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <Card>
        <H1>Sign Up</H1>

        <Form onSubmit={handleSubmit}>
          <div>
            <InputField
              aria='username'
              icon='user'
              type='text'
              value={name}
              placeholder='Your Name'
              onChange={handleChange('name')}
              validators={[{ check: Validators.required, message: 'This field is required' }]}
              required
            />
          </div>
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
          <div>
            <InputField
              aria='Confirm Password'
              icon='lock'
              type='password'
              value={confirmPassword}
              placeholder='Repeat your password'
              onChange={handleChange('confirmPassword')}
              validators={[{ check: Validators.required, message: 'This field is required' }]}
              required
            />
          </div>
          <div></div>
          <div>
            <Checkbox
              label=' I agree all statements in'
              onChange={handleChange('tosCheck')}
              selected={tosCheck}
              link='/'
              linkDescription='Terms of service'
              required
            />
          </div>
          <div tw='mx-auto mt-10'>
            <button
              type='submit'
              tw='px-10 py-3 text-white focus:(outline-none ring-4) bg-blue-400 rounded hover:bg-blue-500'
            >
              Register
            </button>
          </div>
        </Form>
        <p tw='mt-5 '>
          Already have an account?{' '}
          <Link to='/login' tw='underline'>
            Sign In
          </Link>
        </p>
      </Card>
    </>
  )
}

const Form = tw.form`m-auto flex flex-col`
const H1 = tw.h1`text-4xl mb-5 font-bold mb-10`
const Card = tw.div` m-10 bg-white p-10 rounded-xl shadow-lg md:(max-w-2xl mx-auto)`

export default Register
