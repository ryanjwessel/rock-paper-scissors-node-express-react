# Rock Paper Scissors

This repository contains a simple Node/Express server with a React/Redux UI for playing Rock Paper Scissors.

## Starting the server

In order to fire up the server simply run **npm start** from this directory in your command line. This bundles the React/Redux/Javascript/SCSS files then puts them in the **public/dist** folder, and then starts up the Node/Express server. You can access the project at **localhost:3000**.

## Thought process behind this project

When I was considering how I would build this project I played around with the idea of not using any library and building a bare-bones MVC architecture from scratch. However, then I considered the similarities between Flux/Redux and MVC, and decided to go with Redux as that is the leading methodology in state management for React applications now.

MVC stands for **Model**, **View**, **Controller**, where the **Model** contains the data structure independent of the UI, the **View** is the representation of information (i.e. UI), and the **Controller** accepts inputs and converts them to commands for the View **or** the Model.

In Flux/Redux, you have your **Components** (View) that comprise the UI, **Actions** that are dispatched from the Components, and the **Store** that holds the global app state. (Well, **Reducers** update the **State**, so both of these are the building blocks of the Store).

The major difference between Flux/Redux and MVC is that MVC allows for **bidirectional data flow** between the **Controller** and the **View**, whereas Flux/Redux enforces **unidirectional data flow** between it's **Components** and **Actions**. This allows for more predictable state throughout interacting with an app. There are a couple of other distinguishing points, but for the sake of this example it is the only one of note.

## Structure

**app.js** is where some of the top-level Express logic lives. This is where the directories that are available to serve files from the server. For this project, anything in the **public/** directory is available, and anything that is in **public/dist/** will be served as if it were in the **public/** directory. This is so the webpack build process can clear the dist/ folder without fear of removing any other files.

**webpack.js** contains the configuration for the webpack bundling process. It says where to start looking for files to bundle (**src/Index.jsx**) and to follow the dependency tree down from there. It also takes the **index.html** file and includes any bundled files that webpack creates just before the closing **body** tag. It then puts these files into the **public/dist/** folder.

**bin/www** is where the server is initialized, the port is set, and event listeners are established for HTTP events.

**src/** is where all of the React/Redux/SCSS code lives. When the start command is run then webpack bundles all of these files for you and delivers the bundled versions to the **public/dist/** directory.

**routes/** contains the logic for the actual Rock Paper Scissors game. It accepts a POST request at **localhost:3000** and returns the Computer's response with simulated latency. There is also a 1 in 10 chance that it will serve a **500: Internal Server Error**.
