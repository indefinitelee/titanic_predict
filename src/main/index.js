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
            error: null,
            loading: false,
            selectedColumn: null,
            guess: null,
            prediction: null
        };

        this.displayColumns = props.json.columns.filter(columnName => CLIENT_ALLOW_COLUMNS.has(columnName));
        this.lr = new LinearRegressor();
    }

    cleanFeaturesAndLabels = (features, survivalArray) => {
        const badIndices = features.reduce((accumulator, feature, index) => {
            if (typeof feature !== 'number' || isNaN(feature)) {
                accumulator.add(index);
            }
            return accumulator;
        }, new Set());

        const theFilter = (element, index) => !badIndices.has(index);

        const cleanFeatures = features.filter(theFilter);
        const cleanLabels = survivalArray.filter(theFilter);
        return [cleanFeatures, cleanLabels];
    }

    handleFeatureColumnChange = e => {
        const { target = {} } = e;
        const selectedColumn = target.value;

        const { data, survivalArray } = this.state;
        const { getDataArrayForColumn, lr, cleanFeaturesAndLabels } = this;

        const features = getDataArrayForColumn(selectedColumn, data);
        const [cleanedFeatures, cleanedLabels] = cleanFeaturesAndLabels(features, survivalArray);
        lr.addFeaturesAndLabels(cleanedFeatures, cleanedLabels);
        this.setState({ selectedColumn });
    }

    train = async () => {
        this.setState({ loading: true });
        try {
            await this.lr.train();
            console.log('*** TRAINING COMPLETE ***');
            this.setState({ loading: false });
        } catch (error) {
            console.log(`error during training: ${error}`);
            this.setState({ loading: false, error });
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
        this.setState({ loading: true });
        try {
            const rawPrediction = await this.lr.predict(this.state.guess);
            const prediction = parseFloat((rawPrediction * 100).toFixed(2));
            this.setState({ prediction: Math.abs(prediction), loading: false });
        } catch (error) {
            console.log(`error during predicting: ${error}`);
            this.setState({ loading: false, error });
        }
    }

    getDataArrayForColumn = (columnName, allData) => allData.map(dataObject => dataObject[columnName]);

    reset = () => this.lr.reset()

    render() {
        const { loading, error, prediction, selectedColumn } = this.state;
        const { displayColumns } = this;

        console.log(this.state);

        return (
            <div style={styles.main}>
                <header style={styles.header}>
                    <h1 style={styles.hOne}>Titanic Predictor</h1>
                </header>
                <main style={styles.mainContent}>

                    <div style={(loading) ? styles.loading : styles.hide}>
                        Loading...
                    </div>
                    <div style={(error) ? styles.loading : styles.hide}>
                        Golly gosh, there was an error
                    </div>

                    <label>Select Feature</label>
                    <section>
                        <select 
                            data-cy="select"
                            onChange={this.handleFeatureColumnChange} 
                            value={selectedColumn}>
                            <option
                                value={undefined}
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

                    <div style={(typeof prediction === 'number') ? styles.loading : styles.hide}>
                        {prediction}% chance of dying
                    </div>

                    <div>
                        <button onClick={this.reset}>Reset</button>
                    </div>

                </main>
            </div>
        );
    }
};

export default Main;