# Cynthesize

[![Join the chat at https://gitter.im/Cynthesize-gitter/Lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/Cynthesize-gitter/Lobby)
[![Netlify Status](https://api.netlify.com/api/v1/badges/bb4cca25-6173-4ced-b955-8d1662820686/deploy-status)](https://app.netlify.com/sites/cynthesize-develop/deploys)

![](https://files.gitter.im/WickedBrat/wq4g/banner.jpg)

Go ahead! Star this repo! 

### Introduction

Cynthesize is a platform where users can post their project ideas and details to get feedback from the community upon things that matter, like the idea itself, the tech stack, the development plan, the approach on the problem. Our vision is to create a platform that unifies the product development process.

Tell us about yourself at our [Gitter Channel](https://gitter.im/Cynthesize-gitter/Lobby). 

We recommend you going through the [wiki page](https://github.com/Cynthesize/cynthesize-frontend/wiki)

### Installation Instructions

1. Fork and star this repo.
2. Once you've forked this repo, clone the repository to your local machine. You may do so by running the following command.
    ```sh
    git clone https://github.com/<YOUR_USERNAME>/cynthesize-frontend
    ```
3. Go to project folder and install dependencies:
    ```sh
    cd cynthesize-frontend/
    npm install
    ```

4. Launch development server, and open `localhost:4200` in your browser:
    ```sh
    npm start
    ```
5. Frontend server is up and running on your local machine. Edit in your favourite code editor and see the changes instantly.


# Hasura's GraphQL Engine

> We want to encourage you that GraphQL might seem new and an alien thing, but it's as easy as pie!

The Hasura GraphQL Engine is an extremely lightweight, high-performance product that gives you instant realtime GraphQL APIs on a Postgres database. This can be used to quickly build new applications on Postgres or fast-track the move to GraphQL for existing applications on Postgres.

It comes with a UI that lets you create and view tables on your database and make GraphQL queries using the embedded GraphiQL interface.


## Writing API endpoints with Hasura and GraphQL

Writing Queries, mutations and subscriptions are pretty easy and can be done quite easily. The concept behind writing these methods is that, these methods are used to communicate with your backend database. These are similar to writing SQL queries, like `SELECT * FROM Table_name` on the backend to communicate with the backend. Here, the backend layer is completly removed and the database is exposed to these endpoint. So we write the queries in the frontend by specifying the type of queries/mutations, the variables related to them and what column values we want in return.

The detailed explaination of writing methods are given below:
- [Queries](https://github.com/Cynthesize/frontend/wiki/Queries)
- [Mutation](https://github.com/Cynthesize/frontend/wiki/Mutation)
- [Fragments](https://github.com/Cynthesize/frontend/wiki/Fragments)

### Contribution Guidelines

Following [these](CONTRIBUTE.md) guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.
