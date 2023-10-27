import { useState } from 'react'
import Card from '../Card'
import './styles.css'

export default function Gallery({ artworks, refreshQueue, url, updateDetails }) {
    // Keep track of what gallery page the user is viewing
    const [currentPage, setCurrentPage] = useState(1)

    // Event handler for the next Page Button
    function getNextPage(event) {
        refreshQueue(url, event.target.innerText)
        setCurrentPage(currentPage + 1)
    }

    // Event handler for the Previous Page button
    function getPrevPage() {
        setCurrentPage(currentPage - 1)
    }


    // The default value of gallery content. What we see before the app finsihes querying the API
    let galleryContent = <p>Your artwork is loading...</p>

    // Conditionally update the gallery content depending on the current page
    if (artworks.length > 0 && currentPage > 1) {
        const nextPage = currentPage + 1
        galleryContent = artworks
            .slice(currentPage * 20, nextPage * 20) // get the 20 images of the array we want to see
            .map((artwork, i) => <Card key={i} artworkData={artwork} updateDetails={updateDetails} />) // map over the 20 images and render them in Card components
    } else if (artworks.length > 0 && currentPage === 1) {
        galleryContent = artworks
            .slice(0, 20) // get the first 20 artworks when on the first page
            .map((artwork, i) => <Card key={i} artworkData={artwork} updateDetails={updateDetails} />)
    }

    // Save button class names to a variable
    const btnClasses = 'text-gray-300 hover:text-white hover:bg-gray-800 font-bold p-3 bg-gray-700 rounded cursor-pointer'

    return (
        <>
            <div className="flex flex-wrap justify-around p-10">
                {galleryContent}
            </div>

            <div className='py-16 px-20 flex justify-between'>
                <button className={btnClasses} onClick={getPrevPage}>Previous Page</button>
                <button className={btnClasses} onClick={getNextPage}>Next Page</button>
            </div>
        </>
    )
}