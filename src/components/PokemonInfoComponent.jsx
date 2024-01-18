import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import PokemonContext from '../contexts/PokemonContext';

const PokemonInfoComponent = () => {
    const { selectedItem, setSelectedItem, setExpanded } = useContext(PokemonContext);
    return (
        selectedItem ?
        <div>
            <h3 style={{ margin: "1rem 0" }}>{selectedItem.name.english}</h3>
            <table style={{ width: "-webkit-fill-available" }}>
                <tbody>
                    {Object.keys(selectedItem.base).map((key) => (
                        <tr key={key}>
                            <td style={{ width: "50%" }}>{key}</td>
                            <td style={{ width: "50%", textAlign: "right" }}>{selectedItem.base[key]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <Button
                variant="outlined"
                size="small"
                startIcon={<CloseIcon />}
                onClick={() => { setSelectedItem(null); setExpanded(false); }}>
                Close
            </Button>
            <br />
        </div>
        :
        null
    );
}

export default PokemonInfoComponent;