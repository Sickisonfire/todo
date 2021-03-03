import { useContext } from 'react'
import { AlertContext } from '../contexts'
/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Alert = () => {
  const alertContext = useContext(AlertContext)
  const { alert } = alertContext

  let style
  if (alert !== null) {
    switch (alert.type) {
      case 'ERROR':
        style = errorAlertStyle
        break
      case 'SUCCESS':
        style = successAlertStyle
        break
      case 'INFO':
        style = informationAlertStyle
        break
      case 'WARN':
        style = warnAlertStyle
        break
      default:
        break
    }
  }

  return (
    alert !== null && (
      <div
        css={[
          tw`fixed right-0 bottom-0 p-4 m-4 font-medium text-sm shadow rounded bg-gray-50`,
          style.bg,
        ]}
      >
        <FontAwesomeIcon icon={style.icon} css={tw`mr-3`} />
        <span>{alert.msg}</span>
      </div>
    )
  )
}

const errorAlertStyle = {
  bg: tw`bg-red-100 text-red-700`,
  icon: 'times-circle',
}

const successAlertStyle = {
  bg: tw`bg-green-100 text-green-700`,
  icon: 'check-circle',
}

const informationAlertStyle = {
  bg: tw`bg-blue-100 text-blue-500`,
  icon: 'info-circle',
}

const warnAlertStyle = {
  bg: tw`bg-yellow-100 text-yellow-600`,
  icon: 'exclamation-circle',
}

export default Alert
