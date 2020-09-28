import React, {useEffect, useState} from "react";
import styles from '../../styles/Home.module.css'

export default function ProductFilters({categories, filters, onChange}) {
  const [keyword, setKeyword] = useState(filters.q)
  console.log(filters)
  return <>
    <div className={styles.card}>
      <input type={'text'} value={keyword} onChange={event => setKeyword(event.target.value)}
             placeholder={'جستجوی محصول'}
             onKeyDown={event => {
               if (event.key === 'Enter') {
                 onChange({q: keyword})
               }
             }}/>
    </div>
    <div className={styles.card}>
      <select onChange={event => onChange({category: event.target.value})}>
        <option key={'cat0'} value={0}>دسته بندی</option>
        {
          categories && categories.map(category =>
            <option key={'categories' + category.category_id} value={category.category_id}>{category.name}</option>)
        }
      </select>
    </div>
    <div className={styles.card}>
      <input type="checkbox" id="discount" name="discount"
             checked={!!filters.discount}
             onChange={event => onChange({discount: event.target.checked})}/>
      <label htmlFor="discount">تخفیف</label>
    </div>
    <div className={styles.card}>
      <input type="checkbox" id="original" name="original"
             checked={!!filters.original}
             onChange={event => onChange({original: event.target.checked})}/>
      <label htmlFor="original">اصل</label>
    </div>
    <div className={styles.card}>
      <input type="checkbox" id="fast-delivery" name="fast-delivery"
             checked={!!filters['fast-delivery']}
             onChange={event => onChange({'fast-delivery': event.target.checked})}/>
      <label htmlFor="fast-delivery">تحویل فوری</label>
    </div>
    <div className={styles.card}>
      <input type="checkbox" id="in-stock" name="in-stock"
             checked={!!filters['in-stock']}
             onChange={event => onChange({'in-stock': event.target.checked})}/>
      <label htmlFor="in-stock">موجود</label>
    </div>

    <div className={styles.card}>
      <div>
        <input type="radio" id="label" name="more-relevant"
               checked={filters.sort === 'relevant,desc'}
               onClick={event => onChange({sort: 'relevant,desc'})}/>
        <label htmlFor="more-relevant">مرتبط ترین</label>
      </div>
      <div>
        <input type="radio" id="label" name="price-desc"
               checked={filters.sort === 'price,desc'}
               onClick={event => onChange({sort: 'price,desc'})}
        />
        <label htmlFor="price-desc">بالاترین قیمت</label>
      </div>
      <div>
        <input type="radio" id="label" name="price-asc"
               checked={filters.sort === 'price,asc'}
               onClick={event => onChange({sort: 'price,asc'})}
        />
        <label htmlFor="price-asc">پایین ترین قیمت</label>
      </div>
      <div>
        <input type="radio" id="label" name="date-asc"
               checked={filters.sort === 'date,asc'}
               onClick={event => onChange({sort: 'date,asc'})}
        />
        <label htmlFor="date-asc">قدیمی ترین قیمت</label>
      </div>
      <div>
        <input type="radio" id="label" name="date-desc"
               checked={filters.sort === 'date,desc'}
               onClick={event => onChange({sort: 'date,desc'})}
        />
        <label htmlFor="date-desc">جدیدترین قیمت</label>
      </div>
    </div>
  </>
}