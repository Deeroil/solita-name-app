## Solita Dev-Academy Assignment

Simple Web App for Solita's most popular first names for men and women.
There's three buttons to sort the names (popularity or alphabetical) or get total amount of them. You can also filter the names using an input field.

The frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The backend is an REST API written in Express with Node.js. Only HTTP GET-requests are allowed. Name data is read from a JSON file.

<b><sub> Work in progress!
This readme is still in progress, and the code is full of stuff I still need to improve and make cleaner.

## To do:
* Pick which showResults func to use (ternary vs. ifs)
* Remove outdated comments, unused components and some other stuff
* Fix alphabetic sort, it shouldn't return amounts
* Maybe only return total amount and single name's amount? Without other text?
	* Return single amount only after typing the whole name? Hm.
* Add Namelist component if it feels right
* Add CSS 
* Add script for installing both folders at the same time
	* same for running them / npm start  
 * Rename blablajne.js or remove it
 * Consider adding sort etc to the API
 * Consider deploying to heroku

## Installing and scripts
The frontend and backend are still separate and don't have 
I suppose you can use `npm install` for each in their directories. I'll try to make a script for this so it's simpler, or fix it some other way.

Both frontend and backend run in development mode by running `npm start` in their respective directories.
Open [http://localhost:3000](http://localhost:3000) to view front in the browser, backend opens in [http://localhost:3003](http://localhost:300)