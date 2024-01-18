import React from 'react';
import styled from '@emotion/styled';
import PokemonTableComponent from './components/PokemonTableComponent';
import PokemonInfoComponent from './components/PokemonInfoComponent';
import PokemonSearchComponent from './components/PokemonSearchComponent';
import PokemonContext from './contexts/PokemonContext';

// styles
const Container = styled.div`
  margin: auto;
  width: 100%;
`;
const Title = styled.h1`
  margin-bottom: 1rem;
`;


// main
function App() {

  const [pokemons, setPokemons] = React.useState([]);
  const [getSearch, setSearch] = React.useState("");
  const [selectedItem, setSelectedItem] = React.useState("");
  const [expanded, setExpanded] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("../starting-react/pokemons.json")
      .then(res => res.json())
      .then(pokemons => setPokemons(pokemons))
      .then(() => setTimeout(() => {
        setLoading(false);
      }, 800));
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        setPokemons,
        getSearch,
        setSearch,
        selectedItem,
        setSelectedItem,
        expanded,
        setExpanded,
        loading,
        setLoading
      }}
    >
      <Container>
        <Title>Pokedex</Title>

        <PokemonSearchComponent />

        <PokemonTableComponent />

        <PokemonInfoComponent />

      </Container>
    </PokemonContext.Provider>
  );
}

export default App;
