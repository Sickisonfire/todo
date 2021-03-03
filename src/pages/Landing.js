import { Suspense } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const renderLoading = () => <p>Loading</p>

export const Landing = () => {
  return (
    <>
      <Helmet>
        <title>Welcome</title>
      </Helmet>
      <Suspense fallback={renderLoading()}>
        <section tw='w-full bg-white'>
          <div tw='flex flex-col items-center lg:(flex-row)'>
            <div tw=' p-4 flex flex-col py-7  items-center xl:flex-shrink-0'>
              <h1 tw='text-4xl font-bold text-green-500 sm:(text-center) md:(text-6xl mb-4) lg:(text-7xl)'>
                Lorem ipsum
              </h1>
              <h2 tw='text-2xl font-bold text-gray-500 mb-4 sm:(text-center)  md:(text-4xl) lg:(text-5xl)'>
                Lorem ipsum dolor sit amet.
              </h2>
              <p tw='text-lg mb-10 sm:(text-center) max-w-screen-sm '>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, qui? Maiores
                magnam repellendus, fugiat impedit provident dolorem illo consectetur tempore.
              </p>
              <button tw='bg-green-500 rounded p-2 text-white hover:bg-green-600 transition-colors mb-6 px-24'>
                Get in contact
              </button>
            </div>

            <div tw=''>
              <img
                tw='h-72 w-full object-cover object-right sm:h-72 md:h-96 lg:w-full lg:h-almost'
                src='https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80'
                alt=''
              />
            </div>
          </div>
        </section>
        <section>
          <div tw='p-4 flex flex-col items-center lg:(p-10)'>
            <p tw='uppercase text-gray-700 text-sm text-center lg:(text-xl)'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>

            <div tw='flex items-center  mx-auto space-x-12 m-4 mt-8'>
              <img css={[awardStyle]} src='' alt='award1' />

              <img css={[awardStyle]} src='' alt='award2' />

              <img css={[awardStyle]} src='' alt='award1' />

              <img css={[awardStyle]} src='' alt='award1' />
            </div>
          </div>
        </section>
        <section tw='bg-white '>
          <div tw=' p-4 py-7 text-center  mx-auto lg:(max-w-screen-xl)'>
            <h1 tw='text-4xl font-bold text-gray-800 mb-12'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </h1>
            <div tw='flex flex-col space-y-20 md:(pt-16 items-center space-y-32)'>
              <div tw='flex flex-col md:(flex-row items-center space-x-32)'>
                <FontAwesomeIcon icon={'search'} css={[iconStyle]}></FontAwesomeIcon>
                <div tw='md:(max-w-lg text-left) '>
                  <h2 tw='text-2xl font-bold text-gray-600 mb-3'>
                    Lorem ipsum dolor sit amet consectetur.
                  </h2>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur officia
                    molestiae, corrupti exercitationem perferendis, laudantium repudiandae
                    accusantium non aspernatur dolorum reiciendis quo, facere nostrum sit eius
                    tempora recusandae a? Nemo!
                  </p>
                </div>
              </div>
              <div tw='flex flex-col md:(flex-row items-center)'>
                <FontAwesomeIcon icon={'magnet'} css={[iconStyle]}></FontAwesomeIcon>
                <div tw='md:(max-w-lg text-left order-first mr-32)'>
                  <h2 tw='text-2xl font-bold text-gray-600 mb-3'>
                    Lorem ipsum dolor sit amet consectetur.
                  </h2>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur officia
                    molestiae, corrupti exercitationem perferendis, laudantium repudiandae
                    accusantium non aspernatur dolorum reiciendis quo, facere nostrum sit eius
                    tempora recusandae a? Nemo!
                  </p>
                </div>
              </div>
              <div tw='flex flex-col md:(flex-row items-center space-x-32)'>
                <FontAwesomeIcon icon={'archive'} css={[iconStyle]}></FontAwesomeIcon>
                <div tw='md:( max-w-lg text-left ) '>
                  <h2 tw='text-2xl font-bold text-gray-600 mb-3'>
                    Lorem ipsum dolor sit amet consectetur.
                  </h2>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur officia
                    molestiae, corrupti exercitationem perferendis, laudantium repudiandae
                    accusantium non aspernatur dolorum reiciendis quo, facere nostrum sit eius
                    tempora recusandae a? Nemo!
                  </p>
                </div>
              </div>
            </div>
            <button tw='bg-green-500 rounded p-2 px-20 text-white hover:bg-green-600 transition-colors my-8 mt-20 '>
              learn more
            </button>
          </div>
        </section>
        <footer tw='w-full bg-green-500 p-12 text-white'>
          <div tw='w-full flex items-center justify-center space-x-32'>
            <div tw='flex flex-col space-y-4 text-xs'>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register Account</Link>
              <Link to='/dashboard'>Dashboard</Link>
            </div>
            <div tw='flex flex-col space-y-4 text-xs'>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register Account</Link>
              <Link to='/dashboard'>Dashboard</Link>
            </div>
          </div>
        </footer>
      </Suspense>
    </>
  )
}

const iconStyle = tw`text-7xl text-green-500 mx-auto mb-2 md:(text-9xl) `
const awardStyle = tw`opacity-40 md:(w-12) lg:(w-16)`

export default Landing
