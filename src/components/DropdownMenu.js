import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'

export const DropdownMenu = ({ children, items }) => {
  // const dropDownMenuRef = useRef()
  const dropDownButtonRef = React.createRef()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const handleClickOutside = (e) => {
    if (dropDownButtonRef.current && dropDownButtonRef.current.contains(e.target)) {
      return
    }
    setOpen(false)
  }
  // creating copy of children to pass onclick function prop to child
  const childrenWithProps = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      onClick: () => {
        setOpen(!open)
      },
      ref: dropDownButtonRef,
    })
  })

  return (
    <div tw='relative'>
      {childrenWithProps}
      <div
        // ref={dropDownMenuRef}
        css={[
          tw`hidden z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5`,
          open && tw`block`,
        ]}
        aria-orientation='vertical'
      >
        {items &&
          items.map((item, index) =>
            !item.onClick ? (
              <Link
                to={item.link || '#'}
                key={index}
                tw='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              >
                {item.text}
              </Link>
            ) : (
              <button
                key={index}
                tw='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                onClick={item.onClick}
              >
                {item.text}
              </button>
            )
          )}
      </div>
    </div>
  )
}
export default DropdownMenu
