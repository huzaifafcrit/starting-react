import PropTypes from 'prop-types';
import './App.css';
import React from 'react';

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(', ')}</td>
    <td>
      <button onClick={() => onSelect(pokemon)}>Details</button>
    </td>
  </tr>);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired
    }),
    type: PropTypes.arrayOf(PropTypes.string),
    onSelect: PropTypes.func
  })
};

const PokemonInfo = ({ name, base, onClose }) => (
  <div>
    <h3 style={{margin: "1rem 0"}}>{name.english}</h3>
    <table style={{width: "-webkit-fill-available"}}>
      <tbody>
        {Object.keys(base).map((key) => (
          <tr key={key}>
            <td style={{width: "50%"}}>{key}</td>
            <td style={{width: "50%", textAlign: "right"}}>{base[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <button className="btn_close" onClick={onClose && (() => onClose())}>Close</button>
  </div>
);

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired, Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
  onClose: PropTypes.func
}

function App() {

  const [pokemons, setPokemons] = React.useState([]);
  const [getSearch, setSearch] = React.useState("");
  const [selectedItem, setSelectedItem] = React.useState("");

  React.useEffect(() => {
    fetch("http://localhost:3000/starting-react/pokemons.json")
      .then(res => res.json())
      .then(pokemons => setPokemons(pokemons));
  }, []);
  
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
        onChange={(event) => setSearch(event.target.value)}
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
              .slice(0, 15)
              .filter((pokemon) =>
                pokemon.name.english.toLowerCase()
                  .includes(getSearch.toLowerCase())
              )
              .map((pokemon) => (
                <PokemonRow
                  pokemon={pokemon}
                  key={pokemon.id}
                  onSelect={(pokemon) => setSelectedItem(pokemon)}
                />
              ))
          }
        </tbody>
      </table>

      {selectedItem && <PokemonInfo {...selectedItem} onClose={() => {setSelectedItem(null)}} />}

    </div>
  );
}

export default App;
