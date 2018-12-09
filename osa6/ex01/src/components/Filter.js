import React from 'react';
import { setFilter } from '../reducers/filterReducer';

class Filter extends React.Component {
  handleChange = event => {
    const { store } = this.props;
    const filterValue = event.target.value;
    store.dispatch(setFilter(filterValue));
  };

  render() {
    const style = {
      marginBottom: 10
    };

    return (
      <div style={style}>
        filter
        <input onChange={this.handleChange} />
      </div>
    );
  }
}

export default Filter;
