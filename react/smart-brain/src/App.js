import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

import './App.css';

const app = new Clarifai.App({
    apiKey: 'd9c85aa67f2a417b94ac76fe91501f0c'
});

const particlesOptions = {
    particles: {
        number: {
            value: 150,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
};

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: [],
            route: 'signin',
            isSignedIn: false,
            user: {
                id: '',
                name: '',
                email: 'khoi@gmail.com',
                entries: 0 ,
                joined: ''
            }
        }
    }

    loadUser = (data) => {
      this.setState({
          user: {
              id: data.id,
              name: data.name,
              email: data.email,
              entries: data.entries,
              joined: data.joined
          }
      });
    };

    // componentDidMount() {
    //     fetch('http://localhost:3001')
    //         .then(res => res.json())
    //         .then(console.log)
    // }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions.map( (box) => { return box.region_info.bounding_box})

        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        const box = clarifaiFace.map((face) => {
                return {
                    leftCol: face.left_col * width,
                    topRow: face.top_row * height,
                    rightCol: width - (face.right_col * width),
                    bottomRow: height - (face.bottom_row * height)
                }
            }

        );
        return box;
    };

    displayFaceBox = (box) => {
      this.setState({box: box});
    };

    onInputChange = (e) => {
        this.setState({input: e.target.value});
    };

    onPictureSubmit = () => {
        this.setState({imageUrl: this.state.input});

        app.models
            .predict(
                Clarifai.FACE_DETECT_MODEL,
                this.state.input)
            .then(response => {
                if (response) {
                    fetch('http://localhost:3001/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                            this.setState(Object.assign(this.state.user, { entries: count}))
                        })
                }
                this.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch(err => console.log(err));
    };

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState({isSignedIn : false});
        } else if (route === 'home') {
            this.setState({isSignedIn : true});
        }
        this.setState({route: route});
    };

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
          <Particles className="particles"
              params={particlesOptions}
          />
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
          {
            route === 'home'
            ? <div>
                  <Logo />
                  <Rank
                      name={this.state.user.name}
                      entries={this.state.user.entries}
                  />
                  <ImageLinkForm
                      onInputChange={this.onInputChange}
                      onSubmit={this.onPictureSubmit} />
                  <FaceRecognition
                      imageUrl={imageUrl}
                      box={box}
                  />
              </div>
            : (
                route === 'signin'
                    ? <Signin
                            onRouteChange={this.onRouteChange}
                            loadUser={this.loadUser}
                        />
                    : <Register
                            onRouteChange={this.onRouteChange}
                            loadUser={this.loadUser}
                        />
              )
          }
      </div>
    );
  }
}

export default App;
