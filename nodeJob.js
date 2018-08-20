const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

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
			if (column) {
				accumulator[column] = field;
			}
			return accumulator;
		}, {});
	});

	const filtered = arrayOfObjects.filter(obj => obj[columns[0]]);

	fs.writeFile('titanic.json', JSON.stringify(filtered), (err) => {
		if (err) {
			throw err;
		}
		console.log('The file has been saved!');
	});
};

getCsvAsJson('./train.csv')
.catch(e => console.log(e));