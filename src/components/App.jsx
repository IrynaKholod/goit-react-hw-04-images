import React, { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Saerchbar';





export class App extends Component {
  state = {
    search: '',
  };

 handleFormSubmit = search => {
 this.setState({search});
 }

  render() {
    return (
      <div> 
      <Searchbar onSubmit={this.handleFormSubmit}/>
        <ImageGallery search={this.state.search}/>
      </div>
    );
  }
}
