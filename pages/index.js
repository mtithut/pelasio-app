import React from 'react';
import {connect} from 'react-redux';
import {decrementCounter, incrementCounter} from '../redux/actions/actions';

class App extends React.Component {

    render() {
        console.log("props", this.props.counter)
        return (
            <div>
                <button onClick={this.props.incrementCounter}>Increment</button>
                <button onClick={this.props.decrementCounter}>Decrement</button>
                <h1>{this.props.counter}</h1>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    counter: state.counter.value
});


const mapDispatchToProps = {
    incrementCounter: incrementCounter,
    decrementCounter: decrementCounter,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default  App