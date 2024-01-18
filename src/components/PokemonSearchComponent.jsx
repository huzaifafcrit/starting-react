import React from "react";
import styled from "@emotion/styled";


const Input = styled.input`
  width: -webkit-fill-available;
  padding: 5px;
  font-size: medium;
  margin-bottom: 1rem;
`;


const PokemonSearchComponent = ({ getSearch, setSearch }) => (
    <Input
        value={getSearch}
        onChange={(event) => setSearch(event.target.value)}
        placeholder='Search for a pokemon...'
    />
);

export default PokemonSearchComponent;