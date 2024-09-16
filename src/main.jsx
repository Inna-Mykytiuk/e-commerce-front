
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'

import { Toaster } from "@/components/ui/toaster"
import store from './store/store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter basename='/e-commerce-front'>
      <App />
      <Toaster />
    </BrowserRouter>
  </Provider>
)
