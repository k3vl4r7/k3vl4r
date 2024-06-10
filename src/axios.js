const axios = require('axios');

async function getBitcoinHistoricalData() {
    try {
        const today = new Date().toISOString().slice(0, 10);
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${thirtyDaysAgo}&to=${today}`);

        console.log('API response:', response.data); // Log the entire response data

        // Extract high, low, open, and close prices from the response...
    } catch (error) {
        console.error('Error fetching Bitcoin historical data:', error);
        return null;
    }
}

module.exports = getBitcoinHistoricalData
