import Api from "../../api";
import React from "react";
import styles from "../../styles/Home.module.css";
import CustomHead from "../../components/head";
import ProductCard from "../../components/product/card";

function Product(props) {
  const {product} = props
  console.log('product',product)
  return <div className={styles.container}>
    <CustomHead />

    <main className={styles.main}>
      <h1 className={styles.title}>
        به پلازیو خوش آمدید
      </h1>


    </main>
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