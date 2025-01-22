# Portfolio Demo

This is a demo of a portfolio website that I created using Next.js and TypeScript. The website is fully responsive.

## Setup

1. Clone the repository
2. Install the dependencies by running `npm install` or `yarn install`
3. Run the development server by running `npm run dev` or `yarn dev`
4. Copy the `.env.example` file to `.env` and fill in the required environment variables
5. Head over to `http://localhost:3000` to see the website

## Login

You can login to the website using the following credentials:

- **Username:** admin
- **Password:** password

## Testing

You can run the tests by running `npm run test` or `yarn test`

## Next.js Features

- I used SSR (Server Side Rendering) to improve the performance of the website
- I used SSG (Static Site Generation) to generate static pages for the website
- I opt to use a hybrid approach where I can use both SSR and SSG. It allows me to deliver the not interactable parts of the page as static.
- I used dynamic routing to create dynamic pages for the projects
- I used build-in CSS modules support, this allows me to write modular and scalable CSS code
- I used middleware to protect the admin routes