import React, { useEffect } from 'react';
import { Image } from 'react-native';

const Predict = ({navigation}) => {
    const image = navigation.getParam('image', null);

    const x = () => {
      if(image)
      {
      const formData = new FormData();
      formData.append('image', {
        uri: image.uri,
        type: image.type,
        name: image.fileName || `image_${Date.now()}`,
      });
      fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
            .then((response) => response.json())
            .then((data) => { 
              console.log(data)
            })
      }
      else
      {
        console.log("image is null",image)
      }
          }

  return <Image source={{uri: image.path}} />;
};

export default Predict;