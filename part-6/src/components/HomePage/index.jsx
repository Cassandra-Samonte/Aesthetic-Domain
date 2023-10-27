import Gallery from '../Gallery'

export default function HomePage(props) {
    return (
        <>
            <h1>Browse the gallery below!</h1>

            <Gallery
                artworks={props.artworks}
                refreshQueue={props.getData}
                updateDetails={props.setDetailsData}
                url={`https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=20&skip=${props.artworks.length}`}
            />
        </>
    )
}