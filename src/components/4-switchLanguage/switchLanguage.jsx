import React from 'react';
import './switchLanguage.css'
import { useState } from "react"

const switchLanguage = ({handleLangProjects, langBtn, setLangBtn})=> {
  // const [activeButton, setAtiveButton] = useState(0);


  return (
    <div className="switch-bar flex">
        <button 
            className={langBtn === 'all' ? 'active' : null}
            onClick= {()=> {
                  setLangBtn('all');
                  handleLangProjects('');
                }}
                >All
        </button>

        <button 
            className={langBtn === 'en' ? 'active' : ''}
            onClick={()=> {
                setLangBtn('en')
                handleLangProjects('en');
                }}
                >EN
        </button>

        <button 
            className={langBtn === 'ar' ? 'active' : ''}
            onClick={()=> {
                setLangBtn('ar')
                handleLangProjects('ar');
                }}
                >AR
        </button>
    </div>
  )
}

export default switchLanguage