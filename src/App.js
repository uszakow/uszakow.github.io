import React, { Component } from 'react';
import './App.css';

import ListOfPokemons from './components/ListOfPokemons';
import FilterOfSearch from './components/Filters/FilterOfSearch';
import FilterOfResults from './components/Filters/FilterOfResults';
import ListOfPages from './components/ListOfPages';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOfSearch: 0,
      filterOfResults: {},
      offset: 0,
      numberOfTotalItems: null
    }
  }
  handleFilterOfSearch = (value) => {
    this.setState({
      filterOfSearch: value
    })
  }
  handleFilterOfResults = (obj) => {
    this.setState({
      filterOfResults: obj
    })
  }
  setOffset = (number) => {
    this.setState({
      offset: number
    })
  }
  setNumberOfTotalItems = (numberOfTotalItems, offset) => {
    this.setState({
      numberOfTotalItems,
      offset
    })
  }
  render() {
    const { filterOfSearch, filterOfResults, offset, numberOfTotalItems } = this.state;

    return (
      <div>
        <header className="wrap-list">
          <FilterOfSearch handleChange={this.handleFilterOfSearch} />
          <FilterOfResults handleChange={this.handleFilterOfResults} />
        </header>
        <main>
          <ListOfPages
            numberOfTotalItems={numberOfTotalItems}
            setOffset={this.setOffset}
          />
          <ListOfPokemons
            filterOfSearch={filterOfSearch}
            filterOfResults={filterOfResults}
            offset={offset}
            setNumberOfTotalItems={this.setNumberOfTotalItems}
          />
        </main>
      </div >
    );
  }
}

export default App;