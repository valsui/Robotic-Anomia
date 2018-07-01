import React from 'react';
import { connect } from 'react-redux';

class TopOutput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            string: ""
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        e.preventDefault();

        this.setState({
            string: e.currentTarget.value
        });
        e.currentTarget.value = "";
    }

    render() {
        const { top } = this.props;

        return (
            <div className="top-output">
              <div id="instruction">
                  <p>Is this: <span> {top.string}</span> ? </p>
                  <p>Click on the correct answer bubble, or type the answer here: </p>
                </div>
                <form onSubmit={(e) => {e.preventDefault(); this.props.handleClick(this.state)}}>
                  <input type="text" value={this.state.string} onChange={this.handleChange} />
                  <button> Submit </button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(null, mapDispatchToProps)(TopOutput);
