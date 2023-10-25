import { useState, useEffect } from 'react'
import Gallery from '../Gallery'
import './styles.css'

function App() {
  // Store API data here
  const [artworks, setArtworks] = useState([])

  // Define an async function to JSONify the query response  
  async function getData(url) {
    const res = await fetch(url)
    const { data } = await res.json()
    setArtworks(artworks.concat(data))
  }

  // Query the API on component mount
  useEffect(() => {
    getData('https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=40')
  }, [])

  //  Create the HTML using JSX for the App component
  return (
    <>
      <h1>Aesthetic Domain</h1>
      <Gallery artworks={artworks} refreshQueue={getData} />
    </>
  )

}

export default App