# K Explore — Event Management Website

A responsive event discovery and registration website built for the K Explore Web Designing assignment.

## Features
- Responsive homepage and navigation
- Event cards with dates, venues, categories, descriptions and live countdown timers
- Live search and category filtering (combined)
- Event details modal and registration form
- Client-side validation for name, email and 10-digit phone number
- Registration persistence with LocalStorage
- Duplicate registration prevention per event and email
- My Registrations section
- Light/dark theme toggle with saved preference
- Mobile navigation and keyboard accessibility

## Technology
HTML5, CSS3 and Vanilla JavaScript. No build tools or backend are required.

## Run locally
1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. For a local development server, use VS Code Live Server or run `python -m http.server 8000` from the project folder and visit `http://localhost:8000`.

## Registration data
This is a frontend demonstration. Registrations are stored in the visitor's browser using LocalStorage. They are not sent to a server and will not be shared between devices or browsers. Do not use this demo for real event ticketing or sensitive personal information.

## Deployment
The project can be deployed as a static site on Netlify, Vercel or GitHub Pages. For Netlify, connect the GitHub repository and set the publish directory to the project root; no build command is needed.

## Notes
- Event details and dates are sample content for demonstration.
- Event photos are loaded from Unsplash and require an internet connection.
