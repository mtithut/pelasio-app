import React, {useEffect, useState} from "react";
import Api from "../../api";
import styles from '../../styles/Home.module.css'
import ProductCard from "../../components/product/card";
import {useRouter} from "next/router";
import withMainLayout from "../../components/mainLayout";
import ProductFilters from "../../components/productFilters";
import {getCategoryList, setCategoryList} from "../../components/localStorage";
import Routes from '../../components/routes'
import Pagination from '../../components/pagination';

function Products(props) {

  const {productData} = props
  console.log(productData)
  const {metadata, result} = productData || {}
  const [products, setProducts] = useState(result || [])
  const [pagination, setPagination] = useState(metadata && metadata.pagination ? metadata.pagination : [])
  const router = useRouter()
  const [categories, setCategories] = useState([])
  const [filters, setFilters] = useState({
    /*    category: undefined,
        discount: false,
        'in-stock': false,
        'fast-delivery': false,
        original: false,*/
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
        if (res && res.data) {
          const data = res.data
          setProducts(data.result || [])
          data.metadata && setPagination(data.metadata.pagination || {})
        }
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
                                                 stock={product.in_stock}
                                                 onClick={event => onClickItem(product.catalog_unique_id)}/>)

          }
        </div>
      </div>
      <div className={styles.cartPayment}>
        <ProductFilters categories={categories} filters={filters} onChange={addFilter}/>

      </div>
    </div>

    <Pagination
      currentPage={pagination.current_page}
      totalPage={pagination.total_pages}
      onChange={page => {
        filters.page = page
        loadProducts(filters)
      }}/>

  </>

}

export async function getServerSideProps() {
  const params = {sort: 'price,asc'}
  let res = await Api.getProductSearch(params)
  return {
    props: {
      productData: res && res.data ? res.data : {}
    }
  }

}

export default withMainLayout(Products, 'محصولات جدیدی پلازیو')