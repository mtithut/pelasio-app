import {isLoginSuccess} from "../../redux/signup/reducer";
import {connect} from "react-redux";

function Header(props) {
  return <></>
}

const mapStateToProps = state => ({
  // Cart: selectCart(state),
});


const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Header);