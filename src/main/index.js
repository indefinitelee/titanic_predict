import React, { Fragment, Component } from 'react';
import LinearRegressor from '../linear_regressor';
import {
    CLIENT_ALLOW_COLUMNS,
    SURVIVED,
    EXPECTED_COLUMNS,
    COLUMN_DISPLAY_STRINGS
} from '../constants';
import styles from './styles.js';

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: props.json.dataArray,
            columns: props.json.columns,
            survivalArray: this.getDataArrayForColumn(SURVIVED, props.json.dataArray),
            //json: props.json,
            error: null,
            loading: false,
            selectedColumn: null,
            guess: null,
            prediction: null
        };

        this.displayColumns = props.json.columns.filter(columnName => CLIENT_ALLOW_COLUMNS.has(columnName));
        this.lr = new LinearRegressor();
    }

    handleFeatureColumnChange = e => {
        const { target = {} } = e;
        this.setState({ selectedColumn: target.value }, () => {
            const { selectedColumn, data, survivalArray } = this.state;
            const { getDataArrayForColumn, lr } = this;

            console.log(`setting features array from column: ${selectedColumn}`);
            const features = getDataArrayForColumn(selectedColumn, data);
            if (!features.length) {
                console.log('empty features received, wtf');
            } 
            lr.addFeaturesAndLabels(features, survivalArray);
        });
    }

    train = () => {
        this.setState({ loading: true }, async () => {
            try {
                await this.lr.train();
                console.log('training complete');
                this.setState({ loading: false } );
            } catch (error) {
                console.log(`error during training: ${error}`);
                this.setState({ loading: false, error });
            }
        });
    }

    setPredictValue = e => {
        const { target = {} } = e;
        const { value } = target;
        if (value) {
            this.setState({ guess: parseFloat(value) });
        }
    }

    predict = () => this.setState({ prediction: this.lr.predict(this.state.guess) })

    getDataArrayForColumn = (columnName, allData) => allData.map(dataObject => dataObject[columnName])

    reset = () => this.lr.reset()

    render() {
        console.log(this.state);
        const { loading, error, prediction, selectedColumn } = this.state;
        const { displayColumns } = this;

        return (
            <div style={styles.main}>
                <header style={styles.header}>
                    <h1>Titanic Predictor</h1>
                </header>
                <main>

                    {(loading) ? <div style={styles.loading}>Loading...</div>: ''}
                    {(error) ? <div style={styles.loading}>Golly gosh, there was an error</div>: ''}

                    <label>Select Feature</label>
                    <section>
                        <select onChange={this.handleFeatureColumnChange} value={selectedColumn}>
                            <option
                                value={null}
                            >
                                select a feature...
                            </option>
                            {displayColumns.map(column => (
                                <option
                                    value={column}
                                >
                                    {COLUMN_DISPLAY_STRINGS[column]}
                                </option>
                            ))}
                        </select>
                    </section>

                    <div style={styles.br} />

                    <button onClick={this.train} disabled={loading}>Train</button>

                    <div style={styles.br} />

                    <div style={(selectedColumn) ? styles.show : styles.hide}>
                        <label>
                            Enter a {COLUMN_DISPLAY_STRINGS[selectedColumn]} value for survival prediction
                        </label>
                        <input type="text" onChange={this.setPredictValue}/>
                        <button onClick={this.predict} disabled={loading}>Predict</button>
                    </div>

                    <div style={styles.br} />

                    {(loading) ? <div style={styles.loading}>prediction: {prediction}</div>: ''}

                    <div>
                        <button onClick={this.reset}>Reset</button>
                    </div>

                </main>
            </div>
        );
    }
};

export default Main;