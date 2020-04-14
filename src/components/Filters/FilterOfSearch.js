import React, { Component } from 'react';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    handleChange = (e) => {
        this.setState({
            value: Number(e.target.value)
        })
    }
    handleSubmit = (e) => {
        if (typeof this.props.handleChange === "function") {
            e.preventDefault();
            this.props.handleChange(this.state.value)
        }
    }
    render() {
        return (
            <form className="filters" onSubmit={this.handleSubmit}>
                <label>Wybrać:
                <select value={this.state.value} onChange={this.handleChange}>
                        <option name="all" value={0}>wszystkie</option>
                        <option name="normal" value={1}>normalne</option>
                        <option name="fighting" value={2}>bojowe</option>
                        <option name="flying" value={3}>latające</option>
                        <option name="poison" value={4}>trujące</option>
                        <option name="ground" value={5}>naziemne</option>
                        <option name="rock" value={6}>kamienne</option>
                        <option name="bug" value={7}>owady</option>
                        <option name="ghost" value={8}>widma</option>
                        <option name="steel" value={9}>stalowe</option>
                        <option name="fire" value={10}>ogniste</option>
                        <option name="water" value={11}>wodne</option>
                        <option name="grass" value={12}>trawiaste</option>
                        <option name="electric" value={13}>elektryczne</option>
                        <option name="psychic" value={14}>psychiczne</option>
                        <option name="ice" value={15}>lodowe</option>
                        <option name="dragon" value={16}>smoki</option>
                        <option name="dark" value={17}>ciemne</option>
                        <option name="fairy" value={18}>bajeczne</option>
                    </select>
                </label>
                <button type="submit">Szukać według filtru</button>
            </form>
        )
    }
}

export default Filter;