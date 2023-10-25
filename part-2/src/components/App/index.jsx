import { useState, useEffect } from 'react'
import './styles.css'

function App() {
  // Store API data here
  const [artworks, setArtworks] = useState([])

  // Query the API on component mount
  useEffect(() => {

    // Define an async function to JSONify the query response  
    async function getData() {
      const res = await fetch('https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=20')
      const { data } = await res.json()
      setArtworks(data)
    }

    // Call the async function
    getData()
  }, [])

  //  Create the HTML using JSX for the App component
  return (
    <>
      <h1>Aesthetic Domain</h1>
      {artworks.length > 0 ? <img src={artworks[1].images.web.url} /> : <p>Your artwork is loading...</p>}
    </>
  )

}

export default App