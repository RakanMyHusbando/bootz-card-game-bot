# Bootz Card Game Bot

Welcome to the Bootz Card Game Bot repository!

## Description
Bootz Card Game Bot is a TypeScript-based bot designed to interact with the [Bootz Card Game](https://github.com/RakanMyHusbando/bootz-card-game). The goal is that the bot is capable of managing game logic, player interactions, and game state. 

## Features
- [ ] card designs
- [ ] trade trading cards
- [ ] card game matches

### Bot Commands
- [ ] `/register` to register as a new user
- [x] `/show_inventory` to view your own inventory of cards
- [ ] `/pull` to draw a card (if you still have unopened items in your inventory)
- [ ] `/challenge <user>` to play against another user 

## Setup

1. Install Node.js from the [official website](https://nodejs.org/) or using a version manager like [nvm](https://github.com/nvm-sh/nvm) and the [Bootz Card Game](https://github.com/RakanMyHusbando/bootz-card-game) repo.
2. Clone the repository:
   ```sh
   git clone https://github.com/RakanMyHusbando/bootz-card-game-bot.git bot
   ```
3. Navigate to the project directory:
   ```sh
   cd bot
   ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Create a `.env` file based on the `.env.example`:
    ```sh
    cp .env.example .env
    ```
5. Update the `.env` file with your configuration
6. Run the application:
    ```sh
    npm run start
    npm run dev # developer mode
    ```

## Usage
Once the bot is running, it can be integrated with the bootz card game backend to manage game sessions, handle player actions, and enforce game rules.

## License
This project is licensed under the MIT License.
