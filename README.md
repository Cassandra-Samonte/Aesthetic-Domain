# Aesthetic Domain - MERN Stack Walkthrough
<img width="100%" src="https://i.imgur.com/gA3dGwr.png" />


## The MERN Stack
Ass you learned in Unit 2, full-stack apps are often referred to by abbreviations of the technologies used within the app. Aesthetic Domain will be built on the MERN stack which is comprised of:
- **M**ongoDB/Mongoose
- **E**xpress.js
- **R**eact
- **N**ode.js

This walkthrough will be split into multiple parts taking place over the course of two weeks. For the first week we'll on React concepts as we build the front end of our app. In week two, we'll integrate the three other technologies listed above. Refer to the solutions branch of this repo for the finished code for each part.


## The Concept
We're going to be creating an virtual art museum called Aesthetic Domain that will allow users to browse thousands of diverse pices of art and comment their thoughts.

We'll be using the [Cleveland Museum of Art Open Access API](https://openaccess-api.clevelandart.org/) which is a free API that doesn't require a token to use. As we incorporate Express and Mongo, we will be able to sign in and add comments to different pieces of art.

Here's what we need for our MVP:
- [ ] Connect our application to the API
- [ ] Load artwork into a gallery when our application loads
- [ ] Display 20 artwork cards in the gallery at a time, and paginate through all artworks pulled from the API
- [ ] When an artwork card is clicked on, display a details page that shows more information about the piece of art
- [ ] Sign up/login capabilities
- [ ] Allow guest users (users that are not logged in) to browse the museum and view comments, but restrict them from creating comments
- [ ] Logged in users will be able to browse the museum, react to artwork, and add comments. Additionally, they will be able to edit or delete their own comments
- [ ] Style the site with [Tailwind CSS](https://tailwindcss.com/)


## Part Breakdown
As you work on Aesthetic Domain over the next two weeks, you'll also work on two different multi-part deliverables. Below is a breakdown of the relationships/shared topics between Aesthetic Domain, React Giphy Searcher, and World Explorer.

<table>
    <thead>
        <tr>
            <th>Aesthetic Domain</th>
            <th>Topic(s)</th>
            <th>React Giphy Searcher</th>
            <th>World Explorer</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td align="center"><a href="./part-1">Part 1</a></td>
            <td>
                <li>Scaffolding a React App</li>
                <li>Hooks - <code>useState</code> and <code>useEffect</code></li>
                <li>Connecting a 3rd-party API</li>
            </td>
            <td rowspan="4" align="center"><a href="#">Part 1</a></td>
            <td rowspan="6" align="center"><a href="#">Part 1</a></td>
        </tr>
        <tr>
            <td align="center"><a href="./part-2">Part 2</a></td>
            <td>Props</td>
        </tr>
        <tr>
            <td align="center"><a href="./part-3">Part 3</a></td>
            <td>Pagination</td>
        </tr>
        <tr>
            <td align="center"><a href="./part-4">Part 4</a></td>
            <td>
                <li>Tailwind CSS</li>
                <li>Lifting State</li>
                <li>Prop Drilling</li>
            </td>
        </tr>
        <tr>
            <td align="center"><a href="./part-5">Part 5</a></td>
            <td>React Router</td>
            <td align="center"><a href="#">Part 2</a></td>
        </tr>
        <tr>
            <td align="center"><a href="./part-6">Part 6</a></td>
            <td>Forms</td>
            <td align="center"><a href="#">Part 3</a></td>
        </tr>
        <tr>
            <td align="center"><a href="./part-7">Part 7</a></td>
            <td>Scaffolding a MERN App</td>
            <td rowspan="2" align="center">N/A</td>
            <td align="center"><a href="#">Part 2</a></td>
        </tr>
        <tr>
            <td align="center"><a href="./part-8">Part 8</a></td>
            <td>Connecting the front and back ends</td>
            <td align="center"><a href="#">Part 3</a></td>
        </tr>
    </tbody>
</table>
