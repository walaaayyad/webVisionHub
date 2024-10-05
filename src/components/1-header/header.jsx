import React from 'react'
import './header.css';
import {useState} from 'react'

const Header = ({userFavoriteList, handleSearchInput, runNewVideo, removeItemHandler, arLanguage, setArLanguage, searchTerm})=> {
  const [showModel, setshowModel] = useState(false);

  // Search Bar Functions
  const openSearchBar = ()=> {
    document.querySelector("#search-box").classList.add('active');
  }
  const closeSearchBar = ()=> {
    document.querySelector("#search-box").classList.remove('active');
  }

  return (
    <header className='flex'>
      <div className="switchBtn">
        <label className='switch'>
          <input 
            type="checkbox" 
            id='checkbox' 
            checked={arLanguage}
            onChange={()=> setArLanguage(!arLanguage)}
            />
          <div className='slider round'><span>OFF</span><span>ON</span></div>
        </label>
      </div>

      <div className='header-icons flex'>
        <div id='search-box' className="search-bar">
          <span className='icon-search' 
                onClick={openSearchBar}> 
          </span>
          <input  className='search-input' 
                  type="text" 
                  placeholder="Search.."
                  value= {searchTerm}
                  onChange={handleSearchInput} >
          </input>
          <span className='icon-close' 
                onClick={closeSearchBar}> 
          </span>
        </div>
        <button className='heart-btn icon-heart-o' 
                onClick={()=> {
                userFavoriteList.length > 0 && setshowModel(true);
                }}>
        </button>
      </div>

      <div className={showModel ? "model active" : "model"}> {/* Add condition if showModel state change to true class active will add */}
        <button className="close-btn icon-close" 
                onClick={()=> {
                  setshowModel(false);
                  }}>
        </button>
        
        <div className="favorite-list">
          {userFavoriteList.length > 0 ? // the list start with initial empty object
         userFavoriteList.map(i => {
            return (
              <div className='favorite-list-item' key={i.id}>
                <img src={i.img} alt="" />
                <div className="favorite-list-item-content">
                  <p>{i.title}</p>
                  <div className='list-category'>{i.category.join(' , ')}</div>
                  <button className='grade-bg' onClick={()=> {   
                      runNewVideo(i.embedId)}}>Play Now</button>
                  <button onClick={()=> removeItemHandler(i.id)}>Remove</button>
                </div>
              </div>
              )
            }) : <h3>Empty</h3>
          }
        </div>
      </div>
    </header>
  )
}

export default Header