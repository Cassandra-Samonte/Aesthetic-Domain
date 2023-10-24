# Part 1 - Hooks & 3rd-Party APIs
<img width="100%" src="https://i.imgur.com/ReblSS9.png" />


Welcome to the first part of Aesthetic Domain! For this first part we'll need to scaffold a React App with Vite, connect to a 3rd-party API, and store our API date in state.


## Explore the API
1. Navigate to the [Cleveland Museum of Art Open Access API](https://openaccess-api.clevelandart.org/) and scroll down to the *API Endpoints* section.

    You'll notice that the first endpoint is to GET artworks, and we can pass a number of parameters to the endpoint. For now, copy the endpoint as is (https://openaccess-api.clevelandart.org/api/artworks/). We will pass in parameters later.

1. Open up Postman and create a new collection called *Aesthetic Domain*. In the collection, create new GET request.
    
    Paste the endpoint we copied in Step 1 into this route

    ![1st Postman Request](https://i.imgur.com/DKAttBh.png)

1. Press **Send**
    
    You'll notice that it takes a rather long time to load (anywhere from 1 - 20 seconds). As of April 2023, there are around 65,000 artwork objects with each object containg a vast amount of information. When your request finally loads, you'll by default be limited to the first 1,000 artworks, as indicated by the `info` object in the response:

    ![1st Postman Request's Response](https://i.imgur.com/yA8LkCW.png)
    
1. We don't want our application to take very long to load, and this request is expensive in terms of time. As indicated by the API documentation, we can pass in parameters. Let's pass in one parameter in the URL query string:

    ```
    https://openaccess-api.clevelandart.org/api/artworks/?has_image=1
    ```
    Here, we passed in a key-value pair with `has_image` as the key and `1` as the value.Let's update our postman request with this URL:

    ![2nd Postman Request](https://i.imgur.com/lPyriAR.png)

    When we send a GET request to this URL we'll get a new response of all the artworks with an image property!

1. While there are about half as many artworks with images, this query still takes a long time to load. Let's add a `limit` parameter to the URL query string:

    ```
    https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=20
    ```

    Update the request in Postman, and press **Send**. You'll notice that we received a response much quicker! Change the name of this request in Postman to **20 Artworks with Images**

    ![3rd Postman Request](https://i.imgur.com/ovRHeto.png)

1. Leave the Postman window open, since we will be examining this response object later on.


## Set Up the React App
- Scaffold a React app called `aesthetic-domain` using vite.
    - **NOTE**: This will create a new folder called `aesthetic-domain` and build the react app inside it.
- `cd` into `aesthetic-domain`
- Install all the node packages by running `npm i`
- Open the application in VS Code by typing `code .`
- Remove all the unnecessary SVG files
- Create a `components` folder inside `src`
- Inside the `components` folder, create another folder called `App`
- Move `App.jsx` into the `src/components/App` folder and rename `App.jsx` to `index.jsx`
- Move `App.css` into the `src/components/App` folder and rename `App.css` to `styles.css`
- Update imports to match current file names and location

Your file structure should now look like this:
```
aesthetic-domain
├── node_modules/
├── public/
└── src
│   ├── assets/
│   ├── components/
│   │   ├── App
│   │   │   ├── index.jsx
│   │   │   └── styles.css
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

Update the contents of your `App/index.jsx` should look like this:
```jsx
import './styles.css'

function App() {
  //  Create the HTML using JSX for the App component
  return <h1>Aesthetic Domain</h1>
}

export default App
```

Launch your server by executing `npm run dev`


## Connect `App/index.jsx` to the API
Now that we have our React app ready to go, lets connect it to the API!

We've learned about hooks and know we can utilize the `useEffect` to execute certain side effects dependant on the stage of the component's lifecyle.

In this case, we want to query the API as soon as our component mounts. Let's update `App/index.jsx`:
```jsx
import { useEffect } from 'react'
import './styles.css'

function App() {
  // Query the API on component mount
  useEffect(() => {

    // Define an async function to JSONify the query response  
    async function getData() {
      const res = await fetch('https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=20')
      const art = await res.json()
      console.log(art)
    }

    // Call the async function
    getData()
  }, [])

  //  Create the HTML using JSX for the App component
  return <h1>Aesthetic Domain</h1>
}

export default App
```

On component mount, we'll now query the API using `fetch` and get a JSON response back. Once we get the response, we'll `console.log` it to see all of our results! The results should match what we see in Postman.

Do you notice that we have just two top-level keys in this object? 
They are `info` and `data`.
```js
{
    "info": {
        "total": 37576,
        "parameters": {
            "skip": 0,
            "limit": 20,
            "has_image": "1"
        }
    },
    "data": [
        // artwork objects...
    ]
}
```

For the time being we only care about the `data` key since that is what contains all of our artwork. Let's update the async function:
```jsx
async function getData() {
  const res = await fetch('https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=20')
  const { data } = await res.json() // destructure the JSON response
  console.log(data)
}
```
Here, we've just destructured the JSON response and grabbed only the `data` attribute.


## Storing the API Data
Now that we have connected our React application to the API, let's store the API data somewhere.


### You Do: Attempt to Store Data
1. Update your `App/index.jsx` so that it looks like this:
    ```jsx
    import { useState, useEffect } from 'react'
    import './styles.css'

    function App() {
      // Store API data here
      let artworks = []

      // Query the API on component mount
      useEffect(() => {

        // Define an async function to JSONify the query response  
        async function getData() {
          const res = await fetch('https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=20')
          const { data } = await res.json()
          artworks = data
          console.log(artworks)
        }

        // Call the async function
        getData()
      }, [])

      //  Create the HTML using JSX for the App component
      return (
        <>
          <h1>Aesthetic Domain</h1>
          <p>You have {artworks.length} artworks</p>
        </>
      )
    }

    export default App
    ```

1. Reload your browser tab so that the compoennt mounts again and sends the API request.
1. Answer the following:
    - <details><summary>Did the artworks variable update after the API was queried?</summary>Yes</details>
    - <details><summary>Did the <code>p</code> tag update after the API was queried? Why or why not?</summary>The <code>p</code> tag didn't update after the API was queried. This behavior occured because the JSX in the <code>return</code> block was rendered before the the app finished querying the API.</details>


### Using State
Recall that React state allows us to manage and store data that changes over time. 

In the **You Do** above, we attempted to render the `artworks` variable that would change over time (after the API was queried). Because the `return` block executed before the `artworks` variable was changed, we were unable to see the true length of our artworks array (which is 20).

Using state will allow React to use chnaging data and render it as it changes. Update your `App/index.jsx` so that it looks like this:
```jsx
import { useState, useEffect } from 'react'
import './styles.css'

function App() {
  const [artworks, setArtworks] = useState([])

  // Query the API on component mount
  useEffect(() => {

    // Define an async function to JSONify the query response  
    async function getData() {
      const res = await fetch('https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=20')
      const { data } = await res.json()
      setArtworks(data)
    }

    // Call the async function
    getData()
  }, [])

  //  Create the HTML using JSX for the App component
  return (
    <>
      <h1>Aesthetic Domain</h1>
      {artworks.length}
    </>
  )
}

export default App
```
We did the following:
- Imported the `useState` hook
- Created a state declaration for a state variable called `artworks` that initally starts as an empty array.
- On component mount, we update the `artworks` state so that it is replaced with the data we get from the API

Becuase we implemented state, React is now able to dynamically display the length of the artworks array even after it changes!


## Conditional Rendering
Let's attempt to display an artwork's image. Update the code in the `return` block to look like this:
```jsx
return (
    <>
      <h1>Aesthetic Domain</h1>
      {artworks[1].images.web.url}
    </>
  )
```
We get an error! Although we are using state to dynamically render the data, when the artworks array has not yet been updated by the API it will have no item with an index of 1. We need to conditionally render the artwork's image.

JSX allows us to conditionally render elements in a variety of ways.

We can wrap the return block in a condtional expression:
```jsx
if (artworks.length > 0) {
    return (
    <>
      <h1>Aesthetic Domain</h1>
      {artworks[1].images.web.url}
    </>
  )
} else {
    return (
    <>
      <h1>Aesthetic Domain</h1>
      <p>Your artwork is loading...</p>
    </>
  )
}
```
You'll notice here that depending on what the condition is, React will return a different code block. This is useful if you want to render two entirely different components or JSX blocks depending on a condition (i.e. an animated loading screen vs. the content once it loads)

We can also use ternary operators:
```jsx
return (
    <>
      <h1>Aesthetic Domain</h1>
      {artworks.length > 0 ? <img src={artworks[1].images.web.url} /> : <p>Your artwork is loading...</p>}
    </>
  )
```
This is useful for a situation like ours where you only want to conditionally render some HTML, and not an entire new component or code block.

There's another way to conditioanlly render data, but we'll learn about that in Aesthteic Domain Part 2.


## Wrap Up
In this first part of Aesthetic Domain we've explored the 3rd-party API, scaffolded our React App, connected it to the API, and used state and conditional rendering to display our data!

In the next part we'll build a few more components and learn how to pass data between our components.
