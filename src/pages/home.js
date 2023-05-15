import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Image, ActivityIndicator, ScrollView,ImageBackground } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';

const DEFAULT_HEIGHT = 500;
const DEFAULT_WITH = 600;
const defaultPickerOptions = {
  cropping: true,
  height: DEFAULT_HEIGHT,
  width: DEFAULT_WITH,
};

function Home({ navigation }) {
  const [isloaded ,setloaded] = useState(false)
  const [uri,seturi] = useState('');
  const [data,setdata] = useState(null)
  const [label,setlabel] = useState();
  const [conf,setconf] = useState()
  const labels = ['Acne and Rosacea Photos',
  'Actinic Keratosis Basal Cell Carcinoma and other Malignant Lesions',
  'Atopic Dermatitis',
  'Bullous Disease Photos',
  'Cellulitis Impetigo and other Bacterial Infections',
  'Eczema',
  'Exanthems and Drug Eruptions',
  'Hair Loss Photos Alopecia and other Hair Diseases',
  'Herpes HPV and other STDs',
  'Light Diseases and Disorders of Pigmentation',
  'Lupus and other Connective Tissue diseases',
  'Melanoma Skin Cancer Nevi and Moles',
  'Nail Fungus and other Nail Disease',
  'Poison Ivy Photos and other Contact Dermatitis',
  'Psoriasis pictures Lichen Planus and related diseases',
  'Scabies Lyme Disease and other Infestations and Bites',
  'Seborrheic Keratoses and other Benign Tumors',
  'Systemic Disease',
  'Tinea Ringworm Candidiasis and other Fungal Infections',
  'Urticaria Hives',
  'Vascular Tumors',
  'Vasculitis',
  'Warts Molluscum and other Viral Infections']
  const openPicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
    }).then(image => {
      setloaded(true)
      seturi(image.path)
      const formData = new FormData();
      formData.append('image', {
        uri:  image.path,
        type: image.mime,
        name: `image_${Date.now()}`,
      });

      // Make the POST request using Axios
      axios
        .post('https://model-rzdl.onrender.com/predict', formData,
            {headers: {"Content-Type": "multipart/form-data"}})
        .then(response => { 
          setdata(response.data)
          console.log("data destructured",response.data.predicted_label)
          console.log("data destructured",response.data.confidence)
          setlabel(response.data.predicted_label)
          setconf(response.data.confidence)
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        });
    });
  };


  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setloaded(true)
      seturi(image.path)
      const formData = new FormData();
      formData.append('image', {
        uri:  image.path,
        type: image.mime,
        name: `image_${Date.now()}`,
      });

      // Make the POST request using Axios
      axios
        .post('https://model-rzdl.onrender.com/predict', formData,
            {headers: {"Content-Type": "multipart/form-data"}})
        .then(response => {
          setdata(response.data)
          console.log("data destructured",response.data.predicted_label)
          console.log("data destructured",response.data.confidence)
          setlabel(response.data.predicted_label)
          setconf(response.data.confidence)
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        });
    }).catch(error => {
      console.log('Error:', error);
    });
  };
  return (
    <View style={styles.topcont}>
      {(!isloaded)?
        <View style={styles.scrollContainer} contentContainerStyle={styles.scrollContentContainer}>
        <Text style={styles.instructions}>Select an image source:</Text>
        <View style={styles.options}>
          <View style={styles.button}>
            {console.log("false")}
            <Button
              title="Camera"
              onPress={() => {
                openCamera();
              }}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Gallery"
              onPress={() => {
                openPicker();
              }}
            />
          </View>
        </View>
        </View>
        :<View style={{paddingTop:60}}>
          {(uri.length>0)?
        <Image source={{ uri: uri }} style={{ width: 200, height: 200, alignSelf:'center' }} />:null
          }
        <View style={styles.pred}>
        <Text style={styles.text}>Predicted class is -</Text>
        <Text style={styles.text}>{labels[label]}</Text>
        <Text style={styles.text}>Probability -</Text>
        <Text style={styles.text}>{conf}</Text>
        </View>
      </View>
      }
    
    </View>
  );
}

const styles = StyleSheet.create({
  pred:{
   paddingTop:50
  },
  text:{
    color:'black',
    fontSize:30,
    alignSelf:'center',
    marginVertical:5
  },
  topcont:{
    flex:1
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  button: {
    marginHorizontal: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginVertical: 15,
    height: DEFAULT_HEIGHT / 2.5,
    width: DEFAULT_WITH / 2.5,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
  },
});

export default Home;