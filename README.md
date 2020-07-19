# TL;DR example version of serving a static file with Node.js on Heroku ft. Express 

## setup and deploy

1. install local prerequisites
    * [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
    * [node and npm](https://nodejs.org/en/download/)
    * [heroku cli tools](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
2. setup the project 
    * initialize a git repo with `git init`
        * prepare the `.gitignore` with whatever should not be tracked in your context
            * for example `/node_modules`, `*.env`, probably something else
    * initialize the npm project `package.json` by using `npm init` (you may `yes` all questions)
        * edit `package.json` such that the `engines` entry is set to whatever node version you installed, which can be checked with `node --version`. example: `"engines": { "node": "12.18.2" },`
    * install the packages your project uses
        * for example `npm install express --save` or `npm install express --save --save-exact`
        * alternatively if you got your project from a cloned repo, you can install whatever dependencies the repo author declared in the `package.json` by just running `npm install`
    * create a `Procfile` with `web: node index.js` inside it. this will ask heroku to connect your node instance to the web, otherwise internet connections would get blocked
3. login to heroku using `heroku login`
    * you should have registered and verified a heroku account by now. you get ~1000 free monthly hours in a small virtualized 512MB memory server called a `dyno`. this is enough for running a small app 24/7, or multiple apps with less uptime. see [memory details](https://devcenter.heroku.com/articles/node-memory-use) for adjusting values according to your needs. the disk is ephemeral, it shouldn't persist between restarts which will happen when your app has no activity for ~30 minutes
4. create and configure a heroku remote using `heroku create`
5. push to heroku using `git push heroku master`
    * alternatively instead of pushing you could test the page locally using `heroku local web` and you would get the server running locally on `http://localhost:<your_designated_port_here>`, with the port specified in an environment variable `PORT` within the `.env` file

resulting example: [https://polar-journey-49175.herokuapp.com/](https://polar-journey-49175.herokuapp.com/)

## minimal application example
#### `index.js` file:

(the application itself which just uses express to serve a specific static html file in a specific route with a specific HTTP method. if you have a small number of static files you could copy and edit this route template. if you have lots of files in a small number of directories then just check out the [`express.static` middleware](https://expressjs.com/en/starter/static-files.html) for a cleaner alternative)
```javascript
const express = require('express');
let server = express();
let port = process.env.PORT || 3333;

server.get('/', (request, response) => {
    // __dirname is the absolute path of the currently executing file, index.js
    // if you don't specify a root option then you should use an absolute path for the html file
    response.sendFile('./public/misc_html.html', { root: __dirname });
})
server.listen(port, () => { console.log(`Server listening on port ${port}.`); });
```

#### `.env` file:

(these environment variables are only used if you are testing the application locally with `heroku local web`)
```
PORT=3131
```
#### `Procfile` file:

(this just specifies that you want your app connected to the internet and what command to run it)
```
web: node index.js
```

#### `package.json` file:

(this specifies your dependencies, take whatever `npm init` created for you and add the line with the node version you're using locally for sanity's sake)
```
     "engines": { "node": "12.18.2"},
```

## miscellaneous links

[express `sendFile(...)`](https://expressjs.com/en/api.html#res.sendFile)

[node less minimal heroku example](https://devcenter.heroku.com/articles/getting-started-with-nodejs?singlepage=true)

[heroku deploy details](https://devcenter.heroku.com/articles/preparing-a-codebase-for-heroku-deployment)
