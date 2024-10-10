import Header from './components/1-header/header'
import Hero from './components/2-hero/hero'
import VideoPreview from './components/3-videoPreview/videoPreview'
import SwitchLanguage from './components/4-switchLanguage/switchLanguage'
import FilterButtons from './components/5-filterButtons/filterButtons'
import Projects from './components/6-projects/projects'
import Footer from './components/7-footer/footer'
import Data from '../cardsContent.json'
import { useState, useEffect } from 'react'


function App() {
  const loadData = Data; // Import data from JSON file.
  const storedFav = JSON.parse(localStorage.getItem("fav")); // Get the localStorage data.
  const [favoriteItems, setFavoriteItems] = useState(()=> storedFav ? storedFav : []); // This state to save favorite projects.
  const [playVid, setPlayVid] = useState("bv_IJ3N6y8U"); // This state for [videoPreview component] to save active video.
  const [filterProjects, setFilterProjects] = useState(loadData); // This state show the projects in [projects component] or hold the changes that comes from buttons filter in [switchLanguge component & filterButtons coponent]. 
  const [langBtn, setLangBtn] = useState('all'); // This state to handle the filtered projects languges in [SwitchLanguage component] and pass new data to [projects component].
  const [activeBtn, setActiveBtn] = useState('all'); // This state to join the result of languages buttons with filtered programming languages or tools.
  const [currentPage, setCurrentPage] = useState(1); // This state to handle the appearance of projects, start with 8 projects and load more using button.
  const [searchTerm, setSearchTerm] = useState(''); // This state to handle search input bar in the [header component].
  const [arLanguage, setArLanguage] = useState(false);
  const [scrollUp, setScrollUp] = useState(false);
  const [showModel, setshowModel] = useState(false);

//-------------------- [ projects component & header component ] -----------------------
// Handle the favorite projects when the heart clicked.
const toggleFavorite = (item) => {
  setFavoriteItems((prev) => {
    const newFavorites = { ...prev };
    if (newFavorites[item.id]) {
      // If the item is already a favorite, remove it
      delete newFavorites[item.id];
    } else {
      // If the item is not a favorite, add it
      newFavorites[item.id] = item;
    }
    return newFavorites;
  });
};
// Handle remove button in favorite list.
const removeFavorite = (itemId) => {
  setFavoriteItems((prev) => {
    const newFavorites = { ...prev };
    delete newFavorites[itemId]; // Remove the item by its ID
    return newFavorites; // Return the updated favorites state
  });
  setshowModel(true);
};
// Save the favorite projects in the local storage.
useEffect(()=> {
  localStorage.setItem("fav", JSON.stringify(favoriteItems))
}, [favoriteItems])


//---------------------- [ videoPreview component ] -----------------------------
// Create function to handle playing videos when the user click on new video.
const runNewVideo = (i)=> {
  document.getElementById("videoPlay").scrollIntoView();
  setPlayVid(i);
  }

//---------------------- [ switchLanguages component ] ---------------------------
//Create function to handle switch buttons for languages English or Arabic
const handleLangProjects = (programLang) => {
  searchTerm.length > 0 && setSearchTerm(''); // Check the search bar first to be able to make a new filter process and override the search value result.
    let langArr = loadData.filter(item => item.lang === programLang);
    let allBtnArr = loadData.filter(item => item.category.includes(activeBtn));
    let engArabicBtnsArr = langArr.filter(item => item.category.includes(activeBtn));

    if(activeBtn === 'all') {
        programLang ? setFilterProjects(langArr) : setFilterProjects(loadData);
      } else {
        programLang ? setFilterProjects(engArabicBtnsArr) : setFilterProjects(allBtnArr) ;
      }     
    return filterProjects
  }

//---------------------- [ filterButtons component ] ---------------------------
// Create function to handle programming language buttons 
  let englishVidArr =  loadData.filter(item => item.lang === 'en');
  let arabicVidArr =  loadData.filter(item => item.lang === 'ar');

  const handleFilterProjects = (toolName) => {
    searchTerm.length > 0 && setSearchTerm(''); // Check the search bar first to be able to make a new filter process and override the search value result.
      let newArr = loadData.filter(item => item.category.includes(toolName));
      if(langBtn === 'all') {
          toolName === 'all' ? setFilterProjects(loadData) : setFilterProjects(newArr);
        } else if (langBtn === 'en') {
          toolName === 'all' ? handleLangProjects('en') : setFilterProjects(englishVidArr.filter(item => item.category.includes(toolName)));  
        } else if (langBtn === 'ar') {
          toolName === 'all' ? handleLangProjects('ar') : setFilterProjects(arabicVidArr.filter(item => item.category.includes(toolName)))
        } 
    }
 
//----------------------  Handle Load More Button -------------------------
const itemsPerPage = 12;
const displayedProjects = filterProjects.slice(0, currentPage * itemsPerPage);
const handleLoadMore = () => {
  setCurrentPage((prevPage) => prevPage + 1);
  console.log(filterProjects.length);
};

//----------------------- [ header component ] ----------------------------
// Create function to handle user input search
const handleSearchInput = (e) => {
let lowerCase = e.target.value.toLowerCase();
    setSearchTerm(lowerCase); 
};
// Filter projects based on search term
const filterSearchedProjects = displayedProjects.filter(project =>
  project.title.toLowerCase().includes(searchTerm) ||
  project.des.toLowerCase().includes(searchTerm)
);

//-------------------------- Scroll Up Button ---------------------------
useEffect(()=> {
  window.addEventListener("scroll", ()=> {
    window.scrollY > 600 ? setScrollUp(true) : setScrollUp(false); 
  })
})

  return (
    <div className='container flex'>
      <Header
        favoriteItems = {favoriteItems}
        removeFavorite = {removeFavorite}
        handleSearchInput = {handleSearchInput}
        runNewVideo = {runNewVideo}
        arLanguage = {arLanguage}
        setArLanguage = {setArLanguage}
        searchTerm = {searchTerm}
        showModel= {showModel}
        setshowModel= {setshowModel}
      />
      <div id='up'></div>
      <Hero
        arLanguage = {arLanguage}
      /> 
      <VideoPreview 
        data = {loadData}
        playVid = {playVid}
      />
      <div className="main">
        <div className="main-left">
          <SwitchLanguage
            handleLangProjects = {handleLangProjects}
            langBtn = {langBtn}
            setLangBtn = {setLangBtn}
          />
          <FilterButtons
            handleFilterProjects = {handleFilterProjects}
            activeBtn = {activeBtn}
            setActiveBtn = {setActiveBtn}
          />
        </div>
        <div className="main-right">
          <Projects 
            filterProjects = {filterSearchedProjects}
            loadData = {loadData}
            runNewVideo = {runNewVideo}
            favoriteItems = {favoriteItems}
            arLanguage = {arLanguage}
            toggleFavorite = {toggleFavorite}
          />
          {/* Add condition to check if there are more projects remain or not by ckeck the length of displayed projects and length of total projects */}
          {displayedProjects.length === filterProjects.length ? <button className='loadMoreBtn grade-bg' onClick={handleLoadMore}>{arLanguage? <p>لا يوجد مزيد</p> : <p>No More</p>}</button> : <button className='loadMoreBtn grade-bg' onClick={handleLoadMore}>{arLanguage? <p>عرض المزيد</p> : <p>Load More</p>}</button>}
        </div>
      </div>
        {/* Add condition to check if the user scroll down so the button appear by change its opacity */}
        <a href="#up" style={{opacity: scrollUp ? 1 : 0, transition: "1s"}}>
        <button className='scroll-up icon-chevron-circle-up'></button>
      </a>
  
     <Footer/>
    </div>
  )
}

export default App

// DEV NOTES: 
// - To deploy steps [https://www.youtube.com/watch?v=XhoWXhyuW_I&ab_channel=EK-developer]
