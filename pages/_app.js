import React from 'react'
import {Provider} from 'react-redux'
import {useStore} from '../redux/store'

const App = ({Component, pageProps}) => {
  const store = useStore(pageProps.initialReduxState)
  console.log('store', store)
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App