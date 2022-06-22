import React, { useCallback } from 'react';
import { BrowserRouter, Route, Routes, NavLink, useLocation } from 'react-router-dom';
import Products from './components/Products';
import sampleData from './sample-data';
import useHistory from './hooks/useHistory';
import NotFound from './components/NotFound';
import { AuthProvider } from './auth/AuthContext';
import Form from './components/Form'
import EditForm from './components/EditForm';
import ProtectedRoute from './auth/ProtectedRoute';
import Example from './pages/Example';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RegisterInputForm from './components/RegisterInputForm'
import RegisterConfirmForm from './components/RegisterConfirmForm'
import RegisterCompleteForm from './components/RegisterCompleteForm'

const ProductNav = () => {
    const { pathname } = useLocation();
  
    if (pathname === '/') return null;
  
    return (
      <NavLink to="/">
        マイページ
      </NavLink>
    );
  };
  
const AppRoutes = () =>{
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
      <AuthProvider>
      <ProductNav />
      <Routes>
          <Route path="/login" element ={< LoginPage/>} />
          <Route path="/register" element ={< RegisterPage/>} >
              <Route path="input" element={<RegisterInputForm/>}/>
              <Route path="confirm" element={<RegisterConfirmForm/>}/>
              <Route path="complete" element={<RegisterCompleteForm/>}/>
          </Route>
          <Route path="/mypage" element={<ProtectedRoute/>}>
            <Route index element={<Products products={getCurrentProducts([])} removeProduct={removeProduct} />} />
            <Route path="product/new" element={<Form addProduct={addProduct} />} />
            <Route path="product/edit/:id" element={<EditForm products={getCurrentProducts([])} editProduct={editProduct}/>} />
            <Route path="example" element ={< Example/>} />
          </Route>
      </Routes>
    {/* <ProductNav />
        <Routes>
          <Route index element={<Products products={getCurrentProducts([])} removeProduct={removeProduct} />} />
          <Route path="/product/new" element={<Form addProduct={addProduct} />} />
          <Route path="/product/edit/:id" element={<EditForm products={getCurrentProducts([])} editProduct={editProduct}/>} />
        </Routes> */}
      </AuthProvider>
    </BrowserRouter>
    );
}

export default AppRoutes;