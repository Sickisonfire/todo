import { useState } from 'react'
import { validateInput } from '../lib/utilities/Validator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'

export const InputField = ({
  type,
  value,
  label,
  placeholder,
  defaultValue,
  onChange,
  validators,
  icon,
  aria,
  ...rest
}) => {
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    const { value } = e.target
    setError(validateInput(validators, value))
    onChange(value)
  }

  return (
    <div tw=' mb-3 relative flex items-center'>
      {icon && <FontAwesomeIcon icon={icon} css={[iconStyle]} />}
      {label && <label htmlFor={label}>{label}</label>}
      {type === 'textarea' ? (
        <textarea
          css={[inputFieldStyle, error && tw`border-b-2 border-red-500 `]}
          id={label}
          type={type}
          aria-label={aria}
          value={value}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={handleChange}
          {...rest}
        />
      ) : (
        <input
          css={[inputFieldStyle, error && tw`border-b-4 border-red-500 `]}
          id={label}
          type={type}
          value={value}
          aria-label={aria}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={handleChange}
          {...rest}
        />
      )}
      {error && <span css={errorStyle}>{error.message}</span>}
    </div>
  )
}

const inputFieldStyle = tw`py-4 px-10  text-sm border-b border-gray-500 w-full focus:(outline-none ring-2 ring-offset-2 rounded-sm)`
const errorStyle = tw`m-2 text-sm text-red-500 absolute bottom-0 right-0`
const iconStyle = tw`absolute left-0 text-sm ml-2`

export default InputField
