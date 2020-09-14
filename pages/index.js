import React from 'react';
import {connect} from 'react-redux';
import Link from "next/link";
import styles from '../styles/Home.module.css'
import {isLoginSuccess} from "../redux/signup/reducer";

class App extends React.Component {

  render() {
    console.log("props", this.props.counter)
    const {loginSuccess} = this.props
    return (
      <div className={styles.container}>
        {/*<button onClick={this.props.incrementCounter}>Increment</button>*/}
        {/*<button onClick={this.props.decrementCounter}>Decrement</button>*/}
        {/*<h1>{this.props.counter}</h1>*/}
        <h1>خانه</h1>
        {loginSuccess ? <h2 className={styles.welcome}>به پلازیو خوش آمدید</h2> : < h2>< Link href={'/signup'}>ورود</Link></h2>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginSuccess: isLoginSuccess(state),
  // counter: state.counter.value
});


const mapDispatchToProps = {
  // incrementCounter: incrementCounter,
  // decrementCounter: decrementCounter,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default  App