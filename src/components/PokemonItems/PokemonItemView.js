import React from 'react';
import no_photo from '../../img/no_photo.png';

const PokemonItemView = (props) => {
    const giveClassName = (nameOfCharacteristic, number) => {
        const low = "low-level characteristic";
        const middle = "middle-level characteristic";
        const high = "high-level characteristic";

        switch (nameOfCharacteristic) {
            case "height":
                if (number < 9) {
                    return low;
                } else if (number > 16) {
                    return high;
                } else {
                    return middle;
                }
            case "weight":
                if (number < 200) {
                    return low;
                } else if (number > 800) {
                    return high;
                } else {
                    return middle;
                }
            case "speed":
                if (number < 50) {
                    return low;
                } else if (number > 90) {
                    return high;
                } else {
                    return middle;
                }
            case "attack":
            case "defense":
                if (number < 40) {
                    return low;
                } else if (number > 70) {
                    return high;
                } else {
                    return middle;
                }
            default:
                return null;
        }
    }

    const { photoURL, name, height, weight, speed, attack, defense, types } = props.info;

    return (
        <div className="wrap-item">
            {photoURL ?
                <img src={photoURL} alt="pokemon" className="item-img" /> :
                <img src={no_photo} alt="no_photo" className="item-img" />
            }
            <h4>{name}</h4>
            <table><tbody>
                <tr>
                    <td>Wysokość: </td>
                    <td
                        className={giveClassName("height", height)}>
                        {height}
                    </td>
                </tr>
                <tr>
                    <td>Waga: </td>
                    <td
                        className={giveClassName("weight", weight)}>
                        {weight}
                    </td>
                </tr>
                <tr>
                    <td>Szybkość:  </td>
                    <td
                        className={giveClassName("speed", speed)}>
                        {speed}
                    </td>
                </tr>
                <tr>
                    <td>Atak: </td>
                    <td
                        className={giveClassName("attack", attack)}>
                        {attack}
                    </td>
                </tr>
                <tr>
                    <td>Obrona: </td>
                    <td
                        className={giveClassName("defense", defense)}>
                        {defense}
                    </td>
                </tr>
            </tbody></table>
            <h5>Klasyfikacja:</h5>
            {!types || types.map((item, index) => {
                return <div key={index}>{item.type.name}</div>
            })}
        </div>
    )
}


export default PokemonItemView;