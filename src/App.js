import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

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
      route:'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        sum: 0,
        joined: '',
      },
    }
  }

  // componentDidMount(){
  //   fetch('http://localhost:2000')
  //     .then(response => response.json())
  //     .then(console.log);
  // }

  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        sum: user.sum,
        joined: user.joined,
      },
    })
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
  };

  onPictureSubmit = (event) => {
    this.setState({ imageURL: this.state.input });

    app.models.predict( Clarifai.FACE_DETECT_MODEL, this.state.input )
    .then( response => {
      if (response) {
        fetch('http://localhost:2000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ id: this.state.user.id}),
        })
        .then( response => response.json())
        .then(data => {
          this.setState( Object.assign(this.state.user, {sum: data,}) )
        });
      }
      this.calculateFaceLocation(response);
    })
    .catch( error => console.log(error) );
  };

  onRouteChange = (route) => {
    this.setState({ route: route });

    if(route === 'homepage') {
      this.setState({ isSignedIn: true });
    } else {
      this.setState({ isSignedIn: false });
    }
  };

  render() {
    return (
      <div className="App">
        <Particles className="Particles" params={particleOptions}/>
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {
          (this.state.route === 'signin')
          ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          : (this.state.route === 'register')
            ? <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            : <>
              <Logo />
              <Rank profile={this.state.user}/>
              <ImageLinkForm onInputChange={this.onInputChange} onClickMouse={this.onPictureSubmit}/>
              <FaceRecognition link={this.state.imageURL} box={this.state.box}/>
            </>
        }

      </div>
    );
  }
}

export default App;
