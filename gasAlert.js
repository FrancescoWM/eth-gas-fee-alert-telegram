// gasAlert.js
require('dotenv').config();
const axios = require('axios');
const ethereumGas = require('@cicciocoin/ethereum-gas');

async function checkGasPriceAndAlert(TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, RPC_URL, threshold = 25) {
  // Function to send a message to Telegram
  function sendTelegramMessage(message) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const data = {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    };

    axios.post(url, data)
      .then(() => console.log("Message sent to Telegram successfully"))
      .catch(error => console.error("Failed to send message to Telegram:", error));
  }

  try {
    const gasPriceEther = await ethereumGas(RPC_URL); // Assuming this returns gas price in Ether
    const gasPriceGwei = parseFloat(gasPriceEther) * 1e9;

    console.log(`Current Ethereum Gas Price: ${gasPriceGwei} Gwei`);

    if (gasPriceGwei > threshold) {
      sendTelegramMessage(`Alert: The current gas price is high: ${gasPriceGwei.toFixed(2)} Gwei. Consider waiting for it to go down.`);
    } else {
      sendTelegramMessage(`Alert: The current gas price is low: ${gasPriceGwei.toFixed(2)} Gwei. DO YOUR JOB NOW!.`);
    }
  } catch (error) {
    console.error(`Failed to fetch Ethereum gas price: ${error.message}`);
  }
}

module.exports = checkGasPriceAndAlert;
