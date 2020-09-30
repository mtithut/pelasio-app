import React from "react";
import styles from '../../styles/Home.module.css'

export default function Pagination({currentPage, totalPage, onChange}) {
  console.log(currentPage, totalPage,)
  return <div className={styles.pagination}>
    <button disabled={currentPage === 1}
            onClick={() => onChange(1)}>
      &lt;
    </button>
    <button disabled={currentPage === 1}
            onClick={() => onChange(currentPage - 1)}>prev
    </button>

    {currentPage - 1 > 1 ? '...' : ''}
    {
      getFirstPageNumber(currentPage, totalPage, onChange)
    }
    {currentPage + 1 < totalPage ? '...' : ''}
    <button disabled={currentPage === totalPage}
            onClick={() => onChange(currentPage + 1)}>next
    </button>
    <button disabled={currentPage === totalPage}
            onClick={() => onChange(totalPage)}>&gt;
    </button>
  </div>
}

const getFirstPageNumber = (current, total, onChange) => {
  let listView = []
  const end = current + 1 < total ? current + 1 : total
  for (let i = current - 1 > 1 ? current - 1 : 1; i <= end; i++) {
    listView.push(<button className={i === current ? styles.currentPage : null}
                          onClick={() => onChange(i)}> {i} </button>)
  }
  return listView


}