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
        })
    }

    render() {
        const { top } = this.props;

        return (
            <div className="top-output">
                <h1>Robotic Anomia thinks the text reads: {top.string}. Were we correct?</h1>
                <div>Click on the correct answer, or write the correct string here:
                    <form onSubmit={(e) => {e.preventDefault(); this.props.handleClick(this.state)}}>
                        <input type="text" value={this.state.string} onChange={this.handleChange} />
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(null, mapDispatchToProps)(TopOutput);
