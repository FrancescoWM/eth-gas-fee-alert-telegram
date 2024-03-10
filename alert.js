require('dotenv').config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const RPC_URL = process.env.RPC_URL;

const axios = require('axios');
const ethereumGas = require('@cicciocoin/ethereum-gas');
const ethereumBlockNumber = require('@cicciocoin/ethereum-block-number');

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

// Function to check the Ethereum gas price and potentially send an alert
async function checkGasPriceAndAlert() {
    try {
        const gasPriceEther = await ethereumGas(RPC_URL); // Assuming this returns gas price in Ether
        // Convert Ether to Gwei for the comparison, assuming the value is small and fits into a Number safely
        const gasPriceGwei = parseFloat(gasPriceEther) * 1e9;

        console.log(`Current Ethereum Gas Price: ${gasPriceGwei} Gwei`);

        // Example condition based on Gwei
        if (gasPriceGwei > 25) { // Adjust your threshold as needed
            sendTelegramMessage(`Alert: The current gas price is high: ${gasPriceGwei.toFixed(2)} Gwei. Consider waiting for it to go down.`);
        } else {
            sendTelegramMessage(`Alert: The current gas price is low: ${gasPriceGwei.toFixed(2)} Gwei. DO YOUR JOB NOW!.`);
        }
    } catch (error) {
        console.error(`Failed to fetch Ethereum gas price: ${error.message}`);
    }
}

async function checkBlockNumberAlert() {
    try {
        const blockNumber = await ethereumBlockNumber(RPC_URL);

        console.log(`Current Ethereum Block Number is: ${blockNumber}`);

        sendTelegramMessage(`Alert: The current block number is: ${blockNumber}.`);

    } catch (error) {
        console.error(`Failed to fetch Ethereum block number: ${error.message}`);
    }
}

setInterval(checkGasPriceAndAlert, 60000);

