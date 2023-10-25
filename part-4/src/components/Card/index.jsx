import './styles.css'

export default function Card({ artworkData }) {
    return (
        <figure>
            <img src={artworkData.images.web.url} />
            <figcaption>
                <h2>{artworkData.title}</h2>
                <h3>{artworkData.technique}</h3>
            </figcaption>
        </figure>
    )
}