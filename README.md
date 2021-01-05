
## Solita Dev-Academy Assignment

Simple Web App of Solita's most popular names.

There's three buttons to sort the names (popularity or alphabetical) or get total amount of them. You can also filter the names using an input field.

The frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The backend is an REST API written in Express with Node.js. Only HTTP GET-requests are allowed. Name data is read from a JSON file.

[Live on Heroku ](https://guarded-beyond-32204.herokuapp.com/)
 

## Installing and scripts

After cloning the repo, run `npm install` and  `npm run build` in the project directory. Then run `npm start`.

Now you can open [http://localhost:3003](http://localhost:3003) to view the app in the browser.


## API endpoints

The API accepts only HTTP GET requests.

GET [/api/names](https://guarded-beyond-32204.herokuapp.com/) for all names, unsorted

GET [/api/names/:name](https://guarded-beyond-32204.herokuapp.com/api/names/Ville), for a single name resource, which has name and amount.