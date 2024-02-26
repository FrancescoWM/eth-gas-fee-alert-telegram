# Ethereum Gas Price Alert Bot

This project is a simple Node.js script that checks the current Ethereum gas prices and sends an alert message via Telegram when the price exceeds a predefined threshold.

## Prerequisites

- Node.js and npm installed on your machine
- A Telegram bot token and chat ID
- An Ethereum node RPC URL

## Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/FrancescoWM/eth-gas-fee-alert-telegram.git
   cd eth-gas-fee-alert-telegram

2. **Install dependencies**
    npm install

3. **Create .env file with your Telegram bot token, chat ID and RPC URL**    

    ```bash
    touch .env
    echo "TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN" >> .env
    echo "TELEGRAM_CHAT_ID=YOUR_TELEGRAM_CHAT_ID" >> .env
    echo "RPC_URL=YOUR_RPC_URL" >> .env
    ```

4. **Run the script**

    ```bash
    node index.js
    ```