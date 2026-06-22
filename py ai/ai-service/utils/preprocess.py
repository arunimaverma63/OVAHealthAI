import numpy as np
from tensorflow.keras.preprocessing import image

IMG_SIZE = 224

def preprocess_image(image_path):
    #load image from disk
    img= image.load_img(image_path,target_size=(IMG_SIZE,IMG_SIZE))

    #convert PIL img to numpy array
    img_array = image.img_to_array(img)

    #normalize pixel values
    img_array = img_array / 255.0

    #Add batch dimension
    img_array = np.expand_dims(img_array,axis=0)

    return img_array