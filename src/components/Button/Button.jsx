import React from 'react';
import PropTypes from 'prop-types';
import {LoadMoreBtn} from './Button.styled'

export default class Button extends React.Component {
  render() {
    return (
    <LoadMoreBtn onClick={this.props.loadNextPage}>
        Load More
      </LoadMoreBtn>
    );
  }
}
Button.propTypes = {
  loadNextPage: PropTypes.func.isRequired,
};