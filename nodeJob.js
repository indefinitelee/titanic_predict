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
	const columns = rows[0].split(',')
		.map(token => token.replace('\r', ''))
		.filter(str => str);
	console.log(columns);

	const dataRows = rows.slice(1);
	const arrayOfObjects = dataRows.map((row, index) => {
		let rowAsArray = row.split(',');
		
		if (rowAsArray.length === columns.length + 1) {
			const before = rowAsArray.slice(0,3);
			const lastAndFirst = rowAsArray.slice(3,5);
			const fullName = (`${lastAndFirst[1]} ${lastAndFirst[0]}`).replace(/["]/g, '');
			const after = rowAsArray.slice(5);
			rowAsArray = before.concat([fullName]).concat(after);
			console.log(rowAsArray);
		}

		return rowAsArray.reduce((accumulator, field, index) => {
			const column = columns[index];
			if (column) {
				accumulator[column] = field;
			}
			return accumulator;
		}, {});
	});
	console.log('first object in array ->', arrayOfObjects[0]);
	const filtered = arrayOfObjects.filter(obj => obj[columns[0]]);

	fs.writeFile('titanic.json', JSON.stringify(filtered), (err) => {
		if (err) throw err;
		console.log('The file has been saved!');
	});
};

getCsvAsJson('./train.csv')
	.then(() => console.log('done'))
	.catch(e => console.log(e));