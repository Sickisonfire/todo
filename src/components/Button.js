/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'
import { forwardRef } from 'react'
export const Button = forwardRef(({ children, onClick, isSmall, isSecondary }, ref) => (
  <button
    ref={ref}
    css={[
      tw`px-10 py-3 text-white focus:(outline-none ring-4) bg-blue-400 rounded hover:bg-blue-500 `,
      isSmall ? tw`text-sm px-1 py-1` : tw`text-base`,
      isSecondary && secondaryStyle,
    ]}
    onClick={(e) => onClick(e)}
  >
    {children}
  </button>
))

const secondaryStyle = tw`
bg-green-400 hover:bg-green-500 focus:(ring-green-100 )
`

export default Button
