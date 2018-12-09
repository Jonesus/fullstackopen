import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const mapDispatchToProps = {
  setFilter
};

class Filter extends React.Component {
  handleChange = event => {
    const filterValue = event.target.value;
    this.props.setFilter(filterValue); // eslint-disable-line
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

const ConnectedFilter = connect(
  null,
  mapDispatchToProps
)(Filter);

export default ConnectedFilter;
