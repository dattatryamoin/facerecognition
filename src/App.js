import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation.js'
import Logo from './Components/Logo/Logo.js'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm.js'
import Rank from './Components/Rank/Rank.js'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecongnition from './Components/FaceRecongnition/FaceRecongnition.js'

const app = new Clarifai.App({
  apiKey: 'a993624e65bf401b8b2180859e07c73e'
});

const particleOptions =
{
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl:'',
      box: ''
    }
  }

  onInputChange = (event) => {
    this.state.box='';
    this.setState({ input: event.target.value });
  }

  onSubmit = () => {
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  calculateFaceLocation = (response) => {
    const cface = response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    
    return {
      leftCol: cface.left_col * width,
      topRow: cface.top_row * height,
      rightCol: width - (cface.right_col * width),
      bottomRow: height - (cface.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particleOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
        <FaceRecongnition box={this.state.box} imageUrl={this.state.input} />
      </div>
    );
  }
}

export default App;
