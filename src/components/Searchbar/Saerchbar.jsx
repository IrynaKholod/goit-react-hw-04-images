import React, { Component } from 'react';
import {SearchBar, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    search: '',
  }
  handleSearchChenge = e => {
  this.setState({search: e.currentTarget.value.toLowerCase()});
  }

  handleSubmit = e => {
    e.preventDefault();
    if(this.state.search.trim() === '' ){
    console.log('Please enter a search term to begin your search');    
    return;
    }
    this.props.onSubmit(this.state.search);
    this.setState({search: ''});
  }

  render() {
    return (
      <SearchBar>
        <SearchForm  onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit" >
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            value={this.state.searchResult}
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleSearchChenge}
          />
        </SearchForm>
      </SearchBar>
    );
  }
}

export default Searchbar;
