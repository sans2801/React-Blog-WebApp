# Directory Structure
```
.
├── app.js
├── bin
│   └── www
├── controllers
│   ├── authController.js
│   ├── blogController.js
│   └── likeController.js
├── firebase
│   ├── config.js
│   ├── firebaseConfig.js
│   └── serviceAccountKey.json
├── middleware
│   └── validateUser.js
├── package.json
├── package-lock.json
├── routes
│   ├── index.js
│   └── users.js
└── test
    └── auth.test.js
```
- Functions that perform CRUD operations are placed in `/controllers` directory
- Firebase configuration files can be found in `/firebase` directory
- All middlewares are maintained in the `/middleware` folder 
- API end points can be found in `/routes/users.js`
- Test cases are placed in `/test` folder