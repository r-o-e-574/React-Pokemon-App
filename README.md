# Poke Library

A React + TypeScript Pokemon app powered by [PokeAPI](https://pokeapi.co/), with:

- Search + type filtering
- Featured Pokemon carousel
- Detailed Pokemon view (stats, matchups, evolution, varieties)
- Narrator/TTS support
- "Who's that Pokemon?" mini game
- Capacitor iOS support (iPad/iPhone testing in Xcode)

## Tech Stack

- React 18
- TypeScript
- Vite
- Redux Toolkit
- React JSS
- React Router v5
- Capacitor (iOS)

## Getting Started (Web)

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Open the local URL printed by Vite (typically `http://localhost:5173`).

## iOS (Capacitor + Xcode)

1. Build web assets:

```bash
npm run build
```

2. Sync to iOS project:

```bash
npx cap sync ios
```

3. Open Xcode workspace:

```bash
open ios/App/App.xcworkspace
```

4. Run from Xcode on simulator or device.

## Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - production build
- `npm run preview` - preview production build locally
- `npm run test` - run Vitest
- `npm run test:watch` - run tests in watch mode
- `npm run typecheck` - TypeScript type check (`tsc --noEmit`)
- `npm run format` - format with Prettier
- `npm run format:check` - check formatting

## Project Structure

- `src/routes` - route-level data/components (`Landing`, `PokemonListData`, `PokemonViewData`)
- `src/components` - reusable UI components
- `src/components/pokemonCard` - detail page panels
- `src/styles` - JSS style modules
- `src/redux` - Redux slices and API layer
- `src/sounds` - app audio assets
- `ios/` - Capacitor iOS project

## Notes

- Build output goes to `dist/` and is ignored by git.
- Pokemon data is fetched from PokeAPI.

## Attribution and Usage

- This project is free to use for personal and educational purposes.
- Pokemon data is provided by [PokeAPI](https://pokeapi.co/). Huge shoutout and thanks to the PokeAPI team/community for maintaining it.
- Pokemon names, characters, images, and related intellectual property belong to their respective owners (including Nintendo, Game Freak, and The Pokemon Company).
- This project is a fan-made, non-official app and is not affiliated with or endorsed by Nintendo, Game Freak, The Pokemon Company, or PokeAPI.
