import { Helmet } from 'react-helmet'

export const PageNotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page not found</title>
      </Helmet>
      404 Page not found
    </>
  )
}

export default PageNotFound
