import Api from "../../api";
import React from "react";

function Product(props) {
  const {product} = props
  return <div className="card">
    <img src="img_avatar.png" alt="Avatar" />
      <div className="container">
        <h4><b>John Doe</b></h4>
        <p>Architect & Engineer</p>
      </div>
  </div>
}

export async function getServerSideProps(context) {
  const {id} = context.params
  let product = await Api.getCatalogs(id, 'ir', 'fa')
  return {
    props: {
      product: product,
    },
  }
}

export default Product