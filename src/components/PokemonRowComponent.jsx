import React from 'react';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';


const ThreeColumnsTableCell = styled.td`
  width: 33.33%;
`;
const ThreeColumnsTableCellRight = styled.td`
  width: 33.33%;
  text-align: right;
`;


const PokemonRowComponent = ({ pokemon, onSelect }) => (
    <tr>
        <ThreeColumnsTableCell>{pokemon.name.english}</ThreeColumnsTableCell>
        <ThreeColumnsTableCell>{pokemon.type.join(', ')}</ThreeColumnsTableCell>
        <ThreeColumnsTableCellRight>
            <Button variant="contained" size="small" onClick={() => onSelect(pokemon)}>Details</Button>
        </ThreeColumnsTableCellRight>
    </tr>);

PokemonRowComponent.propTypes = {
    pokemon: PropTypes.shape({
        name: PropTypes.shape({
            english: PropTypes.string.isRequired
        }),
        type: PropTypes.arrayOf(PropTypes.string),
        onSelect: PropTypes.func
    })
};

export default PokemonRowComponent;