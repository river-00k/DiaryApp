import React, { useCallback } from 'react';
import { BrowserRouter, Route, Routes, NavLink, useLocation } from 'react-router-dom';
import Products from './components/Products';
import sampleData from './sample-data';
import useHistory from './hooks/useHistory';
import NotFound from './components/NotFound';
import Example from './pages/example';
import Form from './components/Form'
import EditForm from './components/EditForm';

const ProductNav = () => {
    const { pathname } = useLocation();
  
    if (pathname === '/') return null;
  
    return (
      <NavLink to="/">
        マイページ
      </NavLink>
    );
  };
  
const DiaryRoutes = () =>{
    const { getCurrentHistory: getCurrentProducts, updateHistory } = useHistory([[...sampleData]]);

  const addProduct = useCallback(
    product => {
      const { title } = product;
      const currentProducts = getCurrentProducts([]);
      const updatedProducts = [product, ...currentProducts];
      updateHistory({ updatedProducts, flashMessage: `${title} Added!` });
    },
    [getCurrentProducts, updateHistory]
  );

  const removeProduct = useCallback(
    product => {
      const { id, title } = product;
      const currentListOfProducts = getCurrentProducts();
      const updatedProducts = currentListOfProducts.filter(item => item.id !== id);
      updateHistory({ updatedProducts, flashMessage: `${title} Deleted!` });
    },
    [getCurrentProducts, updateHistory]
  );
  const editProduct = useCallback(
    product => {
      const { id, title } = product;
      const currentListOfProducts = getCurrentProducts();
      const updatedProducts = currentListOfProducts.map(item => {
        if (item.id === id) return product;
        return item;
      });

      updateHistory({ updatedProducts, flashMessage: `${title} Updated!` });
    },
    [getCurrentProducts, updateHistory]
  );

    return (
    <BrowserRouter>
    <ProductNav />
        <Routes>
          <Route index element={<Products products={getCurrentProducts([])} removeProduct={removeProduct} />} />
          <Route path="/product/new" element={<Form addProduct={addProduct} />} />
          <Route path="/product/edit/:id" element={<EditForm products={getCurrentProducts([])} editProduct={editProduct}/>} />
        </Routes>
    </BrowserRouter>
    );
}

export default DiaryRoutes;