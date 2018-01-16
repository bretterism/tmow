const path = require('path');
const fs = require('fs');
const parseXlsx = require('excel');
const config = require('config');
const io = require('socket.io')();

const filePath = config.get('filePath');
const host = config.get('host') || 'localhost';
const port = config.get('port') || 3001;


// Function: getExcelData
// Returns: an array of objects. Each object is the team information.
// Each row in the excel sheet (minus the header row) is an item in the array.
// Each cell in the row is added to the object for the array.
const getExcelData = (callback) => {
	parseTeams((teams) => {
		parseUsers(teams, (teamsWithUsers) => {
			callback(teamsWithUsers);
		});
	});
}

const parseTeams = (callback) => {
	parseXlsx(filePath, '1', (err,data) => {
		if (err) throw err;

		const numHeaders = data[0].length;
		const numDataRows = data.length;

		let extract = []
		for (let i = 1; i < numDataRows; i++) {
			// Skipping row if the first column is blank
			if (data[i][0] === '') continue;

			let e = {};
			for (let j = 0; j < numHeaders; j++) {
				// First, converting header to camel case (instead of pascal case)
				const convertHeader = data[0][j].charAt(0).toLowerCase() + data[0][j].slice(1);
				
				e[convertHeader] = data[i][j];
			}
			extract.push(e);
		}

		callback(extract);
	});
}

const parseUsers = (teams, callback) => {
	parseXlsx(filePath, '2', (err,data) => {
		if (err) throw err;

		const numHeaders = data[0].length;
		const numDataRows = data.length;

		let extract = []
		for (let i = 1; i < numDataRows; i++) {
			// Skipping row if the first column is blank
			if (data[i][0] === '') continue;

			let e = {};
			for (let j = 0; j < numHeaders; j++) {
				// First, converting header to camel case (instead of pascal case)
				const convertHeader = data[0][j].charAt(0).toLowerCase() + data[0][j].slice(1);
				
				e[convertHeader] = data[i][j];
			}
			extract.push(e);
		}

		teams.map((team) => {
			const user = extract.find(i => team.fullName === i.fullName);
			if (user) {
				if (user.hasOwnProperty('imgUrl')) {
					team.imgUrl = user.imgUrl;
				}	
			}
			
			return team;
		});

		callback(teams);
	});
}

io.on('connection', (client) => {
	console.log('connection established!'); 
	// Send data on initial connection
	if (fs.existsSync(filePath)) {
		getExcelData((excelData) => {
			client.emit('tmow', excelData);
		});
	}

	// Client is ready to receive events. Now we just wait for the file to be updated.
	fs.watchFile(filePath, () => {
		// File was updated. Get excel data and send to client.
		getExcelData((excelData) => {
			client.emit('tmow', excelData);
		});
	});
});

io.listen(port);
console.log('server listening at '+host+':'+port);