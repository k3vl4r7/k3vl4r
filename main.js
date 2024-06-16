const { app, BrowserWindow } = require('electron');
const express = require('express');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

// Global variables
let mainWindow;
const port = 5000;
const interval = 10000;

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'active_trader'
};

// Create MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Function to fetch data from MySQL and format it
async function fetchDataAndFormat() {
  try {
    // SQL query
    const sqlQuery = 'SELECT time, open, high, low, close FROM m1 WHERE ticker = "MEXC:BTCUSDT.P" ORDER BY time DESC LIMIT 200';
    
    // Get connection from pool
    const connection = await pool.getConnection();
    
    // Execute query
    const [rows, fields] = await connection.execute(sqlQuery);
    
    // Release connection back to pool
    connection.release();
    
    // Format data for ApexCharts
    const formattedData = rows.map(row => ({
      x: new Date(row.time),
      y: [row.open, row.high, row.low, row.close]
    }));
    
    // Write formatted data to output.txt
    const jsonData = JSON.stringify(formattedData, null, 2);
    fs.writeFile('output.txt', jsonData, (err) => {
      if (err) {
        console.error('Error writing file: ' + err.message);
      } else {
        console.log('Data written to output.txt');
      }
    });

    // Log or use the formatted data as needed
    console.log('Formatted data:');
    console.log(formattedData);

  } catch (error) {
    console.error('Error executing query:', error.message);
  }
}

// Express setup
const appExpress = express();

// Serve data from output.txt
appExpress.get('/data', (req, res) => {
  const filePath = path.join(__dirname, 'output.txt');
  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
});

// Start Express server
const server = appExpress.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Create Electron window function
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');

  // Open the DevTools if needed
  // mainWindow.webContents.openDevTools();

  // Handle window closed event
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// App event handlers
app.on('ready', async () => {
  await fetchDataAndFormat(); // Initial fetch of data
  
  // Schedule data fetching at intervals
  const dataFetchInterval = setInterval(fetchDataAndFormat, interval);

  // Create the main Electron window
  createWindow();
});

app.on('activate', () => {
  // On macOS, re-create window if all windows are closed and app is activated
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  // Quit the app when all windows are closed, except on macOS
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

