import React from 'react';
import { connect } from 'react-redux';
import MemoryItem from './memory_item';

class Memory extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { testData } = this.props;

        if ( testData === undefined ) {
            return <div className="memory-div">
              <p> Memory </p>
            </div>
        } else {
            return (
                <div className="memory-div">
                    <p> Memory </p>
                    <ul className="memory-div-container">
                        { testData.map( (datum, i) => {
                            return <MemoryItem key={i} datum={datum}/>
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
