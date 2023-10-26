export default function Card({ artworkData, updateDetails }) {
    return (
        <figure onClick={() => { updateDetails(artworkData) }} className="h-[30vh] p-2 cursor-pointer text-center m-2 border-2 border-black rounded-lg bg-gray-700 bg-opacity-70 text-gray-300 hover:text-white hover:bg-gray-800 hover:transform hover:scale-105 shadow-lg transition ease duration-500">
            <img className="w-[15rem] h-[20vh] object-cover rounded m-auto" src={artworkData.images.web.url} />
            <figcaption>
                <h2 className="font-bold w-[15rem] truncate">{artworkData.title}</h2>
                <h3 className="capitalize w-[15rem] truncate">{artworkData.technique}</h3>
            </figcaption>
        </figure>
    )
}