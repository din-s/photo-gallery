import React, {useState} from "react";
import "./style.css";
import { createClient } from 'pexels';


export default function App() {

  const [inputQuery, setInputQuery]= useState("")

  // for berevity I will not commit personal API Key
  const myAPIKey = "YOUR_API_KEY"
  const client = createClient(myAPIKey);
  let apiQuery = "Beautiful, Cars, Books";
  const [photos, setPhotos] = useState([])

  // init gallery
  /* client
  .photos
  .search({ query: apiQuery, per_page: 10 })
  .then(photos => {
    console.log(photos)
    setPhotos(photos)
  }); */


  const onQueryChange = (e) => {
    setInputQuery(e.target.value)
  }

  const onKeyPress = (e) => {
      console.log(e);
      if (e.keyCode == 13 || e.code == "Enter" || e.key =="Enter") {
         // publish a API request
         apiQuery = inputQuery;

         client.photos.search({ query: apiQuery, per_page: 10 }).then(photos => {
           console.log("log", photos.photos)
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
      </header>
      <main className="gallery">
        {
          photos.map((photo) => (
            <img src={photo.src.medium} alt={photo.alt} width="200px" heigth="200px" />
          ))
        }
      </main>
    </div>
  );
}
