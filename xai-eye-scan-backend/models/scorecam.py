import tensorflow as tf
from keras.models import Model
import cv2
import numpy as np


def generate_heatmap(model, img_array, target_layer_name, class_index, pred_class_name, raw_image):
  conv_output = model.get_layer(target_layer_name).output
  activation_model = Model(inputs=model.input, outputs=conv_output)

  activations = activation_model.predict(img_array)
  activations = activations[0]

  scores = []
  for i in range(activations.shape[-1]): # shape = (14, 14, 3)
    activation_map = activations[:, :, i]

    upscaled_map = cv2.resize(activation_map, (img_array.shape[2], img_array.shape[1]))

    # Add a small epsilon to prevent division by zero
    denominator = np.max(upscaled_map) - np.min(upscaled_map)
    normalized_map = (upscaled_map - np.min(upscaled_map)) / (denominator + 1e-6)

    mask = np.expand_dims(normalized_map, axis=-1)
    masked_image = img_array[0] * mask
    masked_image = np.expand_dims(masked_image, axis=0)

    predictions = model.predict(masked_image)

    score = predictions[0][class_index]
    scores.append(score)

  scores = np.array(scores)

  # --- THIS IS THE KEY FIX ---
  # Normalize the scores to a 0-1 range to use as weights.
  # This makes the heatmap much more discriminative.
  if np.max(scores) - np.min(scores) > 0:
      scores = (scores - np.min(scores)) / (np.max(scores) - np.min(scores))
  # -------------------------

  weights = scores

  weighted_activations = activations * weights.reshape((1, 1, -1))
  cam = np.sum(weighted_activations, axis=-1)

  cam = np.maximum(cam, 0)

  # Normalize the final heatmap
  heatmap = (cam - np.min(cam)) / (np.max(cam) - np.min(cam) + 1e-6)

  #----------------------------------#--------------------------#-------------------------#

  img = np.array(raw_image.convert("RGB"))

  heatmap = cv2.resize(heatmap, (img.shape[1], img.shape[0]))

  heatmap = np.uint8(255 * heatmap)
  heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)

  heatmap = cv2.cvtColor(heatmap, cv2.COLOR_BGR2RGB)

  superimposed_img = heatmap * 0.4 + img
  superimposed_img = np.clip(superimposed_img, 0, 255).astype(np.uint8)


  return superimposed_img