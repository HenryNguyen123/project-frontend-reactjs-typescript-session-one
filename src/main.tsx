import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.tsx'
import { store } from './redux/store/store.ts'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      {/* <BrowserRouter basename="/project-frontend-reactjs-typescript-session-one"> */}
        <App /> 
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
