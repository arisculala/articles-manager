# articles-manager
The **articles-manager** is a RESTful API service designed to manage articles/blog application with user management

## Table of Contents
* [Getting Started](https://github.com/arisculala/articles-manager#getting-started)
     - [Prerequisites](https://github.com/arisculala/articles-manager#prerequisites)
     - [Setup PostgreSQL Locally](https://github.com/arisculala/articles-manager#setup-postgresql-locally)
     - [Installation](https://github.com/arisculala/articles-manager#installation)

[References](https://github.com/arisculala/connectme#references)
 

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
* Node.js
* npm or yarn
* PostgreSQL

### Setup PostgreSQL Locally
First, you need to set and run the PostgreSQL instance locally

### Installation
1. Clone the repository
```bash
$ git clone https://github.com/arisculala/articles-manager.git
```
2. Copy .env.example (Configure the service by updating the .env file with your PostgreSQL connection details)
```bash
$ cd articles-manager
$ cp .env.example .env
```
3. Install dependencies
```bash
$ npm install
```
4. Build the service
```bash
$ npm run build
```
4. Run the service
```bash
$ npm run dev
```
5. Open service in the browser
```bash
http://localhost:3000/api/healthcheck/liveness
```

### Run test
```bash
$ npm run test
```

## References
