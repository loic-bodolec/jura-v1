<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#docker">Docker</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

### About The Project

TODO

### Built With

- [React](https://reactjs.org/)
- [React Bootstrap](https://react-bootstrap.github.io/)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- npm

  ```sh
  npm install npm@latest -g
  ```

- node > 12

  ```sh
  npm install node@latest -g
  ```

### Installation <br />

Also works with Yarn

Install NPM packages:

   ```sh
   npm install
   ```

<!-- ENV -->

### Env

Needed to enable hot reloading with CRA 4+ <br/>

FAST_REFRESH=false

### Scripts

- run the client

  ```sh
  npm start
  ```

- build the app

  ```sh
  npm build
  ```

## Docker

1. docker build -t "image name" . (don't forget the "."!!!)
2. docker image ls
3. docker run "image id"

(nb : "On Your Network: <http://172.17.0.2:3000>")

## Run jest tests

### run the tests

  ```sh
  npm test
  ```

### run the tests in watch mode

  ```sh
  npm run test:watch
  ```

### run the tests for a file

  ```sh
  npm run test:watch <filename>
  ```

### On each commit a lint check is runned

## Run playwright tests

### install supported browsers

```sh
npx playwright install
```

### run tests

```sh
npm start
```

```sh
npm run playwright
```

<https://playwright.dev/docs/intro#installation>

### show HTML test reports

```sh
npx playwright show-report
```
