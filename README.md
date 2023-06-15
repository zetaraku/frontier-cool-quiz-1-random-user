# Random User

## How to run this project

### Install Dependencies

Run `npm install` to install the dependencies.

### Starting Dev Server

Run `npm run dev` to start the dev server.

### Building App

Run `npm run build` to build the app.

By default, the build output will be placed at `dist`.
You can deploy this `dist` folder to any of your preferred platforms.

### Testing App Locally

After the app is built, you can test it locally by running `npm run preview`.

The `vite preview` command will boot up a local static web server that serves the files from `dist` at `http://localhost:4173`.

## Problem and Challenges

### Modularization

The project has many little components so proper modularization is important. After making a prototype, I spend much time ensuring that components are with high cohesion and low coupling.

### User Experience

To ensure a smooth and delightful user experience, I spend much time implementing RWD and tweaking transition effects.

### Header height preservation

The header and footer are styled with `position: fixed;` so I need to use padding to reserve space for the main content. I use `VueUse.useElementSize` to dynamically measure and set the padding of the main content.

### Pagination

The paginator may be the part that needs the most deliberate logic to implement, but I have already done this before, so I borrow [the code](https://github.com/zetaraku/NCU-Course-Finder-v6/blob/master/src/helpers/pagination.js) from my previous project and refine it.
