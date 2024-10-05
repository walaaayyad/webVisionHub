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
  const [favoriteItems, setFavoriteItems] = useState({});
  const [userFavoriteList, setUserFavoriteList] = useState([]); // This state to hold favorite items that comes from [project component] and send this state to [header component] model list.
  const loadData = Data; // Import data from JSON file.
  const [playVid, setPlayVid] = useState("bv_IJ3N6y8U"); // This state for [videoPreview component] to save active video.
  const [filterProjects, setFilterProjects] = useState(loadData); // This state show the projects in [projects component] or hold the changes that comes from buttons filter in [switchLanguge component & filterButtons coponent]. 
  const [langBtn, setLangBtn] = useState('all'); // This state to handle the filtered projects languges in [SwitchLanguage component] and pass new data to [projects component].
  const [activeBtn, setActiveBtn] = useState('all'); // This state to join the result of languages buttons with filtered programming languages or tools.
  const [currentPage, setCurrentPage] = useState(1); // This state to handle the appearance of projects, start with 8 projects and load more using button.
  const [searchTerm, setSearchTerm] = useState(''); // This state to handle search input bar in the [header component].
  const [arLanguage, setArLanguage] = useState(false);
  const [scrollUp, setScrollUp] = useState(false);
  
  //-------------------- [ header component] -----------------------
  // Add Favorite Items in LocalStorage
  useEffect(()=> {
    const favList = localStorage.getItem("favoriteItems");
      setUserFavoriteList(favList && favList.length > 0 ? JSON.parse(favList):[]);
  }, [])

  // Update local storage whenever favorites change
  useEffect(()=> {
     userFavoriteList.length > 0 && localStorage.setItem("favoriteItems", JSON.stringify(userFavoriteList));
  }, [userFavoriteList]) 


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
  project.title.toLowerCase().includes(searchTerm)
);
// Creat function to handle removed item from the favorite list & remove active state from its card
const removeItemHandler = (id)=> {
  setUserFavoriteList((prevList) => prevList.filter(item => item.id !== id));
  setFavoriteItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
}
// Create function to handle Language checkbox
// const arabicLanguageHandler = () => {
//   setArLanguage=(!arLanguage)
//   console.log('arabic lan work')
// }

//-------------------------- Scroll Up Button ---------------------------
useEffect(()=> {
  window.addEventListener("scroll", ()=> {
    window.scrollY > 600 ? setScrollUp(true) : setScrollUp(false); 
  })
})

console.log(searchTerm);
  return (
    <div className='container flex'>
      <Header
        userFavoriteList = {userFavoriteList}
        handleSearchInput = {handleSearchInput}
        runNewVideo = {runNewVideo}
        removeItemHandler = {removeItemHandler}
        arLanguage = {arLanguage}
        setArLanguage = {setArLanguage}
        searchTerm = {searchTerm}
      />
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
            setUserFavoriteList = {setUserFavoriteList}
            favoriteItems = {favoriteItems}
            setFavoriteItems = {setFavoriteItems}
            arLanguage = {arLanguage}
          />
          {/* Add condition to check if there are more projects remain or not by ckeck the length of displayed projects and length of total projects */}
          {displayedProjects.length === filterProjects.length ? <button className='loadMoreBtn grade-bg' onClick={handleLoadMore}>{arLanguage? <p>لا يوجد مزيد</p> : <p>No More</p>}</button> : <button className='loadMoreBtn grade-bg' onClick={handleLoadMore}>{arLanguage? <p>عرض المزيد</p> : <p>Load More</p>}</button>}
        </div>
      </div>
        {/* Add condition to check if the user scroll down so the button appear by change its opacity */}
        <a href="#hero" style={{opacity: scrollUp ? 1 : 0, transition: "1s"}}>
        <button className='scroll-up icon-chevron-circle-up'></button>
      </a>
  
     <Footer/>
    </div>
  )
}

export default App

// DEV NOTES: 
// - To deploy steps [https://www.youtube.com/watch?v=XhoWXhyuW_I&ab_channel=EK-developer]
