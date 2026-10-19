# For Thakkali | One More Chance

A private-feeling, cinematic apology letter built with React and Vite. It works entirely in the browser; there is no account, backend, API key, or automatic music playback.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To check the production version, run `npm run build` and `npm run preview`.

## Add a photo

Enter the site, scroll to **A Face That Means So Much to Me**, and choose **Choose a photo**. JPG/JPEG, PNG, and WebP files are supported. The original proportions are preserved. Use **Replace photo** or **Remove photo** whenever you like.

The upload is a local preview only. The app does not send the file anywhere, and a selection is not saved after refreshing or opening the site on another device. If you intentionally want a photo included in a deployed copy, and have permission to publish it, put it in `public/images/` and set `DEFAULT_PHOTO_URL` in `src/content.js` to a path such as `/images/thakkali-photo.jpg`. A bundled photo will be publicly accessible on the deployed site.

## Add music

Use the upload icon in the fixed music player to choose a browser-compatible MP3, WAV, or OGG file. Play, pause, seek, mute, and volume controls are available. Music does **not** start automatically. The file stays local to that browser session, and its object URL is cleaned up when replaced or when the page closes.

For music included in a deployed copy, place a licensed or personally owned instrumental in `public/music/`, then set `DEFAULT_MUSIC_URL` and `DEFAULT_MUSIC_TITLE` in `src/content.js`. Even a bundled track plays only after someone presses Play. Do not publish copyrighted music without permission.

## Customize the words

- Edit the complete letter in `LETTER_PARAGRAPHS` in `src/content.js`. Each array item is revealed as its own paragraph; `\n` creates a line break within an item.
- Edit the opening, hero, photo, promises, final question, and footer copy in their matching files under `src/components/`.
- Adjust the colors, typography, spacing, and motion in `src/styles/`. The decorative rose is `public/images/cinematic-rose.jpg`; it is not presented as a photo of Thakkali.

The two answers in the final section only change local page state. They are not transmitted, logged, or saved.

## Deploy

Run `npm run build`, then deploy the generated `dist/` folder to any static host, or connect this repository to a Vite-compatible host such as Netlify or Vercel (build command `npm run build`, output directory `dist`). No environment variables are needed. Be careful with any personal photo or audio that you deliberately add to `public/`: public assets are visible to everyone with the deployed URL.

The site respects reduced-motion preferences, pauses decorative animation in hidden tabs, and does not require an external service for its core functionality. The optional Google Fonts stylesheet falls back to local serif and sans-serif fonts if unavailable.