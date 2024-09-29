import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
import { store } from './reduxApp/store.ts'
import { startup } from './startup/index.ts'

const root = createRoot(document.getElementById('root')!)

startup().then(() => {
  root.render(
    <Provider store={store}>
      <Suspense>
        <App />
      </Suspense>
    </Provider>,
  )
})
