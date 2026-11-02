# Cambodia Province Map

A static, Khmer-language guide to Cambodia's provinces. The site includes a clickable country map, province information pages, and a contact page.

## Run locally

The site has no build step or package dependencies. From the project root, start a static server:

```sh
python -m http.server 8000
```

Open [http://localhost:8000/](http://localhost:8000/). The root page forwards to the province map at `/province/`. A local server is recommended so relative links, images, and the clickable map work consistently.

## Host the site

Upload the project folders while preserving their names and relative paths. Deploy the repository root as a static site; the root `index.html` forwards visitors to `/province/`. Bootstrap is included locally. Remix Icon and the AOS animation library are loaded from CDNs and need an internet connection; scroll reveals use a built-in fallback if AOS cannot load.

## Project layout

- `province/index.html` — map and province directory
- `province/<province>/index.html` — province information pages
- `province/contack/contact.html` — contact page
- `styles/style.css` — shared layout, responsive styles, and motion
- `styles/aos-reveal.js` — configures reveal-on-scroll animations
- `styles/responsive-map.js` — keeps map links aligned when the map resizes
- `img/` — map, province, and page images
- `Bootstrap/` — locally bundled Bootstrap assets

The shared styles support mobile and tablet layouts and respect the user's reduced-motion preference. AOS animations are disabled automatically when reduced motion is requested.
