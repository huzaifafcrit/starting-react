import React, { useContext } from "react";
import styled from "@emotion/styled";
import PokemonRowComponent from "./PokemonRowComponent";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import PokemonContext from "../contexts/PokemonContext";


const ThreeColumnsTableHeader = styled.th`
  text-align: left;
  font-size: large;
  width: 33.33%;
`;
const LoadingSpinner = styled.div`
  display: flex;
  width: 100%;
  height: 80vh;
  justify-content: center;
  align-items: center;
`;


const PokemonTableComponent = () => {

    const { pokemons, setSelectedItem, getSearch, expanded, setExpanded, loading } = useContext(PokemonContext);
    const ThreeColumnsTableContainer = styled.div`
        display: block;
        overflow-y: auto;
        width: 100%;
        height: ${expanded ? 'calc(100vh - 150px - 280px)' : 'calc(100vh - 134px)'};
    `;


    return (
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
                                .filter((pokemon) =>
                                    pokemon.name.english.toLowerCase()
                                        .includes(getSearch.toLowerCase())
                                )
                                .map((pokemon) => (
                                    <PokemonRowComponent
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
                <div style={{ padding: "1px" }}>
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

};


export default PokemonTableComponent;