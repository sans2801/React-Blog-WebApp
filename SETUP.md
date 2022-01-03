# SETUP

To setup a local development environment, follow the steps given below.

1. Ensure you have NodeJS, npm installed in your system.
2. Fork and then clone the repository
```console
$ git clone https://github.com/<your-username>/React-Blog-WebApp
```
3. Copy the `.env.example` file and install dependencies in `client` folder
```console
$ cd client
$ cp .env.example .env
$ npm install 
```
4. Copy the `.env.example` file and  install dependencies in `server` folder
```console
$ cd ..
$ cd server
$ cp .env.example .env
$ npm install
```
5. Open the newly created `.env` files in `client` and `server` folders and populate them with your registered keys
6. Create a firebase project and download the `serviceAccountKey.json` from your project and copy it to `/server/firebase`
7. In your firebase console, go to `Project Settings -> General`, scroll down and select the npm option.
8. From the code-block below, copy ONLY the `json object` of the form:
```
{
  apiKey: "********",
  authDomain: "********",
  databaseURL: "********",
  projectId: "********",
  .
  .
}
```
9. Create a file `/server/firebase/firebaseConfig.js` and paste the previously copied json in the file and then export it as follows:
```
module.exports = {
  apiKey: "********",
  authDomain: "********",
  .
  .
}
```
10. Copy the `databaseURL` from the json object and paste it in the appropriate field in `/server/.env` file
11. Start the development servers
```console 
$ cd server
$ npm start
```

```console
$ cd client
$ npm start 
```
At the end of this, you should have

Client running at `localhost:3000`

Server running at `localhost:3001`