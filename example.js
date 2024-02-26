const checkGasPriceAndAlert = require('ethereum-gas-alert');

// Users would supply their own .env variables or pass these as parameters
checkGasPriceAndAlert(process.env.TELEGRAM_BOT_TOKEN, process.env.TELEGRAM_CHAT_ID, process.env.RPC_URL, 20);
