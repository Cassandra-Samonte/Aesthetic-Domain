# Part 5 - React Router
<img width="100%" src="https://i.imgur.com/OuWUN3h.png" />


## MVP Checklist
So far we've accomplished:
- [x] Connect our application to the API
- [x] Load artwork into a gallery when our application loads
- [x] Display 20 artwork cards in the gallery at a time, and paginate through all artworks pulled from the API
- [ ] When an artwork card is clicked on, display a details page that shows more information about the piece of art
- [ ] Sign up/login capabilities
- [ ] Allow guest users (users that are not logged in) to browse the museum, and view comments, but restrict them from creating comments or reacting to artwok
- [ ] Logged in users will be able to browse the museum, react to artwork, and add comments. Additionally, they will be able to edit or delete their own comments
- [ ] Style the site with [Tailwind CSS](https://tailwindcss.com/)

Yesterday we were able to finish paginating our gallery. We also were able to create a details component that rendered at the bottom of the gallery. Now that we've learned React Router, let's refactor our app so that we open a separate page to view an artwork's details!


## Set Up
You can pick up from where you left off in Part 4, or you can clone the starter code. If you're cloning the code make sure to follow these steps:
```
git clone https://git.generalassemb.ly/SEIR-Titans/Aesthetic-Domain.git

cd Aesthetic-Domain/part-5

npm i

npm run dev

code .
```

Since we're incoporating React Router, everyone will need to install it into their app as well as reconfigure the `main.jsx` file.
- Install React Router into your application:
    ```
    npm i react-router-dom
    ```
- Update the `src/main.jsx` file:
    ```jsx
    import React from 'react'
    import ReactDOM from 'react-dom/client'
    import { BrowserRouter as Router } from "react-router-dom";
    import App from './components/App'
    import './index.css'

    ReactDOM.createRoot(document.getElementById('root')).render(
      <Router>
        <App />
      </Router>,
    )


Now we're ready to go and can create routes and pages!


## The Search Page
We're going to create a new page component called `SearchPage`. This page won't have any functionality yet, but we want to make sure we can route to it before we start working on it later today.
- Create a new folder called `SearchPage` inside the `components` folder.
- Create an `index.jsx` file inside the `SearchPage` folder
- Add the following code to the `index.jsx` file:
    ```jsx
    export default function SearchPage() {
        return <h1>Search Page</h1>
    }
    ```
- **Don't forget to import this page into the App component!**


## The 404 Page
We're going to create a new page component called `NotFound`. This page won't have any functionality yet, but we want to make sure we can route to it before we start working on it later today.
- Create a new folder called `NotFound` inside the `components` folder.
- Create an `index.jsx` file inside the `NotFound` folder
- Add the following code to the `index.jsx` file:
    ```jsx
    import { Link } from "react-router-dom"

    export default function NotFoundPage() {
        return (
            <main className="h-[93vh] w-full flex flex-col justify-center items-center bg-[#1A2238]">
                <h1 className="text-9xl font-extrabold text-white tracking-widest">
                    404
                </h1>
                <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
                    Page Not Found
                </div>
                <button className="mt-5">
                    <span className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
                        <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0" />
                        <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                            <Link to="/">Go Home</Link>
                        </span>
                    </span>
                </button>
            </main>
        )
    }
    ```
    - Here we created a 404 Page using Tailwind CSS classes and a `Link` that directs the user back to the `HomePage`
- **Don't forget to import this page into the App component!**


## Refactor the Details Page
We already have a Details component, but lets clarify that this component will be a page.
1. Change the `Details` folder to `DetailsPage`
1. Inside `DetailsPage/index.jsx`, update the component name to `DetailsPage`. Your component should now look like this:
    ```jsx
    export default function DetailsPage({ artworkData }) {
        return (
            {/* your JSX here... */}
        )
    }
    ```
1. If VS Code hasn't already updated your imports, go to `App/index.jsx` and change this import:
    ```jsx
    import Details from '../Details'
    ```
    to this:
    ```jsx
    import DetailsPage from '../DetailsPage'
    ```


## Refactor the App Component
Our App component will change quite a bit. Remember that any `Routes` we define in the `App` component will render inside it as well. This means:
- Any elements/components we want on every page should go inside the `App` component
- Any elements/components we don't want to go on every page should be placed inside its own page or rendered conditionally.


### Remove the Details Component in `App/index.jsx`
Currently, we are conditionally rendering the `DetailsPage` at the bottom of the `App` component. Let's remove that bit of code so that we can instead render the `DetailsPage` with a route


### Create a Home Page
We're going to create a new page component called `HomePage`. This page will house our artwork gallery and pagination controls.
- Create a new folder called `HomePage` inside the `components` folder.
- Create an `index.jsx` file inside the `HomePage` folder
- Add the following code to the `index.jsx` file:
    ```jsx
    import Gallery from '../Gallery'

    export default function HomePage(props) {
        return (
            <>
                <h1>Browse the gallery below!</h1>

                <Gallery
                    artworks={props.artworks}
                    refreshQueue={props.getData}
                    updateDetails={props.setDetailsData}
                />
            </>
        )
    }
    ```
- **Don't forget to import this page into the App component!**


### Set Up the Routes
- Import the React Router packages into the App component:
    ```jsx
    import { Routes, Route, Link } from "react-router-dom";
    ```
- We'll update the page title to include a nav bar, and style it with Tailwind CSS:
    ```jsx
    <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/">
                <h2 className="text-white font-bold text-2xl">Aesthetic Domain</h2>
              </Link>
            </div>
            <div className="flex-grow">
              <ul className="flex justify-end text-gray-300 text-lg font-medium">
                <li>
                  <Link to="/search">
                    <h4 className="px-3 py-2 hover:text-white">Search for Artwork</h4>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    ```
- Now that we have a nav bar, let's create some routes:
    ```jsx
    <Routes>
        <Route path="/" element={
            <HomePage
                artworks={artworks}
                getData={getData}
                setDetailsData={setDetailsData}
            />}
        />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/details" element={<DetailsPage {...detailsData} />} />
        <Route path="/*" element={<NotFoundPage />} />
    </Routes>
    ```
- Head back to the browser and check out your newly refactored app! We can see the gallery on the `HomePage`, and the `<h1>` on the `Search` page!

You'll notice however, that our Card components no longer display the `DetailsPage`. This is because we removed the old conditional render of `DetailsPage` and created a route for it instead. We need our `Cards` to link to the `DetailsPage` somehow.


### You Do: Link `Card` to `DetailsPage`
- How could you go about linking the each `Card` component to the `DetailsPage`?
- Do you need to move your `onClick` attribute?

<details>
<summary>Solution</summary>

We can wrap the entire `Card` component in a link tag:
```jsx
import { Link } from 'react-router-dom'

export default function Card({ artworkData, updateDetails }) {
    return (
        <Link
            to={"/details"}
            onClick={() => { updateDetails(artworkData) }}
        >
            <figure className="text-center m-2 border-2 border-black rounded-lg cursor-pointer bg-gray-700 bg-opacity-70 text-gray-300 hover:text-white hover:bg-gray-800 hover:transform hover:scale-105 shadow-lg transition ease duration-50">
                <img className="w-full object-cover rounded" src={artworkData.images.web.url} />
                <figcaption>
                    <h2 className="font-bold">{artworkData.title}</h2>
                    <h3 className="capitalize">{artworkData.technique}</h3>
                </figcaption>
            </figure>
        </Link>
    )
}
```
- Don't forget that we need to import `Link` at the top of the component!
- You'll notice that we also moved the `onClick` attribute to the `Link` component. Sometimes the browser may not execute your handler function if it is not assigned to the highest level element that you want the handler to run on.
</details>


## Wrap Up
Congratulations! Your application is getting more professional by the minute, with Tailwind styles and client-side routing. Feel free to cchange any of the Tailwind classes used in this part to personalize your app!