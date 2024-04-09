# Unsplash Image Gallery with Next.js

This project is a web application built with [Next.js](https://nextjs.org/) that leverages the Unsplash API to display a gallery of images. Users can browse, search, and filter images based on different criteria, view larger versions of the images, and see additional information about the photo and the photographer.

## Features

- Browse all images available through the Unsplash API.
- Search for images based on user input.
- Filter queried images by 'Latest' or 'Relevant'.
- Filter main feed by 'Latest', 'Oldest', or 'Popular'. 
- View larger versions of images along with additional information.


## Optimizations

- Caches common requests to use API resources efficiently with node-cache 
- Pre-renders image for modal view to avoid laggy image loading 

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your system. You can download it from [Node.js website](https://nodejs.org/).
- **npm** (Node Package Manager): Comes with Node.js, but you can ensure it's installed by running `npm -v` in your terminal.

### Installation

- **Install Dependencies**: Run the following command in your project directory to install the required dependencies:

    ```bash
    npm install
    ```

    This command reads the `package.json` file and installs all the dependencies listed there.

### Running the Development Server

- **Start the Development Server**: Run the following command to start the Next.js development server:

    ```bash
    npm run dev
    ```

- **Open the Application**: Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The application will automatically reload if you change any of the source files.

### Building for Production

- **Build the Application**: To build the application for production use, run:

    ```bash
    npm run build
    ```

    This will create the `.next` folder with the production build of your application.

- **Start the Production Server**: After building the app, start the production server by running:

    ```bash
    npm start
    ```

## Additional Setup

- **Environment Variables**: You'll need to configure environment variables to store sensitive information like API keys. Create a `.env.local` file in the root of your project and add your variables there, like so:

    ```env
    UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
    ```

    Replace `your_unsplash_access_key_here` with your actual Unsplash Access Key. Make sure to add `.env.local` to your `.gitignore` file to avoid exposing your secrets.
