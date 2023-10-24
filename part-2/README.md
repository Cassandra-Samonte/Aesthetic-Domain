# Part 2 - Props
<img width="100%" src="https://i.imgur.com/7KJ5cFA.png" />


## MVP Checklist
So far we've accomplished:
- [x] Connect our application to the API
- [ ] Load artwork into a gallery when our application loads
- [ ] Display 20 artwork cards in the gallery at a time, and paginate through all artworks pulled from the API
- [ ] When an artwork card is clicked on, display a details page that shows more information about the piece of art
- [ ] Sign up/login capabilities
- [ ] Allow guest users (users that are not logged in) to browse the museum and view comments, but restrict them from creating comments
- [ ] Logged in users will be able to browse the museum, react to artwork, and add comments. Additionally, they will be able to edit or delete their own comments
- [ ] Style the site with [Tailwind CSS](https://tailwindcss.com/)

Currently our application is already set up to query the API when the component mounts, but we haven't done anything with the data except conditionally render a hardcoded image. 

We're going to work on the next two items in the checklist and dynamically render 20 artworks in a gallery.


## Set Up
You can pick up from where you left off in Part 1, or you can clone the starter code. If you're cloning the code make sure to follow these steps:
```
git clone https://git.generalassemb.ly/SEIR-Titans/Aesthetic-Domain.git

cd Aesthetic-Domain/part-2

npm i

npm run dev

code .
```


## Create the Card Component
Let's make a `Card` component that will display more information about each artwork beside just the image.
1. Create a new folder called `Card` inside the `components` folder.
1. Create an `index.jsx` file inside the `Card` folder
1. Add the following code to the `index.jsx` file:
    ```jsx
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
    ```
    Note that the `Card` component is set up to accept a props variable called `artworkData`.


## Create the Gallery Component
Let's make a `Gallery` component that will contain 20 of our artwork Cards. In Part 3 of Aesthetic Domain, the gallery will also contain several functions that will allow us to paginate through all of the artwork in our API, 20 pieces at time. Let's get started:
1. Create a new folder called `Gallery` inside the `components` folder.
1. Create an `index.jsx` file inside the `Gallery` folder
1. Add the following code to the `index.jsx` file:
    ```jsx
    import Card from '../Card'

    export default function Gallery({ artworks }) {
        return (
            <div className="gallery">
                {artworks.length > 0 ? <Card artworkData={artworks[1]} /> : <p>Your artwork is loading...</p>}
            </div>
        )
    }
    ```
    - We imported the `Card` component into the `Gallery` component. Currently the `Gallery` is displaying one `Card`.
    - Note that the `Gallery` component is set up to accept a props variable called `artworks`.

1. Now we need to import `Gallery` into `App`. At the top of `App/index.jsx` add the following:
    ```jsx
    import Gallery from '../Gallery'
    ```
1. Now let's use our Gallery component! Refactor the return block of `App/index.jsx` so that it looks like this:
    ```jsx
    return (
        <>
          <h1>Aesthetic Domain</h1>
          <Gallery artworks={artworks} />
        </>
    )
    ```
    Our page now conditionally renders a Card component once we get data back from the API! Great work!


## Conditionally Render Multiple Cards
We'll revist our `Gallery` component since we want it to display 20 artwork cards and currently it's only displaying 1.

Let's create `Card` components for every artwork in the `artworks` state variable:
```js
{artworks.length > 0 ? artworks.map(artwork => <Card key={artwork.id} artworkData={artwork} />) : <p>Your artwork is loading...</p>}
```
Here we looped over the `artworks` variable using `map` and dynamically created a unqiue `Card` component for each artwork. However, this looks a little messy and is hard to follow.

We can conditionally render this in a different way - above the `return` block! React is awesome and lets us create JSX elements anywhere inside our component function. We can do this:
```jsx
// The default value of gallery content. What we see before the app finsihes querying the API
let galleryContent = <p>Your artwork is loading...</p>

// Conditionally update the gallery content after the API returns data
if (artworks.length > 0) {
    galleryContent = artworks
        .map((artwork, i) => <Card key={i} artworkData={artwork} />)
}

//  Create the HTML using JSX for the App component
return (
    <>
      <h1>Aesthetic Domain</h1>

      <div className='gallery'>
        {galleryContent}
      </div>
    </>
)
```
This is the same as what we had before, but a lot neater! Here's what we did:
- We moved our conditional outside of the return block and saved the value of our JSX to a variable called `galleryContent`
- We then referenced the `galleryContent` variable inside the return block. As our state updates, the `galleryContent` variable changes

Congratulation! We now have 20 artworks being loaded inside a gallery!!


## Wrap Up
In this second part of Aesthetic Domain we've created two new components, passed data between them and the App component using props, and learned a new way to conditionally render data in JSX.

In the next part we'll learn how to leverage state to create a pagination feature in our gallery.
