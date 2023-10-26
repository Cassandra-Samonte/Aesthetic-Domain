import { useState, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import HomePage from '../HomePage'
import DetailsPage from '../DetailsPage'
import SearchPage from '../SearchPage'
import NotFoundPage from '../NotFoundPage'

function App() {
  // Store API data here
  const [artworks, setArtworks] = useState([])
  const [detailsData, setDetailsData] = useState({})

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
      {/* The Nav Bar */}
      <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/">
                <h2 className="text-white font-bold text-2xl">Aesthetic Domain</h2>
              </Link>
            </div>
            <div className="flex-grow">
              <ul className="flex justify-end text-gray-300 text-lg font-medium">
                <li>
                  <Link to="/search">
                    <h4 className="px-3 py-2 hover:text-white">Search for Artwork</h4>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={
          <HomePage
            artworks={artworks}
            getData={getData}
            setDetailsData={setDetailsData}
          />}
        />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/details" element={<DetailsPage {...detailsData} />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>

    </>
  )

}

export default App