import PropTypes from 'prop-types';
import './App.css';
import pokemons from './pokemons.json';
import React from 'react';

const PokemonRow = ({ pokemon }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(', ')}</td>
  </tr>);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string
    }),
    type: PropTypes.arrayOf(PropTypes.string)
  })
};

function App() {

  const [getSearch, setSearch] = React.useState("");

  return (
    <div
      style={{
        margin: "auto",
        width: "100%",
      }}
    >
      <h1 className="title">Pokemon Search</h1>
      <input
        value={getSearch}
        onChange={(event)=>setSearch(event.target.value)}
        placeholder='Search for a pokemon...'
      />
      <table width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {
            pokemons
              .slice(0, 20)
              .filter((pokemon) => pokemon.name.english.toLowerCase().includes(getSearch.toLowerCase()))
              .map((pokemon) => (
              <PokemonRow pokemon={pokemon} key={pokemon.id} />
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
