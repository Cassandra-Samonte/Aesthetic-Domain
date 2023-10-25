import Card from '../Card'

export default function Gallery({ artworks }) {
    // The default value of gallery content. What we see before the app finsihes querying the API
    let galleryContent = <p>Your artwork is loading...</p>

    if (artworks.length > 0) {
        galleryContent = artworks.map(artwork => <Card key={artwork.id} artworkData={artwork} />)
    }

    return (
        <div className="gallery">
            {galleryContent}
        </div>
    )
}