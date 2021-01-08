## Solita Dev-Academy Assignment

Web App of Solita's most popular names.

There's three buttons to sort the names (popularity or alphabetical) or get total amount of them. You can also filter the names using an input field.

Frontend uses only /api/names endpoint because I wanted to practice implementing the functionalities in both back- and frontend.

The frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The backend is a RESTful API written in Express with Node.js. Name data is read from a JSON file.

[Live on Heroku ](https://solita-names-app.herokuapp.com/)


## Installation and running

After cloning the repo, run `npm run install-build-start` in the project directory.

Now you can open [http://localhost:3003](http://localhost:3003) to view the app in the browser. The API is in the same port.

## API endpoints

The API accepts only HTTP GET requests.

GET [/api/names](https://solita-names-app.herokuapp.com/api/names) -  all resources, unsorted

GET [/api/names/:name](https://solita-names-app.herokuapp.com/api/names/Ville) - a single name resource
* if `:name` is Ville, returns `{ name: "Ville", amount: 24 }`

GET [/api/names/:name/amount](https://solita-names-app.herokuapp.com/api/names/Ville/amount) - amount of people with the name given as a parameter (amount property only).
* if `:name` is Ville, returns `{ amount: 24 }`

GET [/api/names/sort/popular](https://solita-names-app.herokuapp.com/api/names/sort/popular) -  resources by amount in descending order

GET [/api/names/sort/alphabet](https://solita-names-app.herokuapp.com/api/names/sort/alphabet) - names in alphabetical order, without amounts

GET [/api/names/total](https://solita-names-app.herokuapp.com/api/names/amount) - sum of amounts in the list
* For the current list, returns `211`