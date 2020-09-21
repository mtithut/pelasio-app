import {connect} from "react-redux";

function Cart(props) {
  const {cartList} = props
  return

}

const mapStateToProps = state => ({
  // Cart: selectCart(state),
});


const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);