import React from 'react';
import { connect } from 'react-redux';


class Select extends React.Component {

  constructor(){

  }

  render(){
    let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    return (
      <select value={this.state.value} onChange={this.handleChange}>
          {
            letters.map( (letter, idx) => {
              return(
                <option value="letter" key={idx}>{letter}</option>
              )
            })
          }
      </select>
    )
  }

}

const mapDispatchToProps = dispatch => {

}

export default Select;
