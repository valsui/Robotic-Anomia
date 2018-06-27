import React from 'react';
import { connect } from 'react-redux';
import MemoryItem from './memory_item';

class Memory extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { testData } = this.props;
        const keys = Object.keys(testData);
        const values = Object.values(testData);

        if ( testData === undefined ) {
            return <div className="memory-div">
              <p> Memory </p>
            </div>
        } else {
            return (
                <div className="memory-div">
                    <p> Memory </p>
                    <ul className="memory-div-container">
                        { values.map( (datum, i) => {
                            return <MemoryItem key={keys[i]} datum={datum} idx={keys[i]}/>
                        })}
                    </ul>
                </div>
            )
        }

    }
}

const mapStateToProps = state => ({
    testData: state.entities.testData
})

const mapDispatchToProps = dispatch => ({
})

export default (connect(mapStateToProps, null)(Memory));
