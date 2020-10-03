import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import PokemonList from './components/PokemonList'
import PokemonView from './components/PokemonView'

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/:name" children={<PokemonView />} />
        <Route path="/"><PokemonList /></Route>
      </Switch>
    </Router>
  );
};

export default App;