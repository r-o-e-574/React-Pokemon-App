import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Landing from './routes/Landing'
import PokemonListData from './routes/PokemonListData'
import PokemonViewData from './routes/PokemonViewData'

function App () {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Landing /></Route>
        <Route exact path="/main"><PokemonListData /></Route>
        <Route path="/main/:name" ><PokemonViewData /></Route>
      </Switch>
    </Router>
  )
};

export default App
