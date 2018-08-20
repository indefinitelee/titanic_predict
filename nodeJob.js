const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const getCsvAsJson = async (filePath) => {
	let data;
	try {
		data = await readFile(filePath);
	} catch (e) {
		console.log('oh noes', e.name + ' ' + e.message);
	}

	// console.log(typeof data, data instanceof Buffer);
	const rows = data.toString().split('\n');
	const columns = rows[0]);

	const dataRows = rows.splice(1).map(row => {
		return {
			
		};
	});

};

getCsvAsJson('./train.csv');