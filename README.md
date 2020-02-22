# Lighthouse Labs Midterm Project - Mapper

> Mapper is a web app that allows users to collaboratively create maps which list multiple pinned locations. Similar to Foursquare you can create and save custom maps such as "Best Coffee Shops Around Town" or "Victoria Brewery Tour Stops".

<!-- Badges -->

[![NPM Version](https://img.shields.io/npm/v/npm.svg?style=flat)]()
[![GitHub contributors](https://img.shields.io/github/contributors/jlangy/mapper?style=flat)]() 

## Table of contents

- [Usage](#usage)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing and running](#installing-and-running)
- [Deployment](#deployment)
- [Built with](#built-with)
- [Known feature quirks](#known-issues-/-bugs)
- [Feature roadmap](#feature-roadmap)
  

## Usage

### Login
To login to Mapper, go to "/users/login" and enter a user's email address with no password. 

### Navigation 
Once logged in you will be able to view all public maps on the site. From here you can navigate to one of the public maps or to your profile. Your profile will contain a list of your maps (all maps you are a contributor on) and you favourite maps. 

A user is able to edit any map that they have created or are a collaborator on. Logged in users are also able to favourite any public map to save to their favourites list.



<!-- Screenshots -->


## Getting started

Follow the instructions below to get the project up and running on your local machine for development and testing purposes. 

### Prerequisites

If you don't have Nodejs and npm installed, install them from [here.](https://nodejs.org/en/)

### Installing and Running

In the root directory, install dependencies:

```
npm i
```
Fix to binaries for sass:
```
npm rebuild node-sass
```
Reset database:

```
npm run db:reset
```
Run the server (nodemon is used):
```
npm run local
```
Lastly, visit [Mapper](http://localhost:3000/maps)!


## Built with

- [ES6]() - Server-side code
- [Nodejs](https://nodejs.org/en/) - JavaScript runtime
- [Express](https://expressjs.com/) - Framework used for API in Node
- [Bootstrap](https://sass-lang.com//) - Front-end framework
- [jQuery](https://jquery.com/) - JavaScript library
- [Sass](https://sass-lang.com/) - CSS Preprocessor
- [PostgreSQL](https://www.postgresql.org/) - Open source object-relational database
- [Git](https://git-scm.com/) - Version Control

## Known feature quirks

- Login is for demo purposes only
- No logout functionality


## Feature roadmap

- Friends - user can maintain a list of friends that they are able to collaborate on maps with. Could set your maps to be public, or shared with friends.
- Map Categories - add category tags to your maps, search public maps based on categories.
- Pin Favourites - similar to how users can favourite a map, they can also favourite and filter by individual pins.


## Dependencies

- Node
- NPM 
- PG 
- Body-parser
- Cookie-session 
- dotenv
- ejs
- Morgan
- Node-sass-middleware
- Nodemon

