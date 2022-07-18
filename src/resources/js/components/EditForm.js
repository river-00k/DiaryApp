import React from 'react';
import { useParams } from 'react-router-dom';
import { useDiary } from '../contexts/DiaryContext';
import Form from './Form';
import NotFound from './NotFound';

const EdifForm = () => {
  const { id } = useParams();
  const { products, editProduct } = useDiary();
  const product = products.find(obj => {return obj.id === Number(id)});
  
  return <>{product ? <Form product={product}/> : <NotFound />}</>;
};

export default EdifForm;
