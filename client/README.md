# Directory structure
```
.
├── package.json
├── package-lock.json
├── public
│   └── index.html
├── README.md
└── src
    ├── App.js
    ├── editor
    │   └── EditorComponent.js
    ├── global
    │   └── Navbar.js
    ├── index.css
    ├── index.js
    └── pages
        ├── 404-page.js
        ├── BlogDetails.js
        ├── Create.js
        ├── Dashboard.js
        ├── Home.js
        ├── Login.js
        ├── Search.js
        └── SignUp.js
```
- `/src` directory has several sub-directories to distinguish the components from pages

- `/src/global` holds reusable components which can be used on multiple pages
- `/src/editor` holds the editor component along with all it's configurations
- `/src/pages` holds pages which are mapped to specific routes in `App.js`