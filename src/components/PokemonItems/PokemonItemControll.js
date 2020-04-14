import React, { Component } from 'react';

import PokemonItemView from './PokemonItemView';

class PokemonItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoURL: '',
            name: null,
            height: null,
            weight: null,
            speed: null,
            attack: null,
            defense: null,
            types: null,
            url: null
        }
    }

    getInfo = (urlFromProps) => {
        fetch(urlFromProps)
            .then(response => response.json())
            .then(response => {
                const name = this.props.info.name;
                const nameUpper = name[0].toUpperCase() + name.slice(1);

                const stats = response.stats;
                const statsForDisplay = {};
                for (let key of stats) {
                    statsForDisplay[key.stat.name] = key.base_stat;
                }

                this.setState({
                    photoURL: response.sprites.front_default,
                    name: nameUpper,
                    height: response.height,
                    weight: response.weight,
                    speed: statsForDisplay.speed,
                    attack: statsForDisplay.attack,
                    defense: statsForDisplay.defense,
                    types: response.types,
                    url: urlFromProps
                })
            })
            .catch(err => console.error(err));
    }
    isShow = () => {
        const { height, weight, speed, attack, defense } = this.state;
        const { heightMax, heightMin, weightMax, weightMin, speedMax, speedMin, attackMax, attackMin, defenseMax, defenseMin } = this.props.filter;
        
        if (
            (heightMax !== 0 && height > heightMax) ||
            (heightMin !== 0 && height < heightMin) ||
            (weightMax !== 0 && weight > weightMax) ||
            (weightMin !== 0 && weight < weightMin) ||
            (speedMax !== 0 && speed > speedMax) ||
            (speedMin !== 0 && speed < speedMin) ||
            (attackMax !== 0 && attack > attackMax) ||
            (attackMin !== 0 && attack < attackMin) ||
            (defenseMax !== 0 && defense > defenseMax) ||
            (defenseMin !== 0 && defense < defenseMin)
        ) {            
            return false
        }
        return true
    }
    render() {
        const urlFromProps = this.props.info.url;
        const { url } = this.state;

        if (urlFromProps !== url) {
            this.getInfo(urlFromProps);
        }
        const isShow = this.isShow();
 
        return (
            isShow ? <PokemonItemView info={this.state} /> : null
        )
    }
}

export default PokemonItem;