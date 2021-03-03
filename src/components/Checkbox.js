/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'
import { Link } from 'react-router-dom'

export const Checkbox = ({ label, selected, onChange, link, linkDescription, ...rest }) => {
  const handleChange = (e) => {
    const { checked } = e.target
    onChange(checked)
  }
  return (
    <div>
      <label tw='flex items-center ml-2'>
        <input
          css={checkboxStyle}
          type='checkbox'
          value={selected}
          defaultChecked={selected}
          onChange={handleChange}
          {...rest}
        />
        {label}
        {link && (
          <Link to={link} tw='underline ml-1'>
            {linkDescription}
          </Link>
        )}
      </label>
    </div>
  )
}

const checkboxStyle = tw`mr-2  h-4 w-4 text-blue-600 border-gray-300 rounded focus:(outline-none ring-2 ring-offset-2)`

export default Checkbox
