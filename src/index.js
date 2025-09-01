import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './CSS/components/form.css'
import './CSS/components/button.css'
import './CSS/components/alerts.css'
import './CSS/components/loading.css'
import './CSS/pages/website/google.css'
import './CSS/pages/website/slider.css'
import './CSS/base/media-query.css'
import 'react-loading-skeleton/dist/skeleton.css'
import "react-image-gallery/styles/css/image-gallery.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import { BrowserRouter as Router} from 'react-router-dom';
import MenuProvider from './Context/MenuContext';
import WindowSizeProvider from './Context/WindowContext';
import CartProvider from './Context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MenuProvider>
      <WindowSizeProvider>
        <CartProvider>
          <Router>
            <App />
          </Router>
        </CartProvider>
      </WindowSizeProvider>
    </MenuProvider>
  </React.StrictMode>
);

