import { PropTypes } from "prop-types";

const PokemonInfo = PokemonInfo.propTypes = {
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

export default PokemonInfo;