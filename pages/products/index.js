import React, {useEffect, useState} from "react";
import Api from "../../api";
import styles from '../../styles/Home.module.css'
import ProductCard from "../../components/product/card";
import {useRouter} from "next/router";
import withMainLayout from "../../components/mainLayout";
import ProductFilters from "../../components/productFilters";
import {getCategoryList, setCategoryList} from "../../components/localStorage";
import Routes from '../../components/routes'

function Products(props) {
  const {productList} = props
  const [products, setProducts] = useState(productList || [])
  const router = useRouter()
  const [categories, setCategories] = useState([])
  const [filters, setFilters] = useState({
    category: undefined,
    discount: true,
    'in-stock': false,
    'fast-delivery': false,
    original: false,
    sort: 'price,asc',//price,desc  ,date,asc,date,desc

  })
  useEffect(() => {
    if (getCategoryList()) {
      setCategories(JSON.parse(getCategoryList()))
    } else
      Api.getCategory('fa').then(res => {
        if (res && res.data && Array.isArray(res.data)) {
          setCategories(res.data)
          setCategoryList(JSON.stringify(res.data))
        }
      })
  }, [])

  const addFilter = (filter) => {
    const newFilters = Object.assign(filters, filter);
    setFilters(newFilters)
    console.log(newFilters)
    Object.entries(newFilters).forEach(([key, value]) => {
        value == false && delete newFilters[key]
      }
    )
    loadProducts(newFilters)
  }

  const loadProducts = (filters) => {
    Api.getProductSearch(filters)
      .then(res => {
        res && res.data && res.data.result && setProducts(res.data.result)
      })
  }

  const onClickItem = id => {
    router.push(`${Routes.products}/${id}`)
  }
  return <>
    <div className={styles.grid}>
      <div className={styles.cartItemCard}>
        <div className={styles.grid}>
          {
            products && Array.isArray(products) &&
            products.map(product => <ProductCard key={`pro-${product.unique_id}`} name={product.name}
                                                 logo={product.default_photo}
                                                 pricing={product.pricing}
                                                 onClick={event => onClickItem(product.catalog_unique_id)}/>)

          }
        </div>
      </div>
      <div className={styles.cartPayment}>
        <ProductFilters categories={categories} filters={filters} onChange={addFilter}/>

      </div>
    </div>
  </>

}

export async function getServerSideProps() {
  let res = await Api.getProductSearch()
  return {
    props: {
      productList: res && res.data && res.data.result
    }
  }

}

export default withMainLayout(Products, 'محصولات جدیدی پلازیو')