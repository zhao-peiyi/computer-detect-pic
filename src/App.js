import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Homepage from './components/Homepage/Homepage';

import Rank from './components/Rank/Rank';

// import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

import Particles from 'react-particles-js';

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

const initialState = {
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
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        sum: user.entries,
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

    fetch('https://obscure-river-59267.herokuapp.com/imageURL', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ input: this.state.input })
    })
    .then( response => response.json())
    .then( data => {
      this.calculateFaceLocation(data);
      if (data) {
        fetch('https://obscure-river-59267.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ id: this.state.user.id}),
        })
        .then( response => response.json())
        .then( data => this.setState( Object.assign(this.state.user, {sum: data,})) )
        .catch( err => console.log(err) );
      }
    })
    .catch( err => console.log(err) );
  };

  onRouteChange = (route) => {
    this.setState({ route: route });

    if(route === 'homepage') {
      this.setState({ isSignedIn: true });
    } else if(route ==='signout'){
      this.setState(initialState);
    }  else {
      this.setState({ isSignedIn: false });
    }
  };

  render() {
    return (
      <div className="App">
        <Particles className="Particles" params={particleOptions}/>
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {
          (this.state.route === 'signin' || this.state.route === 'signout')
          ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          : (this.state.route === 'register')
            ? <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            : (this.state.route === 'homepage')
              ? <Homepage onInputChange={this.onInputChange} onClickMouse={this.onPictureSubmit}/>
              : <Rank/>
        }
      </div>
    );
  }
}

export default App;
