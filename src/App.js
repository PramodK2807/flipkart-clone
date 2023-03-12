
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import ProductsOnCategory from './pages/ProductsOnCategory';
import SearchPage from './pages/SearchPage.jsx';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<HomePage/>} />
      <Route exact path='/products/:id' element={<ProductsOnCategory/>} />
      <Route exact path='/cart' element={<CartPage/>} />
      <Route exact path='/search' element={<SearchPage/>} />
    </Routes>
  );
}

export default App;
