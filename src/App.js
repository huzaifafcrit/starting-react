import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close'
import './App.css';

// components
const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <ThreeColumnsTableCell>{pokemon.name.english}</ThreeColumnsTableCell>
    <ThreeColumnsTableCell>{pokemon.type.join(', ')}</ThreeColumnsTableCell>
    <ThreeColumnsTableCellRight>
      <Button variant="contained" size="small" onClick={() => onSelect(pokemon)}>Details</Button>
    </ThreeColumnsTableCellRight>
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
    <h3 style={{ margin: "1rem 0" }}>{name.english}</h3>
    <table style={{ width: "-webkit-fill-available" }}>
      <tbody>
        {Object.keys(base).map((key) => (
          <tr key={key}>
            <td style={{ width: "50%" }}>{key}</td>
            <td style={{ width: "50%", textAlign: "right" }}>{base[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <br/>
    <Button 
      variant="outlined"
      size="small"
      startIcon={<CloseIcon />}
      onClick={onClose && (() => onClose())}>
        Close
    </Button>
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

// styles
const Container = styled.div`
  margin: auto;
  width: 100%;
`;
const Title = styled.h1`
  margin-bottom: 1rem;
`;
const Input = styled.input`
  width: -webkit-fill-available;
  padding: 5px;
  font-size: medium;
  margin-bottom: 1rem;
`;
const ThreeColumnsTableHeader = styled.th`
  text-align: left;
  font-size: large;
  width: 33.33%;
`;
const ThreeColumnsTableCell = styled.td`
  width: 33.33%;
`;
const ThreeColumnsTableCellRight = styled.td`
  width: 33.33%;
  text-align: right;
`;
const TableButton = styled.button`
  width: 70%;
  cursor: pointer;
`;
const CloseButton = styled.button`
  margin-top: 1rem;
  padding: 5px;
  width: 150px;
  cursor: pointer;
`;


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
    <Container>
      <Title>Pokemon Search</Title>
      <Input
        value={getSearch}
        onChange={(event) => setSearch(event.target.value)}
        placeholder='Search for a pokemon...'
      />
      <table width="100%">
        <thead>
          <tr>
            <ThreeColumnsTableHeader>Name</ThreeColumnsTableHeader>
            <ThreeColumnsTableHeader>Type</ThreeColumnsTableHeader>
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

      {selectedItem && <PokemonInfo {...selectedItem} onClose={() => { setSelectedItem(null) }} />}

    </Container>
  );
}

export default App;
