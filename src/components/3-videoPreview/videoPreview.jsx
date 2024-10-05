import React from 'react';
import './videoPreview.css';
import { useState } from 'react';

const videoPreview = ({playVid})=> {
  // Handle errors for a smoother user experience. By implementing basic error handling and providing feedback.
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setError('Failed to load video. Please try again later.');
    setIsLoading(false);
  };
 
  return (
    <section id='videoPlay' className=''>
      <div className="logos-icons">
        <div className='logo_icon'><span className='icon-react'></span></div>
        <div className='logo_icon'><span className='icon-wordpress'></span></div>
        <div className='logo_icon'><span className='icon-vue-dot-js'></span></div>
        <div className='logo_icon'><span className='icon-bootstrap'></span></div>
        <div className='logo_icon'><span className='icon-html5'></span></div>
        <div className='logo_icon'><span className='icon-css3'></span></div>
        <div className='logo_icon'><span className='icon-node-dot-js'></span></div>
        <div className='logo_icon'><span className='icon-angular'></span></div>
        <div className='logo_icon'><span className='icon-typescript'></span></div>
        <div className='logo_icon'><span className='icon-tailwindcss'></span></div>
        <div className='logo_icon'><span className='icon-javascript'></span></div>
        <div className='logo_icon'><span className='icon-framer'></span></div>
        {/* <div className='logo_icon'><span className='icon-github'></span></div> */}
      </div>

      <div className="video-play-section flex">
        <div className="video-play-box">
          <div className="video-play-model flex">
            {isLoading && <p>Loading video...</p>}  {/*  Handle Errors */}
            {error && <p>{error}</p>}  {/*  Handle Errors */}
            <iframe
              width="98%"
              height="98%"
              src={`https://www.youtube.com/embed/${playVid}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              onLoad={() => setIsLoading(false)} // Handle Errors
              onError={handleError} // Handle Errors
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}

export default videoPreview