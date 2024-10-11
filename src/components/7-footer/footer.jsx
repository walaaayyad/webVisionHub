import React from 'react'
import './footer.css'

function footer() {
  return (
    <div className='footer flex'>
      <div>Developed By Walaa Ayyad &copy; 2024</div>
      <div className="footer-social-links flex">
       <a href="https://github.com/walaaayyad/webVisionHub" target="_blank"><span className='icon-github'></span></a>
       <a href="https://www.linkedin.com/in/walaa-ayyad/" target="_blank"><span className='icon-linkedin-square'></span></a>
       <a href="mailto:walaa_ayyad7@yahoo.com" target="_blank"><span className='icon-mail'></span></a>
      </div>
    </div>
  )
}

export default footer