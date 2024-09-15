import React from 'react'
import footerBanner from '../assets/footerImg.svg'
function FooterBanner() {
  return (
    <div className='w-full px-[20px] sm:px-[40px] py-11 bg-inherit mt-5'>
      <img src={footerBanner} alt="" className=' w-full' />
    </div>
  )
}

export default FooterBanner