import React, { useContext } from "react";
import styled from "@emotion/styled";
import PokemonContext from "../contexts/PokemonContext";


const Input = styled.input`
  width: -webkit-fill-available;
  padding: 5px;
  font-size: medium;
  margin-bottom: 1rem;
`;


const PokemonSearchComponent = () => {
  const { getSearch, setSearch } = useContext(PokemonContext);
  return (
    <Input
      value={getSearch}
      onChange={(event) => setSearch(event.target.value)}
      placeholder='Search for a pokemon...'
    />
  );
};

export default PokemonSearchComponent;