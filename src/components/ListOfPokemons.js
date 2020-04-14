import React, { Component } from 'react';

import PokemonItem from './PokemonItems/PokemonItemControll';

class ListOfPokemons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfTotalItems: null,
            nextURL: '',
            prewURL: '',
            items: [],
            code: null,
            offsetInState: 0
        }
    }
    getInfo = (filter, offset) => {
        if (filter === 0) {
            fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`)
                .then(response => response.json())
                .then(response => {
                    this.setState({
                        numberOfTotalItems: response.count,
                        nextURL: response.next,
                        prewURL: response.previous,
                        items: response.results,
                        code: filter,
                        offsetInState: offset
                    })
                }
                )
                .then(() => this.props.setNumberOfTotalItems(this.state.numberOfTotalItems, this.state.offsetInState))
                .catch(err => console.error(err));
        } else {
            fetch(`https://pokeapi.co/api/v2/type/${filter}`)
                .then(response => response.json())
                .then(response => {
                    const temp = response.pokemon;
                    const result = [];
                    temp.forEach(item => {
                        result.push(item.pokemon)
                    })
                    this.setState({
                        numberOfTotalItems: null,
                        nextURL: '',
                        prewURL: '',
                        items: result,
                        code: filter,
                        offsetInState: 0
                    })
                })
                .then(() => this.props.setNumberOfTotalItems(this.state.numberOfTotalItems, this.state.offsetInState))
                .catch(err => console.error(err));
        }
    }
    render() {
        const { items, code, offsetInState } = this.state;
        const { filterOfSearch, filterOfResults, offset } = this.props;

        if (code !== filterOfSearch || offsetInState !== offset) {           
            this.getInfo(filterOfSearch, offset);
        }

        return (
            <div className={"wrap-list"} >
                {!items || items.map((item, index) => <PokemonItem key={index} info={item} filter={filterOfResults} />)}
            </div>
        )
    }
}

export default ListOfPokemons;