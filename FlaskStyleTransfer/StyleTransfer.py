contentURL = input()

try:
  import tensorflow as tf
  import keras
  import numpy as np
  import PIL.Image

  def getStylizedImage(contentURL,styleURL):
    def tensor_to_image(tensor):
      tensor = tensor*255
      tensor = np.array(tensor, dtype=np.uint8)
      if np.ndim(tensor)>3:
        assert tensor.shape[0] == 1
        tensor = tensor[0]
      return PIL.Image.fromarray(tensor)

    filt = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    pathNameContent = "".join(ch for ch in contentURL[:min(len(contentURL),100)] if ch in filt)
    content_path = keras.utils.get_file(pathNameContent + ".jpg", contentURL)
    pathNameStyle = "".join(ch for ch in styleURL[:min(len(styleURL),100)] if ch in filt)
    style_path = keras.utils.get_file(pathNameStyle + ".jpg",styleURL)

    def load_img(path_to_img):
      max_dim = 512
      img = tf.io.read_file(path_to_img)
      img = tf.image.decode_image(img, channels=3)
      img = tf.image.convert_image_dtype(img, tf.float32)

      shape = tf.cast(tf.shape(img)[:-1], tf.float32)
      long_dim = max(shape)
      scale = max_dim / long_dim

      new_shape = tf.cast(shape * scale, tf.int32)

      img = tf.image.resize(img, new_shape)
      img = img[tf.newaxis, :]
      return img

    content_image = load_img(content_path)
    style_image = load_img(style_path)

    import tensorflow_hub as hub
    hub_module = hub.load('https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2')
    stylized_image = hub_module(tf.constant(content_image), tf.constant(style_image))[0]

    return tensor_to_image(stylized_image)

  Styles = {
    "wave"   : "https://images-na.ssl-images-amazon.com/images/I/A1WvMvFv5GL._AC_SL1500_.jpg",
    "cubism" : "https://www.theartstory.org/images20/works/salon_cubism_2.jpg",
    "pop"    : "https://d2jv9003bew7ag.cloudfront.net/uploads/andy-warhol-marilyn1-865x577.jpg",
    "starry" : "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    "kadin"  : "https://uploads0.wikiart.org/images/wassily-kandinsky/composition-viii-1923.jpg"
  }
  print("Starting Transfer...")
  getStylizedImage(contentURL,Styles["cubism"]).save("output" + ".jpeg", "JPEG")
  print("Transfer Complete!, file saved to output.jpeg")
except Exception as e:
  print(e)
  
