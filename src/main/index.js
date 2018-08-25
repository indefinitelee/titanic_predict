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
        const selectedColumn = target.value;

        const { data, survivalArray } = this.state;
        const { getDataArrayForColumn, lr } = this;

        console.log(`setting features array from column: ${selectedColumn}`);
        const features = getDataArrayForColumn(selectedColumn, data);
        if (!features.length) {
            console.log('empty features received, wtf');
        } 
        lr.addFeaturesAndLabels(features, survivalArray);

        this.setState({ selectedColumn });
    }

    train = async () => {
        this.setState({ loading: true }, () => console.log(`loading: ${this.state.loading}`));
        try {
            await this.lr.train();
            console.log('training complete');
            this.setState({ loading: false }, () => console.log('set state to not loading') );
        } catch (error) {
            console.log(`error during training: ${error}`);
            this.setState({ loading: false, error }, () => console.log(`loading: ${this.state.loading}`));
        }
    }

    setPredictValue = e => {
        const { target = {} } = e;
        const { value } = target;
        if (value) {
            this.setState({ guess: parseFloat(value) });
        }
    }

    predict = async () => {
        this.setState({ loading: true }, () => console.log(`loading: ${this.state.loading}`));
        try {
            const rawPrediction = await this.lr.predict(this.state.guess);
            const prediction = parseFloat((rawPrediction * 100).toFixed(2));
            this.setState({ prediction: Math.abs(prediction), loading: false }, () => {
                console.log(`loading: ${this.state.loading}`);
            });
        } catch (error) {
            console.log(`error during predicting: ${error}`);
            this.setState({ loading: false, error }, () => console.log(`loading: ${this.state.loading}`));
        }
    }

    getDataArrayForColumn = (columnName, allData) => {
        return allData.map(dataObject => dataObject[columnName]);
    }

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

                    {
                        (prediction) ?
                            <div style={styles.loading}>{prediction}% chance of dying</div>
                                : ''
                    }

                    <div>
                        <button onClick={this.reset}>Reset</button>
                    </div>

                </main>
            </div>
        );
    }
};

export default Main;