# Simply Simmer

A full stack AI application that allows users to extract ingredients and cooking instructions from recipes sites. No more annoying ads and scrolling endlessly to find recipes. Includes recipe search, ability to save recipes, and leverages LLMs to modify recipes based on preferences/dietary restrictions. Started off as a private personal project, but decided to release as a simple example of fullstack application that others can fork and work off of. Demonstrates an example of leveraging Shadn, Tailwind, LLMs, Supabase, Brave Search API, and Stripe payment together in an application. 

## Getting Started

The following instructions will get the application working on your machine. 


### Installing

Clone the repo:

`git clone https://github.com/matt-taggart/simply-simmer-recipe-app.git`

Install node modules:

`pnpm i`

Start up webpack dev server:

`pnpm dev`

Run production build:

`pnpm build`

Add the necessary environment variables specified in the `.env.example` file.

Set up the auth schema in Supabase using the remote schema postgres file found in the `migrations` folder.

## Built With

* Next.js - Enables users to create high-quality web applications with the power of React components.
* Brave Search API - Power your search and AI apps with the fastest growing independent search engine since Bing.
* Shadcn - Beautifully designed components that you can copy and paste into your apps. Made with Tailwind CSS. Open source.
* Supabase - An open source Firebase alternative.
* Stripe - A fully integrated suite of financial and payments products.

## Features
* Easily extract recipes
* Skip annoying ads, life stories, and losing your spot while cooking
* Easily search for new recipes based on keyword search
* Extract recipes from a url
* Save and edit recipes in your profile
* Modify recipes based on preferences/dietary restrictions with the power of AI

## Demo
Here are some screenshots from the promo page:

![image](https://github.com/user-attachments/assets/e0b51d6a-5c13-41a1-b8a9-9b960304696c)

![image](https://github.com/user-attachments/assets/c2bd07e2-ff35-43ba-9f56-e50526f91761)

![image](https://github.com/user-attachments/assets/29a81687-9000-4a4b-8f57-ec0d045be0d7)

![image](https://github.com/user-attachments/assets/e3c49f20-ec42-48cd-b53e-ff768d0b10d0)



