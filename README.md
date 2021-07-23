# Note Taker Homework

## Description

Added in routing for designated paths to our index.js file locatd in our root directory.
Our database file can be found in the db folder.

- Added a route to serve up our notes.html file when a get /notes request is recieved.

- Added a route to handle 'api' requests, returning json files containing our database information, as well as a secondary route to handle POST requests, converting the saved data to proper json format and adding that to our database.

- Added a route to handle delete requests, first confirming that an ID sent in our request parameters has a length, then comparing our given ID to each saved Notes' ID and splicing our array at the given notes index, then returning an updated version of our database file.

## Links

- [Github Repository](https://github.com/Atlas238/note-taker-)

- [Heroku Deploy](https://)