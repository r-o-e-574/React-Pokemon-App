import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import PokemonList from './components/PokemonList'
import PokemonView from './components/PokemonView'
import Landing from './components/Landing/Landing'

function App () {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Landing /></Route>
        <Route exact path="/main"><PokemonList /></Route>
        <Route path="/main/:name" ><PokemonView /></Route>
      </Switch>
    </Router>
  )
};

export default App
