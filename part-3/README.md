# Part 3 - Pagination
<img width="100%" src="https://i.imgur.com/3j6YYk6.png" />


## MVP Checklist
So far we've accomplished:
- [x] Connect our application to the API
- [x] Load artwork into a gallery when our application loads
- [ ] Display 20 artwork cards in the gallery at a time, and paginate through all artworks pulled from the API
- [ ] When an artwork card is clicked on, display a details page that shows more information about the piece of art
- [ ] Sign up/login capabilities
- [ ] Allow guest users (users that are not logged in) to browse the museum and view comments, but restrict them from creating comments
- [ ] Logged in users will be able to browse the museum, react to artwork, and add comments. Additionally, they will be able to edit or delete their own comments
- [ ] Style the site with [Tailwind CSS](https://tailwindcss.com/)

We're halfway done with the third checkbox, since our application is dynamically rendering 20 artworks in a gallery. However, we want users to browse all 35,000+ wonderful artworks that our API provides. Unfortunately, rendering over 35,000 Card Components all at once would freeze browsers and make the app unusable. The solution is to paginate the gallery! 

In this part of Aesthetic Domain we'll leverage the full power of state and build out a pagination feature for our site that allows us to gradually query artworks and cache them in state.

**NOTE:** The purpose of this exercise today is get even more practice with state and get more comofortable with React concepts such as props and conditional rendering. You will not be expected to incorporate pagination in your Unit 4 Project, but you could include it as a stretch goal.


## Set Up
You can pick up from where you left off in Part 2, or you can clone the starter code. If you're cloning the code make sure to follow these steps:
```
git clone https://git.generalassemb.ly/SEIR-Titans/Aesthetic-Domain.git

cd Aesthetic-Domain/part-3

npm i

npm run dev

code .
```


## Expected Behavior
- We will initially query the API for 40 artworks, but only display 20. This means we will have 20 artworks being displayed and and additional 20 queued up.
- When we click on the "Next Page" button we will view the 20 queued artworks and query an additional 20 artworks to refill the queue.
- We will continue to query artworks and advance through gallery pages until there are no more artworks left in the API.
- We also want to navigate back previous pages, so we will need to create a "Previous Page" button.
    - However, we don't want to re-query the API for artwork that has already been fetched, so it will be important to store artwork in state even after it is no longer being displayed in the gallery.


## Implementing Pagination
All of our pagination logic will be handled by the `Gallery` component, that way we can keep our `App` component tidy and concise. We will make a few adjustments to `App`, but for the most part all of our pagination state, event handlers, etc will be stored inside `Gallery/index.jsx`.

- First, we need to create state declaration in `Gallery` to keep track of what page our gallery is displaying. This will affect which pieces of art we render from the `artworks` array.
    ```jsx
    import { useState } from 'react'
    ```
    ```jsx
    const [currentPage, setCurrentPage] = useState(1)
    ```
    Here, we've created a state variable called `currentPage` with  default value of 1 so that our `Gallery` component will render page 1 on mount.
- Next, we need to update our `getData` function in the `App` component. Currently it is defined and used only once. We need to be able to call this function every time we click the "Next Page" button so that it refills our queue of images with new data. Update your `App` component so that the `getData` function is defined outside the `useEffect`:
    ```jsx
    // Define an async function to query the API & JSONify the response  
    async function getData(url) {
        const res = await fetch(url)
        const { data } = await res.json()
        setArtworks([...artworks, ...data])
    }

    // Query the API on component mount, and get 40 artworks.
    useEffect(() => {
        getData('https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=40')
    }, [])
    ```
    - Notice how we also have set up the `getData` function with a parameter. We've done this because each time we press the "Next Page" button we will nbeed to be calling the `getData` function with a new URL.
    - You'll also see that we used array destructuring so that the new API data, when returned, will only be appened to the data we already had. This is the behavior that we want since we don't want to re-query the API for artwork we've already acquired.
- Since `Gallery` is going to be calling the `getData` function, we'll need to pass it down as props into `Gallery`. Update your `App/index.jsx`:
    ```jsx
    return (
        <>
            <h1>Aesthetic Domain</h1>
            <Gallery artworks={artworks} refreshQueue={getData} />
        </>
    )
    ```
    Don't forget that we'll need to accept props inside the `Gallery` function:
    ```jsx
    export default function Gallery({ artworks, refreshQueue }) {
        // component's code here...
    }
    ```
- Now that we've got what we need from the `App` component, let's continue working with the `Gallery` component. We'll need to create a `div` to store our pagination controls (the "Next Page" and "Previous Page" buttons). Update your `return` block in `Gallery/index.jsx` so that it looks like this:
    ```jsx
    return (
        <>
          <div className='gallery'>
            {galleryContent}
          </div>

          <div className='page-controls'>
            <button onClick={getPrevPage}>Previous Page</button>
            <button onClick={getNextPage}>Next Page</button>
          </div>
        </>
    )
    ```
- Our page controls will execute event handler functions when they are clicked on. Inside the `Gallery` component add the following event handlers:
    ```jsx
    function getNextPage() {
        refreshQueue(`https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=20&skip=${artworks.length}`)
        setCurrentPage(currentPage + 1)
    }

    // Update the current page so that gallery content changes
    function getPrevPage() {
        setCurrentPage(currentPage - 1)
    }
    ```
    - `getNextPage` will update our state variable called `currentPage` and query the API to refill our queue with 20 more artworks
    - `getPreviousPage` will only update our state variable called `currentPage`
- Excellent, we're almost done! If you click on our page controls, you'll notice that they do in fact update the `currentPage` state, and the "NextPage" button adds new data to the `artworks` array. However, our gallery is not responsive to the `currentPage` state. 
- Update the conditional rendering of `galleryContent` so that a new 20 artworks are rendered when we navigate to a new page:
    ```jsx
    // The default value of gallery content. What we see before the app finsihes querying the API
    let galleryContent = <p>Your artwork is loading...</p>

    // Conditionally update the gallery content depending on the current page
    if (artworks.length > 0 && currentPage > 1) {
        const nextPage = currentPage + 1
        galleryContent = artworks
            .slice(currentPage * 20, nextPage * 20) // get the 20 images of the array we want to see
            .map((artwork, i) => <Card key={i} artworkData={artwork} />) // map over the 20 images and render them in Card components
    } else if (artworks.length > 0 && currentPage === 1) {
        galleryContent = artworks
            .slice(0, 20) // get the first 20 artworks when on the first page
            .map((artwork, i) => <Card key={i} artworkData={artwork} />)
    }
    ```
    - When we are on the first page of the gallery, our `galleryContent` is set to display the first 20 artworks 
        - We use the `slice` method to display 20 artworks, because the `artworks` array will have 40 artworks total, and we want to have queue of 20. 
            - The queue of 20 is important because it means the user won't have to wait for an API query when they press the "Next Page" button. Rather, the next 20 artworks will instantly display and our application will queue up 20 more in the background.
    - When we are on any other page of the gallery, we need to `slice` the next 20 artworks, starting with the last artwork that was displayed on the `currentPage`



## Wrap Up
Excellent work!! We've now built out a simple pagination feature. As you can see, it gets a little technical. There's actually quite a bit more we can do to make this pagination feature more robust, and you can work on that on the bonus if you wish. The main prupose of this part of Aesthetic Domain was to give you additional practice with state, props, and conditional rendering.

In Part 4, we'll work more with conditional rendering and with a concept called Lifting State.


## Bonus
- How could we ***conditionally*** disable the "Previous Page" button when we are on page 1 of the gallery?
- How could we disable the "Next Page" button on the last page of the gallery?
    - This one is a little trickier! You will need to compute what the last page of the gallery is based on the total number of artworks in the API.
- After some user testing, you notice that some users will tend to quickly click on the "Next Page" button which causes your app to slow down and sometimes break because its sending API requests faster than the API can handle. Consider how you might temporarily disable the "Next Page" button to create a "cooldown" effect on the button after a user clicks on it:
    - You could use `setTimeout` to hardcode an explicit cooldown time
    - You could also disable the button until API call completes, making a more dynamic cooldown time
    
    Pick one of the two options above and build it out!
- While looking at your `artworks` state variable in React dev tools you notice that it grows every single time the "Next Page" butotn is pressed. Even when a user has gone back to a previous page, and then clicks "Next Page" it still adds twenty more artworks to the queue. To optimize your app, it's best to get rid of all unecessary time-consuming operations. How could you ensure that the queue is refreshed only when there aren't 20 artworks in it?


## Additional Resources
- [Pagination vs Inifite Scroll](https://blog.hubspot.com/website/pagination-vs-infinite-scroll)
- [Interaction Design Foundation - Pagination](https://www.interaction-design.org/literature/article/split-the-contents-of-a-website-with-the-pagination-design-pattern)