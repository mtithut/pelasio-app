import React, {useEffect, useState} from "react";
import Api from "../../api";
import styles from '../../styles/Home.module.css'
import ProductCard from "../../components/product/card";
import {useRouter} from "next/router";
import withMainLayout from "../../components/mainLayout";

function Products(props) {
  const {products} = props
  const {data, error, message, status} = products
  const router = useRouter()
  const [categories, setCategories] = useState([])
  const [filters, setFilters] = useState({
    category: undefined,
    discount: true,
    'in-stock': true,
    'fast-delivery': true,
    original: true,
    sort: 'price,asc',//price,desc  ,date,asc,date,desc

  })
  useEffect(() => {
    Api.getCategory().then(res => {
      if (res && res.data && Array.isArray(res.data)) {
        setCategories(res.data)
      }
    })
  }, [])
  const addFilter = (type, value) => {
    let filter = {}
    filter[type] = value
    const newFilters = Object.assign(filters, filter);
    setFilters(newFilters)
  }

  const onClickItem = id => {
    router.push('/products/' + id)
  }
  return <>
    <main className={styles.main}>
      <div className={styles.grid}>
        <div className={styles.card}>
          <input type="checkbox" id="discount" name="discount" value={filters.discount}/>
          <label htmlFor="discount">تخفیف</label>
        </div>
        <div className={styles.card}>
          <input type="checkbox" id="original" name="original" value={filters.original}/>
          <label htmlFor="original">اصل</label>
        </div>
        <div className={styles.card}>
          <input type="checkbox" id="fast-delivery" name="fast-delivery" value={filters['fast-delivery']}/>
          <label htmlFor="in-stock">تحویل فوری</label>
        </div>
        <div className={styles.card}>
          <input type="checkbox" id="in-stock" name="in-stock" value={filters['in-stock']}/>
          <label htmlFor="in-stock">موجود</label>
        </div>

        {/*</div>*/}

      </div>
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