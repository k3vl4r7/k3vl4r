// Modules to control application life and create native browser window
const express = require('express');
const fs = require('fs');
const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const data = [];
// Data collection has been moved to a microservice
//const collectData = require('./src/dataCollector.js');
const dataInitialize = require('./src/databaseInitializer.js');
const connection = require('./assets/db.js'); 
const interval = 10000; 
//const job = setInterval(collectData, interval);

function createWindow () {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1030,
		height: 800,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		}
	})

	// and load the index.html of the app.
	mainWindow.loadFile('index.html')

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

const mysql = require('mysql2');

// MySQL database configuration
const dbConfig = {
  host: 'localhost',  // Replace with your host name or IP address
  user: 'root',   // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'active_trader' // Replace with your database name
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Execute a select query
function fetchDataAndFormat() {
  // SQL query
  const sqlQuery = 'SELECT time, open, high, low, close FROM m1 WHERE ticker = "MEXC:BTCUSDT.P" ORDER BY time LIMIT 255';

// Acquire a connection from the pool
  pool.promise().getConnection()
    .then(connection => {
      // Execute the query
      return connection.execute(sqlQuery)
        .then(([rows, fields]) => {
          // Release the connection back to the pool
          connection.release();

          // Process the results and format into desired structure
          const formattedData = rows.map(row => {
            return {
	      x: new Date(row.time), 
              y: [row.open, row.high, row.low, row.close]
            };
          });

	  // Convert formattedData to JSON string
          const jsonData = JSON.stringify(formattedData, null, 2);

          // Write JSON data to output.txt file
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

          // Close the connection pool
          //pool.end();
        })
        .catch(err => {
          console.error('Error executing query: ' + err.message);

          // Release the connection back to the pool
          connection.release();

          // Close the connection pool
          pool.end();
        });
    })
    .catch(err => {
      console.error('Error connecting to database: ' + err.message);

      // Close the connection pool
      //pool.end();
    });
}

// Call the function to fetch data and format it
fetchDataAndFormat();

var interval = 10000;
const job = setInterval(fetchDataAndFormat, interval);


	const app = express();
	const port = 5000;

	app.get('/data', (req, res) => {
		const filePath = path.join(__dirname, 'output.txt');
		const readStream = fs.createReadStream(filePath);

		readStream.pipe(res);
	});

	app.listen(port, () => {
		console.log(`Server is running on http://localhost:${port}`);
		createWindow()
	});


	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
