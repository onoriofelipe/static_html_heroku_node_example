# Example of serving a static file with Node.js on Heroku ft. Express, TL;DR version

# setup and deploy

1. install local prerequisites
    * [git]
    * [node and npm]
    * [heroku cli tools] 
2. setup the project 
    * initialize a git repo with `git init`
        * prepare the `.gitignore` with whatever should not be tracked in your context
            * for example `/node_modules`, `*.env`, probably something else
    * initialize the npm project `package.json` by using `npm init`
        * edit `package.json` such that `engines` entry is set to whatever node version you installed, which can be checked with `node --version`. example: `"engines": { "node": "12.18.2" }`
    * install the packages your project uses
        * for example `npm install express --save` or `npm install express --save --save-exact`
        * alternatively if you got your project from a cloned repo, you can install whatever dependencies the repo author declared in the `package.json` by just running `npm install`
    * create a `Procfile` with `web: node my_entry_point.js` inside which will ask heroku to connect your node instance to the web, otherwise no connection happens
3. login to heroku using `heroku login`
4. create and configure a heroku remote using `heroku create`
5. push to heroku using `git push heroku master`
    * alternatively instead of pushing you could test the page locally using `heroku local web` and you would get the server running locally on `http://localhost:<your_designated_port_here>`

 # application example

 ```
 
 ```