const axios = require('axios');

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

        console.log('Bitcoin OHLC data:', ohlcData);
        return ohlcData;
    } catch (error) {
        console.error('Error fetching Bitcoin OHLC data:', error);
        return null;
    }
}

getBitcoinOHLCData();

