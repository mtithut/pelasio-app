import React from "react";
import Api from "../../api";
import styles from '../../styles/Home.module.css'
import Head from "next/head";
import ProductCard from "../../components/product/card";
import CustomHead from "../../components/head";
import {useRouter} from "next/router";
import Header from "../../components/header";
import withMainLayout from "../../components/mainLayout";

function Products(props) {
  const {products} = props
  const {data, error, message, status} = products
  console.log('products', products)
  const router = useRouter()

  const onClickItem = id => {
    router.push('/products/' + id)
  }
  return <>
    <main className={styles.main}>
      <div className={styles.grid}>
        {
          data && data.result && Array.isArray(data.result) &&
          data.result.map(product => <ProductCard key={`pro-${product.unique_id}`} name={product.name}
                                                  logo={product.default_photo}
                                                  pricing={product.pricing}
                                                  onClick={event => onClickItem(product.catalog_unique_id)}/>)

        }
      </div>
    </main>
  </>

}

export async function getServerSideProps() {
  let products = await Api.getProductFilter(68, 10, 'random', true, 'fa')
  return {
    props: {
      products: products
    }
  }

}

export default withMainLayout(Products, 'محصولات جدیدی پلازیو')