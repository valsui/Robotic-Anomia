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
                <p>Robotic Anomia thinks the text reads: {top.string}. Is it correct?</p>
                <div><p>Click on the correct answer, </p>
                      <p>or type the answer here:</p>
                    <form onSubmit={(e) => {e.preventDefault(); this.props.handleClick(this.state); this.setState({string: ""})}}>
                        <input type="text" value={this.state.string} onChange={this.handleChange} />
                        <input type="submit" onClick={(e) => { e.preventDefault(); this.props.handleClick(this.state); this.setState({ string: "" })}} value="Submit"/>
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
