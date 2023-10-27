# Part 6 - Forms
<img width="100%" src="https://i.imgur.com/74Jo3kf.png" />


## MVP Checklist
So far we've accomplished:
- [x] Connect our application to the API
- [x] Load artwork into a gallery when our application loads
- [x] Display 20 artwork cards in the gallery at a time, and paginate through all artworks pulled from the API
- [x] When an artwork card is clicked on, display a details page that shows more information about the piece of art
- [ ] Sign up/login capabilities
- [ ] Allow guest users (users that are not logged in) to browse the museum, and view comments, but restrict them from creating comments or reacting to artwok
- [ ] Logged in users will be able to browse the museum, react to artwork, and add comments. Additionally, they will be able to edit or delete their own comments
- [x] Style the site with [Tailwind CSS](https://tailwindcss.com/)

We've made a good amount of progress so far! So far the only functionalities that we're missing are:
- Authentication & authorization capabilities
- Allowing unauthenticated users to browse the museum

We're going to begin working on the second functionality from above in this part of Aesthetic Domain.


## Set Up
You can pick up from where you left off in Part 5, or you can clone the starter code. If you're cloning the code make sure to follow these steps:
```
git clone https://git.generalassemb.ly/SEIR-Titans/Aesthetic-Domain.git

cd Aesthetic-Domain/part-6

npm i

npm run dev

code .
```


## Searching the API
Earlier today we created a `SearchPage` component with it's own route. Currently this is just a placeholder component and has no functionality. What we'll do is allow users to query the API and search for artwork. This mean's we'll need to get user input (using a form) and search the API with the user's query.


### Endpoint Testing
We've been using this endpoint: https://openaccess-api.clevelandart.org/api/artworks/

In Part 1 we took a look at [the docs](https://openaccess-api.clevelandart.org/) and saw the endpoint allowed us to use various parameters. We've used paramters that help us paginate through the API, only get artworks with images, and limit the number o fresults we get back.

There's another paramter, `q`, that will allow us to pass a search string in to the API like this:
```
https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=20&q=YOUR SEARCH STRING HERE
```
Go ahead and test this out in Postman!


### Build a Search Bar in `SearchPage`
Now that we've had a chance to test out the endpoint, let's create serach bar in the `SearchPage` component that will:
1. Capture user input
1. When submitted, put the user's input in our API `fetch` request
1. Save the respons in a state variable.

Let's build out the form first:
```jsx
return (
    <div className="search-page p-10">
        <form className="mt-4 text-center">
            <label htmlFor="search" className="block font-medium mb-1">
                <h1 className="text-3xl font-bold">Search for Art</h1>
            </label>
            <br />
            <input
                className="p-2 w-[60vw] rounded border border-gray-300 focus:outline-none focus:border-gray-500"
                name="search"
                placeholder="beautiful landscape..."
            />
            <button
                type="submit"
                className="mx-1 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 bg-gray-700 rounded transition-all duration-200"
            >
                Search
            </button>
        </form>
    </div>
)
```
Perfect, we now have a search bar, styled with Tailwind! However, you'll notice this is an uncontrolled form, meaning Reat can't control or read what is being typed into it. We'll need to use some event listeners to read the user's input, and state to save it.
- Import `useState` and create a state declaration that will contain our form input:
    ```jsx
    import { useState } from "react"

    export default function SearchPage() {
        // Store search term and API data here
        const [query, setQuery] = useState('')

        // return block here...
    }
    ```
- Now we can add our event listeners and handlers that will save the form's input to state. Update the form so that it has `onChange` and `onSubmit` attributes:
    ```jsx
    <form onSubmit={handleQuerySubmit} className="mt-4 text-center">
        <label htmlFor="search" className="block font-medium mb-1">
            <h1 className="text-3xl font-bold">Search for Art</h1>
        </label>
        <br />
        <input
            className="p-2 w-[60vw] rounded border border-gray-300 focus:outline-none focus:border-gray-500"
            name="search"
            placeholder="beautiful landscape..."
            value={query}
            onChange={event => setQuery(event.target.value)}
        />
        <button
            type="submit"
            className="mx-1 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 bg-gray-700 rounded transition-all duration-200"
        >
            Search
        </button>
    </form>
    ```
- We'll need to create an event handler for the `handleQuerySubmit` function as well:
    ```jsx
    function handleQuerySubmit(event) {
        // prevent the form from loading
        event.preventDefault()
        // print what the user typed into the form
        console.log(query)
    }
    ```

Excellent! We now have a fully functional controleld form


### Query the API with User Input
In `App` we created a function called `getData` that would get data from the API and then update the `App` state with the results. Similarly, we'll need a `getData` function that gets data from the API. However, if we used the same function from `App`, all of our `artworks` data would get overwritten every time the user searches for something. 

The solution is to make a new `getData` function inside `SearchPage` - but rather than updating the `App` component's state, it will update the `SearchPage` state with our results.

Create a new state declaration that will store the search results:
```jsx
const [queryResults, setQueryResults] = useState([])
```

And then create a new `getData` function that will update `queryResults`:
```jsx
// Define an async function to query the API & JSONify the response
async function getData(url) {
    const res = await fetch(url)
    const { data } = await res.json() // destructure the JSON response
    setQueryResults([...queryResults, ...data])
}
```

Now all we need to do is execute the `getData` function inside our `handleQuerySubmit` function!
```jsx
function handleQuerySubmit(event) {
    // prevent the form from loading
    event.preventDefault()
    // clear the previous query's data
    setQueryResults([])
    // send a request to the API with the query string 
    getData(`https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=40&q=${query}`)
}
```
Open up React Dev Tools and use the search bar to search for artwork. Observe what happens to the `queryResults` variable on form submit!


## Display the Search Results
Now that we're storing the results of each search in state, we can render the state data on our page. Remember our `Gallery` component? it sure does a fine job at displaying artworks, and comes complete with pagination! Why not reuse it in our `SearchPage`?


### Refactor the `Gallery`
Our `Gallery` is pretty much plug and play - meaning we can reuse it anywhere in our app. There is just one small issue we'll need to address. Let's take a look at the `refreshQueue` function we built:
```jsx
function getNextPage() {
    refreshQueue(`https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=20&skip=${artworks.length}`)
    setCurrentPage(currentPage + 1)
}
```
Uh-oh, looks like we have a hardcoded URL! This means every time the "Next Page" button is pressed it will make a generic query, rather than a query with the user's input. We can fix this by replacing the hardcoded URL with a `prop` that is passed into the Gallery component. Doing so will allow `HomePage` to pass in the generic search URL, and `SearchPage` to pass in the specific search URL.

To make this change we'll need to do the following:
- Refactor the `Gallery` component to accept a `url` property:
    ```jsx
    export default function Gallery({ artworks, refreshQueue, url, updateDetails }) {
        const [currentPage, setCurrentPage] = useState(1)

        // Query more artwork when the "Next Page" button is clicked
        function getNextPage() {
            refreshQueue(url)
            setCurrentPage(currentPage + 1)
        }

    // more pagination logic and the return block go here...
    ```
- Pass the `url` prop from `HomePage`;
    ```jsx
    return (
        <>
            <h1>Browse the gallery below!</h1>

            <Gallery
                artworks={props.artworks}
                refreshQueue={props.getData}
                url={`https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=20&skip=${props.artworks.length}`}
                updateDetails={props.setDetailsData}
            />
        </>
    )
    ```
Awesome, now our Gallery is ready to be rendered anywhere!


### Render the `Gallery` inside `SearchPage`
Go ahead and import the `Gallery` inside `SearchPage`
```jsx
import Gallery from "../Gallery"
```

Now render `Gallery` in the return block:
```jsx
return (
        <div className="search-page p-10">
            {/* FORM JSX GOES HERE*/}

            <Gallery
                artworks={queryResults}
                refreshQueue={getData}
                url={`https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=20&&q=${query}&skip=${queryResults.length}`}
                updateDetails={props.setDetailsData}
            />
        </div>
    )
```
We're getting an error!! What's the issue? This bit of code right here:
```jsx
updateDetails={props.setDetailsData}
```

We need to pass the `updateDetails` prop to our Gallery so each Card can update the Details page, but the `setDetailsData` comes from `App`. This means we'll have to pass it as props to `SearchPage`. Do the following:
- Pass the props to `SearchPage` from `App/index.jsx`:
    ```jsx
    <Route path="/search" element={<SearchPage setDetailsData={setDetailsData} />} />
    ```
- Accept the props in `SearchPage`:
    ```jsx
    export default function SearchPage(props) {
        // Component logic goes here...
    }
    ```


Now everything works and you have a functioning search page!