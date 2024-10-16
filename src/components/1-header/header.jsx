import React from 'react'
import './header.css';
import {useState, useEffect} from 'react'

const Header = ({handleSearchInput, runNewVideo, arLanguage, setArLanguage, searchTerm, favoriteItems, removeFavorite, showModel, setshowModel})=> {
  // const [showModel, setshowModel] = useState(false);

  //----------------- Search Bar Functions ----------------------
  const openSearchBar = ()=> {
    document.querySelector("#search-box").classList.add('active');
  }
  const closeSearchBar = ()=> {
    document.querySelector("#search-box").classList.remove('active');
  }

  //----------------- Favorite List Model ------------------------
  const openMenuHandler = ()=> {
    document.body.classList.add('menuOpen');
    setshowModel(true);
  }
  const closeMenuHandler = ()=> {
    document.body.classList.remove('menuOpen');
    setshowModel(false);
  }

// Handle the favoriteItems data to be able to use it
const fav = Object.keys(favoriteItems);

  return (
    <header id='header' className='flex'>
      <div className="switchBtn">
        <label className='switch'>
          <input 
            type="checkbox" 
            id='checkbox' 
            checked={arLanguage}
            onChange={()=> setArLanguage(!arLanguage)}
            />
          <div className='slider round'><span>EN</span><span>AR</span></div>
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
        <button className={fav.length > 0? 'heart-btn icon-heart': 'heart-btn icon-heart-o'}  
                onClick={()=> {
                fav.length > 0 && openMenuHandler();
                }}>
                  <sup style={{color: "#ffffffc4"}}>{fav.length}</sup>
        </button>
      </div>

      <div id='model' className={showModel ? "model active" : "model"}> {/* Add condition if showModel state change to true class active will add */}
        <button className="close-btn icon-close" 
                onClick={()=> {
                  closeMenuHandler();
                  }}>
        </button>
        
        <div className="favorite-list">
        {fav.length > 0 ? // the list start with initial empty object
          fav.map((key) => {
          const item = favoriteItems[key];
            return (
              <div className='favorite-list-item' key={item.id}>
                <img src={item.img} alt="" />
                <div className="favorite-list-item-content">
                  <p>{item.title}</p>
                  <div className='list-category'>{item.category.join(' , ')}</div>
                  <button className='grade-bg' 
                          onClick={()=> {   
                      runNewVideo(item.embedId);
                      closeMenuHandler();
                      }}>Play Now</button>
                  <button onClick={()=> removeFavorite(item.id)}>Remove</button>
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