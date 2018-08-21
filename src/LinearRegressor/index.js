import tf from '@tensorflow/tfjs';

// async function myFirstTfjs(features, labels) {
//     const featureSize = features.length;
//     const labelSize = labels.length

//     if (featureSize !== labelSize) {
//         Promise.reject(`features: ${featureSize}, labels: ${labelSize}. Not the same size!`);
//     }

//     // Create a simple model.
//     const model = tf.sequential();
//     model.add(tf.layers.dense({units: 1, inputShape: [1]}));
  
//     // Prepare the model for training: Specify the loss and the optimizer.
//     model.compile({
//       loss: 'meanSquaredError',
//       optimizer: 'sgd'
//     });

//     const sizePair = [features.length, 1];
  
//     // Generate some synthetic data for training. (y = 2x - 1)
//     const xs = tf.tensor2d(features, sizePair);
//     const ys = tf.tensor2d(labels, sizePair);
  
//     // Train the model using the data.
//     await model.fit(xs, ys, {epochs: 250});
  
//     // Use the model to do inference on a data point the model hasn't seen.
//     // Should print approximately 39.
//     document.getElementById('micro_out_div').innerText +=
//         model.predict(tf.tensor2d([20], [1, 1]));
// }

class LinearRegressor {

    constructor() {
        const model = tf.sequential();
        const steup = { units: 1, inputShape: [1] }
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
            throw new Error(`features: ${featureSize}, labels: ${labelSize}. Not the same size!`);
        }

        const sizePair = [features.length, 1];
  
        // Generate some synthetic data for training. (y = 2x - 1)
        const xs = tf.tensor2d(features, sizePair);
        const ys = tf.tensor2d(labels, sizePair);

        this.features = xs;
        this.labels = xs;
    }

    async train() {
        this.trained = true;
        return await this.model.fit(this.features, this.labels, { epochs: 250 });
    }

    predict(labelValue) {
        if (!this.trained) {
            throw new Error("I need to train before I can predict!");
        }
        return this.model.predict(tf.tensor2d([labelValue], [1, 1]));
    }

};

export default LinearRegressor;