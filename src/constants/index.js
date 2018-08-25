const EXPECTED_COLUMNS = [
    'PassengerId',
    'Survived',
    'Pclass',
    'Name',
    'Sex',
    'Age',
    'SibSp',
    'Parch',
    'Ticket',
    'Fare',
    'Cabin',
    'Embarked'
];

const SURVIVED = 'Survived';

const TRANSFORM_ALLOW_COLUMNS = new Set([
    'Survived',
    'Pclass',
    'Sex',
    'Age',
    'Fare'
]);

const CLIENT_ALLOW_COLUMNS = new Set([
    'Pclass',
    'Sex',
    'Age',
    'Fare'
]);

const COLUMN_TRANSFORMS = {
    'Sex': maleOrFemaleString => { // 0 -> male 1 -> female
        if (!maleOrFemaleString || typeof maleOrFemaleString !== 'string') {
            return null;
        }
        if (maleOrFemaleString.toLowerCase() === 'm') {
            return 0;
        }
        return 1;
    },
    'Pclass': classString => parseFloat(classString),
    'Age': ageString => parseFloat(ageString),
    'Fare': fareString => parseFloat(fareString),
    [SURVIVED]: survivalString => parseFloat(survivalString)
};

module.exports = {
    EXPECTED_COLUMNS,
    CLIENT_ALLOW_COLUMNS,  
    TRANSFORM_ALLOW_COLUMNS, 
    COLUMN_TRANSFORMS,
    SURVIVED,
    COLUMN_DISPLAY_STRINGS: {
        'Pclass': 'Class',
        'Sex': 'Sex',
        'Age': 'Age',
        'Fare': 'Fare paid'
    },
    // GENERIC_FILTER
};