/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Select = ({ value, onChange, placeholder, data, icon, label, aria }) => {
  const handleChange = (e) => {
    const { value } = e.target
    onChange(value)
  }

  return (
    <div tw=' mb-3 relative flex items-center'>
      {label && <label htmlFor={label}>{label}</label>}
      {icon && <FontAwesomeIcon icon={icon} css={[iconStyle]} />}
      <select
        id={label}
        value={value}
        onChange={handleChange}
        css={dropdownStyle}
        aria-label={aria}
      >
        <option value=''>{placeholder}</option>
        {data.map((item, key) => (
          <option key={key} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  )
}

const dropdownStyle = tw`py-4 px-10  text-sm border-b border-gray-500 w-full focus:(outline-none ring-2 ring-offset-2 rounded-sm)`
const iconStyle = tw`absolute left-0 text-sm ml-2`

export default Select
