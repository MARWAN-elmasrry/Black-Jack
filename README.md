# Black Jack

A browser-based Blackjack game built with plain HTML, CSS, and JavaScript.

## Project structure

- `index.html` — UI layout for dealer/player hands, status text, betting input, and game buttons.
- `style.css` — Poker-table inspired styling, layout, and responsive button grid.
- `java.js` — Game state, betting flow, dealer logic, and DOM rendering.

## Gameplay

- Set a bet (minimum `$5`, multiples of `5`) and click **Start Round**.
- Use **Hit** to draw cards and **Stand** to play dealer turn.
- Dealer draws until at least `17`.
- Winnings:
  - Regular win: +1x bet
  - Blackjack win: +1.5x bet
  - Loss: -1x bet
  - Tie (push): no chip change
- Use **Reset Game** to restore chips and clear the board.

## Notes

- Face cards count as `10`; Ace counts as `11`.
- The app uses global state variables for the game loop and updates the UI through cached DOM references.

## Run locally

Open `index.html` in your browser.
