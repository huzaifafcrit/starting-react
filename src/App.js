import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
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
    <br />
    <Button
      variant="outlined"
      size="small"
      startIcon={<CloseIcon />}
      onClick={onClose && (() => onClose())}>
      Close
    </Button>
    <br/>
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

const PokemonTableComponent = ({ ThreeColumnsTableContainer, pokemons, setSelectedItem, setExpanded, loading }) => (
  !loading && pokemons && pokemons.length > 0 ?
    <ThreeColumnsTableContainer>
      <table width="100%" id="pokemon_table">
        <thead>
          <tr>
            <ThreeColumnsTableHeader>Name</ThreeColumnsTableHeader>
            <ThreeColumnsTableHeader>Type</ThreeColumnsTableHeader>
          </tr>
        </thead>
        <tbody style={{ overflowY: "auto", height: "70px" }}>
          {
            pokemons
              .map((pokemon) => (
                <PokemonRow
                  pokemon={pokemon}
                  key={pokemon.id}
                  onSelect={(pokemon) => { setSelectedItem(pokemon); setExpanded(true); }}
                />
              ))
          }
        </tbody>
      </table>
    </ThreeColumnsTableContainer> :
    <ThreeColumnsTableContainer>
      <div style={{padding: "1px"}}>
      {loading ? (
                  <LoadingSpinner>
                    <Box sx={{ display: 'flex' }}>
                      <CircularProgress />
                    </Box>
                  </LoadingSpinner>
                  ) : 'No pokemons found...'}
      </div>
    </ThreeColumnsTableContainer>
);

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
const LoadingSpinner = styled.div`
  display: flex;
  width: 100%;
  height: 80vh;
  justify-content: center;
  align-items: center;
`;

function App() {

  const [pokemons, setPokemons] = React.useState([]);
  const [getSearch, setSearch] = React.useState("");
  const [selectedItem, setSelectedItem] = React.useState("");
  const [expanded, setExpanded] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const ThreeColumnsTableContainer = styled.div`
    display: block;
    overflow-y: auto;
    width: 100%;
    height: ${expanded ? 'calc(100vh - 150px - 280px)' : 'calc(100vh - 134px)'};
  `;

  React.useEffect(() => {
    fetch("../starting-react/pokemons.json")
      .then(res => res.json())
      .then(pokemons => setPokemons(pokemons))
      .then(() => setTimeout(() => {
        setLoading(false);
      }, 800));
  }, []);

  return (
    <Container>
      <Title>Pokemon Search</Title>
      <Input
        value={getSearch}
        onChange={(event) => setSearch(event.target.value)}
        placeholder='Search for a pokemon...'
      />

      <PokemonTableComponent
        ThreeColumnsTableContainer={ThreeColumnsTableContainer}
        pokemons={pokemons
          .filter((pokemon) =>
            pokemon.name.english.toLowerCase()
              .includes(getSearch.toLowerCase())
          )}
        setSelectedItem={setSelectedItem}
        setExpanded={setExpanded}
        loading={loading}
      />

      {selectedItem && <PokemonInfo {...selectedItem} onClose={() => { setSelectedItem(null); setExpanded(false); }} />}

    </Container>
  );
}

export default App;
