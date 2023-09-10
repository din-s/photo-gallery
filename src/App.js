import React, {useState, useEffect} from "react";
import "./style.css";
import { createClient } from 'pexels';


export default function App() {

  const [inputQuery, setInputQuery]= useState("")

  // for berevity I will not commit personal API Key
  const myAPIKey = "U3D0ztTdnkaW03FBTPn1xMA9yQL9p4w6GNeWb9LP2EMDWdKMTb4TqmOU"
  const client = createClient(myAPIKey);
  let apiQuery = "Beautiful, Cars, Books";
  const [photos, setPhotos] = useState([])

  // init gallery
  useEffect(() => {
    client
    .photos
    .search({ query: apiQuery, per_page: 10 })
    .then(photos => {
      setPhotos(photos.photos)
      }
    );

  }, [inputQuery])
  


  const onQueryChange = (e) => {
    setInputQuery(e.target.value)
  }

  const onKeyPress = (e) => {
      if (e.keyCode == 13 || e.code == "Enter" || e.key =="Enter") {
         // publish a API request
         apiQuery = inputQuery;

         client.photos.search({ query: apiQuery, per_page: 10 }).then(photos => {
           setPhotos(photos.photos)});
      } else {
         return false;
      }
  }
  return (
    <div className="app">
      <header>
      <h1>Snap Shot</h1>
      <input className="search-box" placeholder="Search Image" value={inputQuery} onChange={(e) => onQueryChange(e)} onKeyPress={(e) => onKeyPress(e)}/>
      <p className="trending-container"> 
      <span className="trending-static">Trending: <span className="trending-topics">Beautiful, Cars, books</span></span>
      </p>
      <p class="info"><div class="icon">&#9888;</div> <div><strong>Info</strong>: For gallery to update below please Input your search query and hit Enter to see the updates. This has been designed to reduce the load resource provider</div></p>
      </header>
      <main className="gallery">
        {
          photos.length && photos.map((photo, index) => (
            <img key={index} src={photo.src.medium} alt={photo.alt} width="200px" heigth="200px" />
          ))
        }
      </main>
    </div>
  );
}
