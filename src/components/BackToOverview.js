import React from 'react'
import { Link } from 'react-router-dom'
/** @jsxImportSource @emotion/react */
import 'twin.macro'

const BackToOverview = () => {
  return (
    <Link to='/my-pages'>
      <button tw='rounded-full px-5 py-3 text-white  z-30 font-bold bg-blue-500 hover:bg-blue-600 fixed bottom-5 right-5'>
        Zurück zur Übersicht
      </button>
    </Link>
  )
}

export default BackToOverview
