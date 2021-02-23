import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: '0b49f43c7bb345c7b14b69292e9a7352'
});

const particleOptions = {
  particles: {
    number: {
      density: {
        enable: true,
        area: 800,
        factor: 500,
      }
    }
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      imageURL: '',
      box: {},
    }
  }

  calculateFaceLocation = (response) => {
    const image = document.getElementById('faceImage');
    const width = Number(image.width);
    const height = Number(image.height);
    const boundingBox = response.outputs[0].data.regions[0].region_info.bounding_box;
    const box = {
      topRow: height * boundingBox.top_row,
      bottomRow: height - (height * boundingBox.bottom_row),
      leftCol: width * boundingBox.left_col,
      rightCol: width - (width * boundingBox.right_col),
    };
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
    // console.log(event.target.value); 不要直接调用input，会慢一拍
  };

  onClickMouse = (event) => {
    this.setState({ imageURL: this.state.input });
    //console.log(this.state.input);   不要直接调用imageURL，会慢一拍

    app.models.predict( Clarifai.FACE_DETECT_MODEL, this.state.input )
    .then( response => {
      this.calculateFaceLocation(response);
      console.log(this.state.box);} )
    .catch( error => console.log(error) );
//"https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=359667936,2778454254&fm=26&gp=0.jpg"

  };

  render() {
    return (
      <div className="App">
        <Particles className="Particles" params={particleOptions}/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onClickMouse={this.onClickMouse}/>
        <FaceRecognition link={this.state.imageURL} box={this.state.box}/>
      </div>
    );
  }
}

export default App;
