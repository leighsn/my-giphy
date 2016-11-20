import React, { Component } from 'react'
import '../public/css/Bootstrap-Cosmo.css'
import '../public/css/App.css'
import SearchBar from './containers/search-bar'
import Gifs from './containers/gifs'

class App extends Component {
  render() {
    return (
      <div>
      <SearchBar />
      <Gifs />
      </div>
    );
  }
}

export default App;
