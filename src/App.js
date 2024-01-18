import React from 'react';
import styled from '@emotion/styled';
import PokemonTableComponent from './components/PokemonTableComponent';
import PokemonInfoComponent from './components/PokemonInfoComponent';
import PokemonSearchComponent from './components/PokemonSearchComponent';


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
      <Title>Pokedex</Title>
      
      <PokemonSearchComponent
        getSearch={getSearch}
        setSearch={setSearch}
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

      {selectedItem && <PokemonInfoComponent {...selectedItem} onClose={() => { setSelectedItem(null); setExpanded(false); }} />}

    </Container>
  );
}

export default App;
