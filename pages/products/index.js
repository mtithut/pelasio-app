import React from "react";
import Api from "../../api";
import styles from '../../styles/Home.module.css'
import Head from "next/head";
import ProductCard from "../../components/product/card";
import CustomHead from "../../components/head";
import {useRouter} from "next/router";
import Header from "../../components/header";

function Products(props) {
  const {products} = props
  const {data, error, message, status} = products
  console.log('products', products)
  const router = useRouter()

  const onClickItem = id => {
    router.push('/products/' + id)
  }
  return <>
    <Header/>
    <div className={styles.container}>


      <main className={styles.main}>
        <h1 className={styles.title}>
          به پلازیو خوش آمدید
        </h1>

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
      <footer className={styles.footer}>
        <a
          href="https://www.pelazio.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/pelazio/logo.png" alt="pelazio Logo" className={styles.logo}/>
        </a>
      </footer>
    </div>
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

export default Products