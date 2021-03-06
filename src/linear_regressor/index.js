// import * as tf from '@tensorflow/tfjs';

class LinearRegressor {

    constructor(epochs = 250) {
        this.epochs = epochs;
        this.reset();
    }

    reset() {
        const model = tf.sequential();
        const setup = { units: 1, inputShape: [1] }
        model.add(tf.layers.dense(setup));
      
        // Prepare the model for training: Specify the loss and the optimizer.
        model.compile({
          loss: 'meanSquaredError',
          optimizer: 'sgd'
        });

        this.model = model;
    }

    addFeaturesAndLabels(features, labels) {
        const featureSize = features.length;
        const labelSize = labels.length
    
        if (featureSize !== labelSize) {
            console.log('assymetric sizes for features & labels!');
            throw new Error(`features: ${featureSize}, labels: ${labelSize}. Not the same size!`);
        }

        const sizePair = [features.length, 1];

        const detective = element => typeof element !== 'number' || isNaN(element);

        const badFeature = features.find(detective);
        const badLabel = labels.find(detective);
        if (typeof badFeature !== 'undefined') {
            console.log('bad feature found!', badFeature);
            return;
        }
        if (typeof badLabel !== 'undefined') {
            console.log('bad label found!', badLabel);
            return;
        }
  
        const xs = tf.tensor2d(features, sizePair);
        const ys = tf.tensor2d(labels, sizePair);

        this.features = xs;
        this.labels = ys;
    }

    async train() {
        this.trained = true;
        return this.model.fit(this.features, this.labels, { epochs: this.epochs });
    }

    async predict(featureValue) {
        if (!this.trained) {
            throw new Error("I need to train before I can predict!");
        }
        const tensor = this.model.predict(tf.tensor2d([featureValue], [1, 1]));
        const data = await tensor.data();
        console.log("data:", data);
        return data[0];
    }

};

export default LinearRegressor;