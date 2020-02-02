# Lyffe Style

Lyyfe Style is a chrome extension that partners with a flask server to style images in your browser using neural style transfer. Clicking on the chrome extension in the top right of your browser will bring up a popup that allows you to enter in an image url you would like to use as a style, with Pablo Picasso's *Girl with a Mandolin* as a default. After you have clicked the popup dragging over an image will start the process of transforming it's style.

## Deployment

### Flask server
1. install Python 3.7 (earlier versions may work but have not been tested)
2. use pip to install the following: tensorflow, tensorflow_hub, keras, Pillow, flask, flask_cors (*python3 -m pip install "module name"*)
3. in command prompt make your current directory .../Lyffe-Style-Flask-Server/FlaskStyleTransfer/
4. run the command *python3 -m flask run*
- Note: If you are on a mac and your server crashes due to an URL fetch error, go to your python3.7 folder in applications and run the
"install Certificates.command" file  

### Chrome extension
1. open up google chrome
2. go to the link chrome://extensions/
3. toggle on developer mode, in the top right corner, if not already done
4. click on the Load Unpacked button and select the folder Final Version
5. click the update button

## Built With

* [Flask](https://flask.palletsprojects.com/en/1.1.x/) - Web application framework
* [Tensorflow Hub](https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2) - Arbitrary Style Transfer

## Authors

* **Kaleb Sverdrup** - *general work* - [WeaselWonka](https://github.com/WeaselWonka)

* **Skylar Hoffman** - *general work* - [sky121](https://github.com/sky121)

* **Jacob Huang** - *front end* - [jacobjh1](https://github.com/jacobjh1)

* **Jacob Huang** - *front end* - [jingwl13](https://github.com/JingleOne)
