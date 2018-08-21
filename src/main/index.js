import React, { Fragment, Component } from 'react';
// import tf from '@tensorflow/tfjs';

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            json: JSON.parse(props.json)
        };

        this.handleFeatureColumnChange = (eventIThink) => {
            console.log(eventIThink);
        };

        this.handleLabelColumnChange = (eventIThink) => {
            console.log(eventIThink);
        };

        this.handleLabelColumnChange = () => {

        };
    }

    render() {
        return (
            <Fragment>
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
                    </section>

                    <button>Train</button>

                    <input type="text" onChange={this.setPredictValue}/>
                    <button>Predict {this.target} from {}</button>

                </main>
            </Fragment>
        );
    }
};

export default Main;