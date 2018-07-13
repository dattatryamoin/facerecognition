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
      input: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function (response) {
        console.log(response);
      },
      function (err) {
        console.error(err);
      }
    );
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particleOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
        <FaceRecongnition imageUrl={this.state.input} />
      </div>
    );
  }
}

export default App;
