# Calendar Demonstration: In-Class Build

This repository tracks the exploratory build of a calendar application, conducted with student input, in class. 

## How to Run
Clone the repository and do the following to test it out:

```sh
# you will want to ensure that you are executing the subsequent commands from the root directory of the project, once locally cloned.
cd inclass-cal-demo
npm install .
npm run build
npm start
```
Once you run `npm start` you will see a URL printed in the command output where the test server is serving up the app. Navigate to that URL from your Web browser to see the rendered UI.

## Installing Tailwind

This repo will not function without Tailwind - a CSS engine. Tailwind provides a CSS syntax that greatly simplifies the specification of styles while also making it easy to manage those styles. We also need PostCSS - which is an engine that converts CSS in useful ways. TailwindCSS is tightly integrated with PostCSS. 

The following instructions are distilled from this [article](https://v3.tailwindcss.com/docs/guides/parcel)


```sh
npm install -D tailwindcss@3 postcss
npx tailwindcss init
```
Create a new file `.postcssrc`. In the `.postcssrc` file, add the following:

```json
{
    "plugins": {
        "tailwindcss": {}
    }
}
```

After you ran `npx tailwindcss init` earlier, you may have noticed that a `tailwind.config.js` file was created for you. Edit that file so that it looks like this:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Go to `src/App.css` and add the following directives to the beginning of the file. Also, delete the boilerplate CSS in that file. It was created by Parcel and we'll write custom styles:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

You can now begin using Tailwind Styles in your project.