import React from 'react'
import './footer.css'

function footer() {
  return (
    <div className='footer flex'>
      <div>developed by walaa ayyad &copy; 2024</div>
      <div className="footer-social-links flex">
       <a href=""><span className='icon-github'></span></a>
       <a href=""><span className='icon-linkedin-square'></span></a>
       <a href=""><span className='icon-mail'></span></a>
      </div>
    </div>
  )
}

export default footer