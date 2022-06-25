import React from 'react';
import { useParams } from 'react-router-dom';
import { useDiary } from '../pages/DiaryPage';
import Form from './Form';
import NotFound from './NotFound';

const EdifForm = () => {
  const { id } = useParams();
  const { products, editProduct } = useDiary();
  const product = products.find(({ id: productID }) => productID === id);

  return <>{product ? <Form product={product} editProduct={editProduct} /> : <NotFound />}</>;
};

export default EdifForm;
