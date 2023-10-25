# Part 4 - Lifting State & Prop Drilling
<img width="100%" src="https://i.imgur.com/Ui3w9zJ.png" />


## MVP Checklist
So far we've accomplished:
- [x] Connect our application to the API
- [x] Load artwork into a gallery when our application loads
- [x] Display 20 artwork cards in the gallery at a time, and paginate through all artworks pulled from the API
- [ ] When an artwork card is clicked on, display a details page that shows more information about the piece of art
- [ ] Sign up/login capabilities
- [ ] Allow guest users (users that are not logged in) to browse the museum and view comments, but restrict them from creating comments
- [ ] Logged in users will be able to browse the museum, react to artwork, and add comments. Additionally, they will be able to edit or delete their own comments
- [ ] Style the site with [Tailwind CSS](https://tailwindcss.com/)

Currently users can only see a limited amount of information about each artwork. With previous applications we've built, users were able to get a more detailed view of some piece of data using a Show/Details Page. 

In this part of Aesthetic Domain we'll be building a `Details` component that will dynamically render information when an artwork card is clicked.


## Set Up
You can pick up from where you left off in Part 3, or you can clone the starter code. If you're cloning the code make sure to follow these steps:
```
git clone https://git.generalassemb.ly/SEIR-Titans/Aesthetic-Domain.git

cd Aesthetic-Domain/part-4

npm i

npm run dev

code .
```


## Create the `Details` Component
Before we change the `Card` component or any state declarations let's get an idea of what we're going to display when a `Card` is clicked.
1. Create a new folder called `Details` inside the `components` folder.
1. Create an `index.jsx` file inside the `Details` folder
1. Add the following code to the `index.jsx` file:
    ```jsx
    export default function Details({ title, type, technique, department }) {
        return (
            <div>
                <h1>{title}</h1>
                <h3>{type}: {technique}</h3>
                <p>Categorized as {department}</p>
            </div>
        )
    }
    ```
    Note that the `Details` component is set up to accept a props object that contains various keys.
1. Import the `Details` component into `App/index.jsx`:
    ```jsx
    import Details from '../Details'
    ```
1. In the next part we'll learn how to display the `Details` component on its own "page", but for now we'll display below the `Gallery`.
    ```jsx
    return (
        <>
            <h1>Aesthetic Domain</h1>
            
            <Gallery artworks={artworks} refreshQueue={getData} />
            
            {/* We can either use a normal ternary or a double ampersand */}
            {/* {artworks.length > 0 ? <Details {...artworks[18]} /> : null} */}
            {artworks.length > 0 && <Details {...artworks[18]} />}
        </>
    )
    ```
    Here we've conditionally rendered the `Details` component to display the 19th artwork once we get data back from the API. We'll change this later on, but for now this allows us to see if our `Details` component is rendering correctly


## Sharing Data Between Siblings
The `Details` component is being rendered inside the `App` component, so how will `Card` be able to pass it's data to `Details`? The picture below demonstartes our dilemma. Currently there's no way for `Card` and `Details` to talk to each other.

![](https://i.imgur.com/dHeNrFO.png)

We'll have to pass data from the `Card` up high enough in the hierarchy so that `Details` will be able to access it. The only component other component that is linked to both `Card` and `Details` is the `App` component, meaning we'll have to lift state up to `App`.


### Lifting State & Prop Drilling
- The `Card` component will need to pass its artwork data as an object up to a state variable in `App`. Let's make our lifted state declaration inside `App/index.jsx`:
    ```jsx
    const [detailsData, setDetailsData] = useState({})
    ```
    The default value is an empty object because when `App` first mounts there is no artwork data.
- Now we need to pass down the `setDetailsData` function into the `Card` component so that each `Card` will be able to update the `detailsData` variable. To do this, we have pass the `setDetailsData` function as props into `Gallery` and from `Gallery` into `Card`. Passing the same props down through multiple components is known as *prop drilling*.
    ```jsx
    // App/index.jsx

    return (
        <>
            <h1>Aesthetic Domain</h1>
            
            <Gallery 
                artworks={artworks}
                refreshQueue={getData}
                updateDetails={setDetailsData}
            />
            
            {/* We can either use a normal ternary or a double ampersand */}
            {/* {artworks.length > 0 ? <Details {...artworks[18]} /> : null} */}
            {artworks.length > 0 && <Details {...artworks[18]} />}
        </>
    )
    ```
    ```jsx
    // Gallery/index.jsx

    export default function Gallery({ artworks, refreshQueue, updateDetails }) {
        
        // pagination logic here...

        if (artworks.length > 0 && currentPage > 1) {
            const nextPage = currentPage + 1

            galleryContent = artworks
                .slice(currentPage * 20, nextPage * 20) // get the 20 images of the array we want to see
                .map(artwork => {
                    return <Card key={artwork.id} artworkData={artwork} updateDetails={updateDetails} />
                }) // map over the 20 images and render them in Card components

        } else if (artworks.length > 0 && currentPage == 1) {
            galleryContent = artworks
                .slice(0, 20) // get the first 20 artworks when on the first page
                .map(artwork => {
                    return <Card key={artwork.id} artworkData={artwork} updateDetails={updateDetails} />
                })
        }

        // return block here...
    }
    ```
    Now our `Card` has the ability to change the `detailsData` variable all the way up in `App/index.jsx`!


## Make `Card` Clickable
If we want the user to be able to click anywhere on the car to change `detailsData`, we'll need to make sure the topmost HTML element has an `onClick` attribute.

Update `Card/index.jsx`:
```jsx
export default function Card({ artworkData, updateDetails }) {
    return (
        <figure onClick={() => updateDetails(artworkData) }>
            <img src={artworkData.images.web.url} />
            <figcaption>
                <h2>{artworkData.title}</h2>
                <h3>{artworkData.technique}</h3>
            </figcaption>
        </figure>
    )
}
```
Awesome! Each card now updates our `detailsData` variable!! Now we just need to render it inside `Details`.


## Render the Lifted State
Currently the `Details` element is display a hardcoded artwork. Let's update it so that it's displaying our `detailsData`:
```jsx
// App/index.jsx
{detailsData.id && <Details {...detailsData} />}
```
Now our details page will only render if we've clicked on an artwork, and it will show us more detailed information about that artwork.



## Wrap Up
Excellent work!! We now have a functional details component that dynamically renders artwork data.

In Part 5, we'll work with React Router to display the details component on it's own "page."