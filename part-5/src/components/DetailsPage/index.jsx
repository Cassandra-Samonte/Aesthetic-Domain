import "./styles.css"

export default function DetailsPage(props) {
    console.log(props)
    return (
        <div className="bg-gray-100 h-[92vh] flex border border-black">
            <div className="w-1/2 px-2">
                <h1 className="text-3xl font-bold leading-tight text-gray-900">{props.title}</h1>

                <ul className="mt-1">
                    {props.exhibitions.current.map((exhibition) => (
                        <li key={exhibition.id} className="text-lg font-medium leading-normal text-gray-700 py-1">
                            – {exhibition.title.split(':')[0]}:<i>{exhibition.title.split(':')[1]}</i>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="image-container w-1/2 px-2">
                <figure>
                    <img src={props.images.web.url} className="h-[70vh] w-full object-cover rounded" />
                </figure>
                <figcaption>
                    <p className="text-center">
                        <span className="text-xl">Did you know?</span>
                        <br />
                        <i>{props.did_you_know}</i>
                    </p>
                </figcaption>
            </div>
        </div>
    )
}