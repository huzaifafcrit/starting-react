import React from 'react';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

const PokemonInfoComponent = ({ name, base, onClose }) => (
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
        <br />
    </div>
);

export default PokemonInfoComponent;