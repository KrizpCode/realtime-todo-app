# Realtime To-Do application

A Realtime To-Do application where users can register an account, create to-do lists and share with other users.
All of the changes within a to-do list happens in realtime, and invited users can work on the same list simultaneously.

For this project I set a goal to learn TypeScript, GraphQL and FireBase.
If I were to continue developing this app, I would add a database, a way to filter the lists by active/done/all, and add special lists with different special features.

## Instructions to run application

Clone this repo and write in terminal
````
cd server
npm install
npm run nodemon
```` 
Backend is now running on http://localhost:4000/graphql

Create another terminal and write
````
cd client
npm install
npm start
```` 
Application should now be running and accessible on http://localhost:3000

## Link to hosted application
https://realtime-todo-app.herokuapp.com/

## Frameworks

### Frontend:
* React
* GraphQL
* TypeScript

### Backend:
* Node with Express
* GraphQL
* TypeScript
* WebSockets

### Other
* Firebase

## Current features of my application
* A user is able to create an account
* A user is able to log-in with their created account
* A user can update the e-mail/password of their account
* A user can reset their password and get an email with instructions in how to do so.
* A user can create an infinite number of To-Do lists with custom names.
* A user can share their list with another registered user.
* A user can add/remove/update to-do's to their To-Do list in realtime. (The changes will be viewed by other registered users to this list as well and vice versa)
