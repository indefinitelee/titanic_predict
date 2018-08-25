import React, { Fragment, Component } from 'react';
import LinearRegressor from '../linear_regressor';

const styles = {
    br: {
        marginBottom: '20px'
    }
};

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            json: props.json
        };

        this.handleFeatureColumnChange = (eventIThink) => {
            console.log(eventIThink);
            // this.lr.addFeaturesAndLabels();
        };

        // this.handleLabelColumnChange = (eventIThink) => {
        //     console.log(eventIThink);
        // };

        this.handleLabelColumnChange = (eventIThink) => {
            console.log(eventIThink);
        };

        this.train = () => {

        };

        this.predict = () => {

        };

        this.lr = new LinearRegressor();
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <header>
                    <h1>Titanic Predictor</h1>
                </header>
                <main>

                    <label>Select Feature</label>
                    <section>
                        <select onChange={this.handleFeatureColumnChange}>
                            {this.state.json.columns.map(column => (
                                <option
                                    value={column}
                                >
                                    {column}
                                </option>
                            ))}
                        </select>
                    </section>

                    {/* <div style={styles.br} />

                    <label>Select Label</label>
                    <section>
                        <select onChange={this.handleLabelColumnChange}>
                            {this.state.json.columns.map(column => (
                                <option
                                    value={column}
                                >
                                    {column}
                                </option>
                            ))}
                        </select>
                    </section> */}

                    <div style={styles.br} />

                    <button onClick={this.train}>Train</button>

                    <div style={styles.br} />

                    <input type="text" onChange={this.setPredictValue}/>
                    <button onClick={this.predict}>Predict</button>

                </main>
            </div>
        );
    }
};

export default Main;