import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import MyPokemonList from './components/MyPokemonList';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={PokemonList} />
        <Route path="/pokemon/:name" component={PokemonDetail} />
        <Route path="/my-pokemon-list" component={MyPokemonList} />
      </Switch>
    </Router>
  );
};

export default App;
