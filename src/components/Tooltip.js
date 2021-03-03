import { useState } from 'react'
/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'

// TODO:
// fade in/out
export const Tooltip = ({ children, content, right, left, bottom, top }) => {
  let timeout
  const [active, setActive] = useState(false)

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true)
    }, 250)
  }

  const hideTip = () => {
    clearInterval(timeout)
    setActive(false)
  }

  return (
    <div tw='inline-block relative' onMouseEnter={showTip} onMouseLeave={hideTip}>
      {children}
      {active && (
        <div
          css={[
            tooltipStyle,
            right && tooltipStyleRight,
            left && tooltipStyleLeft,
            bottom && tooltipStyleBottom,
            top && tooltipStyleTop,
          ]}
        >
          {' '}
          {content}{' '}
        </div>
      )}
    </div>
  )
}

const tooltipStyle = tw`text-sm text-black font-medium shadow-md absolute rounded bg-gray-50 px-2 py-1 whitespace-nowrap opacity-75 z-30`

const tooltipStyleRight = tw`ml-1 left-full top-1/2 transform -translate-y-1/2`
const tooltipStyleLeft = tw`mr-1 right-full top-1/2 transform -translate-y-1/2`
const tooltipStyleTop = tw`mb-1 bottom-full right-1/2 transform translate-x-1/2`
const tooltipStyleBottom = tw`mt-1 top-full transform right-1/2 transform translate-x-1/2`

export default Tooltip
