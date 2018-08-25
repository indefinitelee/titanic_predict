const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const { COLUMN_TRANSFORMS, TRANSFORM_ALLOW_COLUMNS } = require('../src/constants/index.js');
const CWD = process.cwd();

const writeFileCallback = err => {
	if (err) {
		throw err;
	}
};

const getCsvAsJson = async (filePath) => {
	const data = await readFile(filePath);

	const rows = data.toString().split('\n');
	// EXPECTED COLUMNS: PassengerId,Survived,Pclass,Name,Sex,Age,SibSp,Parch,Ticket,Fare,Cabin,Embarked
	const columns = rows[0].split(',')
		.map(token => token.replace('\r', ''))
		.filter(str => str);

	const dataRows = rows.slice(1);
	const arrayOfObjects = dataRows.map((row, index) => {
		let rowAsArray = row.split(',');
		
		if (rowAsArray.length === columns.length + 1) {
			const before = rowAsArray.slice(0,3);
			const lastAndFirst = rowAsArray.slice(3,5);
			const fullName = lastAndFirst.reverse().join(' ').replace(/["]/g, '');
			const after = rowAsArray.slice(5);
			rowAsArray = before.concat([fullName]).concat(after);
		}

		return rowAsArray.reduce((accumulator, field, index) => {
			const column = columns[index];
			if (column && TRANSFORM_ALLOW_COLUMNS.has(column)) {
				if (COLUMN_TRANSFORMS[column]) {
					const transformFunction = COLUMN_TRANSFORMS[column];
					accumulator[column] = transformFunction(field);
				} else {
					accumulator[column] = field;
				}
			}
			return accumulator;
		}, {});
	});

	const filtered = arrayOfObjects.filter(object => {
		return Object.keys(object).length > 0;
	});

	const output = {
		dataArray: filtered,
		columns: columns.filter(col => TRANSFORM_ALLOW_COLUMNS.has(col))
	};

	const jsonString = JSON.stringify(output);
	fs.writeFile(`${CWD}/training_json/titanic.json`, jsonString, writeFileCallback);
	return Promise.resolve('the file has been saved!');
};

getCsvAsJson(`${CWD}/csv/train.csv`)
	.then(message => console.log(`SUCCESS, ${message}`))
	.catch(error => console.log(`ERROR, ${error}`));