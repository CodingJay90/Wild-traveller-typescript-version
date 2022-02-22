# Wild Traveller

## Description

Wild traveller is a Travel sharing platform, where users can share their travel experiences with other users.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Tests](#tests)

## Installation

To install the files for testing into your local repo, using Git Bash Terminal:

1. Create a folder locally to nominate for cloning from online repo
2. Clone with SSH by

```GitBash Commands
git clone https://github.com/CodingJay90/Wild-traveller-typescript-version.git
```

While in the root directory, you can run the following commands;

```Terminal Commands
npm install
npm run client-install
npm run server-install
npm run dev //in the root directory to concurrently run both frontend and backend
cd server && npm run dev // run the server
cd client && npm start // run the frontend
```

## Features

- New Users can view other users posts but have limited interractions.
- Login and signup functionalities
- Authenticated users can create posts and comments on other users posts
- Authenticated users can edit and delete created posts and comments
- And more...

## Tests

This project can be tested with [JS Validation Service](https://jshint.com/). The [Insomnia](https://insomnia.rest/) Design and API Client
is used to test these functionalities as it can GET, POST, PUT and DELETE Data from the given URL without Front End UI Buttons or Designs.
You will also require [MongoDB](https://www.mongodb.com/cloud/atlas/register) for this application's database.
