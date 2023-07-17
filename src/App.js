import React, {useState} from "react";
import "./style.css";
import { createClient } from 'pexels';


export default function App() {

  const [inputQuery, setInputQuery]= useState("")

  // for berevirty I will not commit API Key
  const myAPIKey = "U3D0ztTdnkaW03FBTPn1xMA9yQL9p4w6GNeWb9LP2EMDWdKMTb4TqmOU"; 
  const client = createClient(myAPIKey);
  let apiQuery = "Beautiful, Cars, Books";
  const [photos, setPhotos] = useState([])

  // init gallery
  client
  .photos
  .search({ apiQuery, per_page: 10 })
  .then(photos => {
    console.log(photos)
    setPhotos(photos)
  });


  const onQueryChange = (e) => {
    setInputQuery(e.target.value)
  }

  const onKeyPress = (e) => {
      console.log(e);
      if (e.keyCode == 13 || e.code == "Enter" || e.key =="Enter") {
         // publish a API request
         apiQuery = inputQuery;

         client.photos.search({ apiQuery, per_page: 10 }).then(photos => {console.log(photos)});
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
            <div>{photo}
            </div>
          ))
        }
      </main>
    </div>
  );
}
