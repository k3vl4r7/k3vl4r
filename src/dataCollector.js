// dataCollector.js
// Our data collector that parses Bitcoin OHLC data so we can visualize it
const fs = require('fs');
let outputFile = 'output.txt';

const axios = require('axios');
data = [];

async function getBitcoinOHLCData() {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=1'); // Change 'days' parameter as needed

        // Extract OHLC data from the response
        const ohlcData = response.data.map(entry => ({
            time: entry[0], // Timestamp
            open: entry[1], // Open price
            high: entry[2], // High price
            low: entry[3], // Low price
            close: entry[4] // Close price
        }));

        //Testing the ability of saving the data in a local file 
        //console.log('Bitcoin OHLC data:', ohlcData);
        data.push(ohlcData);
        let dataString = data.join(', ');
        let jsonString = JSON.stringify(data);
        fs.writeFile(outputFile, jsonString, err => {
            if (err) {
              console.error('Error writing to file:', err);
              return;
            }
            console.log('dataCollector - data collected and written.');
          });

        return ohlcData;
    } catch (error) {
        console.error('Error fetching Bitcoin OHLC data:', error);
        return null;
    }
}

// Function to collect data
function collectData() {
    console.log('dataCollector - collecting data..');
    // Add your data collection logic here
    getBitcoinOHLCData();
}

// Export the function to make it accessible from other modules
module.exports = collectData;

