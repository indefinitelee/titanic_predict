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
	// PassengerId,Survived,Pclass,Name,Sex,Age,SibSp,Parch,Ticket,Fare,Cabin,Embarked
	const columns = rows[0].split(',').map(token => token.replace('\r', ''));
	console.log(columns);

	const dataRows = rows.slice(1).map((row, index) => {
		return row.split(',').reduce((accumulator, field, index) => {
			return accumulator[columns[index]] = field;
		}, {});
	});
	console.log(dataRows[0]);
};

getCsvAsJson('./train.csv');