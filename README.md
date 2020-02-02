# Lyffe Style

Lyyfe Style is a chrome extension that partners with a flask server to style images in your browser using neural style transfer. Clicking on the chrome extension in the top right of your browser will bring up a popup that allows you to enter in an image url you would like to use as a style, with Pablo Picasso's *Girl with a Mandolin* as a default. After you have clicked the popup dragging over an image will start the process of transforming it's style.

## Deployment

- Flask server requires a veriaty of python modules installed (tensorflow, tensorflow_hub, keras, pillow, flask, flaks_cors)
- Chrome extension must be added by going to chrome://extensions/ and adding the file through the **Load Unpacked** button

## Built With

* [Flask](https://flask.palletsprojects.com/en/1.1.x/) - Web application framework
* [Tensorflow Hub](https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2) - Arbitrary Style Transfer

## Authors

* **Kaleb Sverdrup** - *general work* - [WeaselWonka](https://github.com/WeaselWonka)

* **Skylar Hoffman** - *general work* - [sky121](https://github.com/sky121)
