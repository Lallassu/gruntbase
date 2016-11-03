# GruntBase

This is a template for NodeJS client/server using a fully automated development environment
with grunt, bower, browserify, uglify etc.

## Installation

~~~~
npm install
bower install
~~~~

Add client packages:
~~~~
bower install <package> --save
~~~~
Package could be for example Phaser (for game development).

Add server packages for production:
~~~~
npm install <package> --save
~~~~

Add server packages for development:
~~~~
npm install <package> --save-dev
~~~~

Further information regarding Grunt, Bower and npn here:

* [Grunt](http://gruntjs.com/)
* [Bower](https://bower.io/)
* [npm](https://www.npmjs.com/)

## Screenshot

![alt tag](https://raw.github.com/lallassu/gruntbase/master/example.gif)

## Usage

Run development environment:
~~~~
grunt
~~~~

Development environment features:
- Live reload when server files changes
- Automatically starts up the client-side in the default webbrowser
- Live reload the client-side upon changes.

Create distribution:
~~~~
grunt dist
~~~~

Distribution features:
- Minified and uglified libraries in one file, libs.min.js
- Minified and uglified client-side files in client.min.js
- Automatically updated index.html to include the minified versions and exlude others.

The distribution is created in the ''dist'' directory. That's all things needed to start the server
and serve the clients. To run the distribution on a server, npm and nodejs is required. Then just run 
the following commands to go live:
~~~~
npm install --production 
node server/server.js
~~~~


## Environment

Directory structure:
    server - Server files such as the main file ''server.js''
    client - Client files for the client-side.
    tmp    - Temporary directory for js files during development
    dist   - Distribution directory when running ''grunt dist''
    html   - html file template

Files:
    html/index.html  - Index template 
    index.html       - Generated index file  (do not edit)
    tmp/client.js    - Generated client code (do not edit)
    client/client.js - Client code 
    server/server.js - Server code
    Gruntfile.js     - The grunt file 
    bower.js         - The bower file 
    package.json     - npm file


## License

MIT 
